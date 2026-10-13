import type { NextConfig } from "next";

const isStaticExportBuild =
  process.env.GITHUB_ACTIONS === "true" || process.env.SLOTFOLIO_STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  ...(isStaticExportBuild
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default config;
