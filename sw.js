const CACHE_NAME = 'my-app-v1';
const REPO_NAME = 'lndingpage'; // Ganti dengan nama repository Anda

// Path dasar
const BASE_PATH = REPO_NAME ? `/${REPO_NAME}` : '';

const urlsToCache = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/index.html`,
    `${BASE_PATH}/offline.html`,
    `${BASE_PATH}/manifest.json`
];

const OFFLINE_URL = `${BASE_PATH}/offline.html`;

console.log('SW: Starting...');
console.log('SW: Base path:', BASE_PATH);

// Install Event
self.addEventListener('install', event => {
    console.log('SW: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW: Opening cache');
                return cache.addAll(urlsToCache)
                    .then(() => {
                        console.log('SW: All files cached successfully');
                        return self.skipWaiting();
                    })
                    .catch(err => {
                        console.error('SW: Cache addAll failed:', err);
                        // Coba cache satu per satu untuk debug
                        return Promise.all(
                            urlsToCache.map(url => {
                                console.log('SW: Trying to cache:', url);
                                return cache.add(url).catch(e => {
                                    console.error('SW: Failed to cache:', url, e);
                                });
                            })
                        );
                    });
            })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    console.log('SW: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            console.log('SW: Cache names:', cacheNames);
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('SW: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('SW: Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    console.log('SW: Fetching:', url.pathname);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Untuk navigasi (halaman HTML)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Cache successful response
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    console.log('SW: Network failed, showing offline page');
                    return caches.match(OFFLINE_URL);
                })
        );
    }
    // Untuk file lain
    else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log('SW: Serving from cache:', url.pathname);
                        return response;
                    }
                    
                    console.log('SW: Not in cache, fetching:', url.pathname);
                    return fetch(event.request).then(response => {
                        // Cache jika successful
                        if (response.ok) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
    }
});
