// @ts-nocheck - Serwist types incompatible with strict tsconfig; runtime works correctly
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry } from "serwist";
import { Serwist } from "serwist";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const self: any & {
  __SW_MANIFEST: (PrecacheEntry | string)[];
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      // PANTHEON art: cache-first, 7-day expiry (per UI-SPEC PWA contract)
      urlPattern: /\/api\/content\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "pantheon-art",
        expiration: { maxAgeSeconds: 7 * 24 * 60 * 60 },
      },
    },
    {
      // Deity configs: stale-while-revalidate (per UI-SPEC)
      urlPattern: /\/api\/deities(?!.*random).*/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "deity-configs",
      },
    },
    {
      // Reading responses: network-only, never cache (per UI-SPEC)
      urlPattern: /\/api\/oracle\/read\/.*/,
      handler: "NetworkOnly",
    },
  ],
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher: ({ request }) => request.destination === "document",
      },
    ],
  },
});

serwist.addEventListeners();
