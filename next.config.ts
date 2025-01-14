import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/carbon-cut-landing",
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
