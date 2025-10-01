if (process.env.NEXT_PUBLIC_MSW_ENV === 'test') {
  import('./mocks/worker')
    .then(async mod => {
      if (mod?.worker?.start) {
        mod.worker.start();
      }
    })
    .catch(async () => {
      console.error("Failed to load the worker module");
    });
}