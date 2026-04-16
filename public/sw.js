// Global Forum PWA Service Worker v1.0
const CACHE_NAME = 'global-forum-v1.5';
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/apple-touch-icon.png',
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Installed');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Push notifications
self.addEventListener('push', (event) => {
    const data = event.data?.json();
    const options = {
        body: data?.body || 'Global Forum Notification',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            url: data?.url || '/',
        },
        actions: [
            {
                action: 'view',
                title: 'View Now',
            },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data?.title || 'Global Forum', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.action === 'view' ? event.notification.data?.url : '/')
    );
});

// Background sync (for offline cart/orders)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(syncPendingActions());
    }
});

async function syncPendingActions() {
    // Sync offline orders/cart to server
    const pending = await getPendingActions();
    for (const action of pending) {
        try {
            await fetch('/api/sync', {
                method: 'POST',
                body: JSON.stringify(action),
                headers: { 'Content-Type': 'application/json' },
            });
            removePendingAction(action.id);
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }
}

// Offline storage helpers
function getPendingActions() {
    return JSON.parse(localStorage.getItem('pendingActions') || '[]');
}

function removePendingAction(id: string) {
    const pending = getPendingActions().filter((action: any) => action.id !== id);
    localStorage.setItem('pendingActions', JSON.stringify(pending));
}

