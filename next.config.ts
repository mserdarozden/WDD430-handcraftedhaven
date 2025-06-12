import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables ESLint build blocking in production
  },
  // You can add other config options here
};

export default nextConfig;