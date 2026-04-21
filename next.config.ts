import type { NextConfig } from "next";

function normalizeBasePath(value?: string) {
  const trimmed = value?.trim() ?? "";

  if (!trimmed || trimmed === "''" || trimmed === '""' || trimmed === "/") {
    return "";
  }

  const withoutTrailingSlash = trimmed.replace(/\/$/, "");
  return withoutTrailingSlash.startsWith("/") ? withoutTrailingSlash : `/${withoutTrailingSlash}`;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: false,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: "true",
  },
};

export default nextConfig;
