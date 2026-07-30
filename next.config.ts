import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pep",
  assetPrefix: "/pep/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
