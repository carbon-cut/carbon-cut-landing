import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/carbon-cut-landing",
  output: "export",
  reactStrictMode: false,
  images: { unoptimized: true },
};

export default nextConfig;
