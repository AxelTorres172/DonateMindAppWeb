const CACHE_NAME = 'suenos-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './Js/main.js',
  './css/styles.css',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
