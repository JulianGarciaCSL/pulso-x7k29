/* Pulso Comercial · service worker v0.27 (29312635) */
const CACHE = 'pulso-v0.27-29312635';
const ARCHIVOS = ['./', './index.html', './manifest.webmanifest', './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/favicon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS))); });
self.addEventListener('message', e => { if (e.data === 'activar') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('pulso-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin || new URL(r.url).pathname.includes('/datos/')) return;   // datos, mapas y otros sitios: directo a la red
  // Primero la copia guardada (abre al instante y sin conexión); las versiones nuevas llegan por el aviso de actualización.
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(c => c || fetch(r).catch(() => caches.match('./index.html'))));
});
