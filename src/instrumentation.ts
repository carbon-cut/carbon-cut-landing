export async function register() {
  if (process.env.NEXT_PUBLIC_MSW_ENV === "test" && process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("./mocks/server");
    server.listen();
  }
}
