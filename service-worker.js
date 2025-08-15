const CACHE_NAME = 'suenos-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './src/js/main.js',
  './Js/firebase.js',
  './Js/usuarioForm.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// Instalar y cachear
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => (name !== CACHE_NAME ? caches.delete(name) : undefined))
      )
    )
  );
  self.clients.claim();
});

// Respuesta desde caché primero, si no, red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
