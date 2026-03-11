import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow server components to import Node.js-only packages (pg, knex)
  serverExternalPackages: ['knex', 'pg'],
};

export default nextConfig;
