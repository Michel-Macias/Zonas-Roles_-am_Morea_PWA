const CACHE_NAME = 'nam-zonas-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'
];

// Instalar Service Worker y cachear recursos iniciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Forzar a que pase a estar activo inmediatamente
  );
});

// Activar Service Worker y limpiar cachés obsoletas de versiones anteriores
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Purgando caché obsoleta:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Tomar control de todos los clientes de inmediato
  );
});

// Intercepción Fetch con estrategia Stale-While-Revalidate
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;
  
  // No cachear llamadas de red dinámicas a Firebase Database o Auth endpoints
  if (url.includes('firebasedatabase.app') || url.includes('identitytoolkit.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Guardar en caché solo si la respuesta es exitosa (200 OK)
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => cachedResponse); // Retornar caché en caso de fallo total de red

        return cachedResponse || fetchPromise;
      });
    })
  );
});
