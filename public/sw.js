importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// sw.js - Minimal Service Worker to enable PWA installability

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Pass-through fetch for network-first response to ensure immediate updates.
  // This satisfies Chrome's PWA installable criteria without aggressive caching.
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
