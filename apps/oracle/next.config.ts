import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8300",
        pathname: "/api/content/**",
      },
    ],
  },
};

export default nextConfig;
