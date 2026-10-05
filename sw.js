/* Pulso Comercial · service worker v0.41 (b86b52bc) */
const CACHE = 'pulso-v0.41-b86b52bc';
const ARCHIVOS = ['./', './index.html', './manifest.webmanifest', './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/favicon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('message', e => { if (e.data === 'activar') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('pulso-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin || new URL(r.url).pathname.includes('/datos/')) return;   // datos, mapas y otros sitios: directo a la red
  // La app (index.html): primero la red, así siempre abre la última versión publicada; sin señal (o si tarda más de 4 s), la copia guardada.
  if (r.mode === 'navigate') {
    e.respondWith(new Promise(ok => {
      let listo = false; const guardada = () => caches.match('./index.html').then(c => c || caches.match('./'));
      const t = setTimeout(() => guardada().then(c => { if (c && !listo) { listo = true; ok(c); } }), 4000);
      fetch(r, { cache: 'no-store' }).then(res => {
        if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); }
        if (!listo) { listo = true; clearTimeout(t); ok(res); }
      }).catch(() => guardada().then(c => { if (!listo) { listo = true; clearTimeout(t); ok(c || Response.error()); } }));
    }));
    return;
  }
  // Íconos y manifiesto: la copia guardada.
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(c => c || fetch(r).catch(() => caches.match('./index.html'))));
});
