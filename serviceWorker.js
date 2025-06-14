self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('phonex-store').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'app.js',
        'phones.json',
        'images/iphone.jpg',
        'images/samsung.jpg',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});