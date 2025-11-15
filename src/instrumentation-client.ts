if (process.env.NEXT_PUBLIC_MSW_ENV === 'test') {
  import('./mocks/worker')
    .then(async mod => {
      if (mod?.worker?.start) {
        mod.worker.start({
          serviceWorker: {
            url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mockServiceWorker.js`,
          },
        });
      }
    })
    .catch(async () => {
      console.error("Failed to load the worker module");
    });
}
