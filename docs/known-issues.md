# Known issues

## `npm run start` throws `TypeError: a[e] is not a function`

Observed on 2026-10-20 when running `npm run start`:

```text
TypeError: a[e] is not a function
    at <unknown> (.next/server/chunks/8777.js:45:52903)
    at Generator.next (<anonymous>)
    at <unknown> (.next/server/chunks/8777.js:45:50590)
    at new Promise (<anonymous>)
    at l (.next/server/chunks/8777.js:45:50410)
    at <unknown> (.next/server/chunks/8777.js:45:52842)
    at Generator.next (<anonymous>)
    at f (.next/server/chunks/8777.js:45:50448)
```

Error digest: `602833619`. Cause and impact have not been investigated.
