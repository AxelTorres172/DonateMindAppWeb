const CACHE_NAME = 'suenos-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './Js/main.js',
  './css/styles.css',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// Instalar y guardar en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(err => {
        console.warn('⚠ Error cacheando archivos:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) {
          return caches.delete(k);
        }
      }))
    )
  );
  self.clients.claim();
});

// Responder desde caché si existe
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
