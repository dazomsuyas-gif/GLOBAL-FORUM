// Next.js App Router Service Worker (PWA)
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('global-forum-sw-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/favicon.ico',
                '/manifest.json',
                '/public/manifest.json',
            ]);
        })
    );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match('/offline');
        })
    );
});
