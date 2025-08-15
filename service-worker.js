const CACHE_NAME = 'suenos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/js/main.js',
  '/src/css/styles.css',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  // Puedes agregar aquí más archivos si los necesitas
];

// Instalar y cachear los archivos
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Cacheando archivos...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Forza la activación inmediata
});

// Activar y limpiar cachés viejos
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activando y limpiando cachés antiguos...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] Borrando caché viejo:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // Controlar páginas inmediatamente
});

// Interceptar solicitudes y responder con caché si existe
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
