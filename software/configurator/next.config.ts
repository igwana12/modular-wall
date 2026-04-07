import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + unsafe-eval needed for Three.js WebGL shader compilation
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // Styles: inline styles used by React + Tailwind
              "style-src 'self' 'unsafe-inline'",
              // Images: self + data URIs (for Three.js textures) + blob (for exports)
              "img-src 'self' data: blob:",
              // Fonts: self
              "font-src 'self'",
              // Connect: self (no external APIs in current build)
              "connect-src 'self'",
              // Workers: self + blob (Three.js offscreen workers)
              "worker-src 'self' blob:",
              // Media: self
              "media-src 'self'",
              // Frame: omma.build for interactive 3D demo
              "frame-src 'self' https://omma.build",
              // Object: none
              "object-src 'none'",
              // Base: self
              "base-uri 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
