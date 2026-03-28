import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  turbopack: {},
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

export default withSerwist(nextConfig);
