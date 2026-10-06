"use client";

type RefreshLease = {
  key: "refresh";
  owner: string | null;
  expiresAt: number;
  generation: number;
  completedAt: number;
  status: number;
  outcomes?: Array<{ generation: number; completedAt: number; status: number }>;
};

const DATABASE_NAME = "carbon-cut-auth";
const LEASE_DURATION_MS = 30_000;
const HEARTBEAT_MS = 5_000;
const POLL_MS = 100;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("leases", { keyPath: "key" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function changeLease<T>(
  database: IDBDatabase,
  update: (lease: RefreshLease | undefined, store: IDBObjectStore) => T
): Promise<T> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("leases", "readwrite");
    const store = transaction.objectStore("leases");
    const read = store.get("refresh");
    let result: T;
    read.onsuccess = () => {
      result = update(read.result as RefreshLease | undefined, store);
    };
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function readLease(database: IDBDatabase): Promise<RefreshLease | undefined> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("leases", "readonly");
    const request = transaction.objectStore("leases").get("refresh");
    request.onsuccess = () => resolve(request.result as RefreshLease | undefined);
    request.onerror = () => reject(request.error);
  });
}

function statusResponse(status: number) {
  return new Response(null, { status: status || 503 });
}

export async function coordinateRefresh(
  refresh: () => Promise<Response>,
  startedAt = Date.now()
): Promise<Response> {
  const hasWebLocks = typeof navigator.locks?.request === "function";
  const run = async (lockHeld = false) => {
    let database: IDBDatabase;
    try {
      database = await openDatabase();
    } catch {
      // Web Locks still serialize rotations when storage is unavailable.
      return lockHeld ? refresh() : statusResponse(503);
    }

    const owner = Array.from(crypto.getRandomValues(new Uint32Array(4)), (part) =>
      part.toString(16).padStart(8, "0")
    ).join("");
    try {
      for (;;) {
        const claim = await changeLease(database, (lease, store) => {
          const previous = lease?.outcomes?.find((outcome) => outcome.completedAt > startedAt);
          if (previous) {
            return { acquired: false, completed: previous.status, generation: lease!.generation };
          }
          if (lease?.owner && lease.expiresAt > Date.now()) {
            return { acquired: false, completed: 0, generation: lease.generation };
          }
          store.put({
            key: "refresh",
            owner,
            expiresAt: Date.now() + LEASE_DURATION_MS,
            generation: lease?.generation ?? 0,
            completedAt: lease?.completedAt ?? 0,
            status: lease?.status ?? 0,
            outcomes: lease?.outcomes ?? [],
          } satisfies RefreshLease);
          return { acquired: true, completed: 0, generation: lease?.generation ?? 0 };
        });

        if (claim.completed) return statusResponse(claim.completed);
        if (claim.acquired) {
          const heartbeat = window.setInterval(() => {
            void changeLease(database, (lease, store) => {
              if (lease?.owner === owner) {
                store.put({ ...lease, expiresAt: Date.now() + LEASE_DURATION_MS });
              }
            }).catch(() => undefined);
          }, HEARTBEAT_MS);
          let response: Response;
          try {
            response = await refresh();
          } catch {
            response = statusResponse(503);
          } finally {
            window.clearInterval(heartbeat);
          }
          await changeLease(database, (lease, store) => {
            if (lease?.owner === owner) {
              const generation = lease.generation + 1;
              const completedAt = Date.now();
              store.put({
                ...lease,
                owner: null,
                expiresAt: 0,
                generation,
                completedAt,
                status: response.status,
                outcomes: [
                  ...(lease.outcomes ?? []),
                  { generation, completedAt, status: response.status },
                ].slice(-8),
              });
            }
          });
          return response;
        }

        // The owner writes completion only after its refresh response has set cookies.
        for (;;) {
          await new Promise((resolve) => window.setTimeout(resolve, POLL_MS));
          const lease = await readLease(database);
          const completed = lease?.outcomes?.find(
            (outcome) => outcome.generation > claim.generation
          );
          if (completed) return statusResponse(completed.status);
          if (!lease?.owner || lease.expiresAt <= Date.now()) break;
        }
      }
    } catch {
      return statusResponse(503);
    } finally {
      database.close();
    }
  };

  if (hasWebLocks) {
    try {
      return await navigator.locks.request("carbon-cut-auth-refresh", () => run(true));
    } catch {
      return run();
    }
  }
  return run();
}
