const CACHE_NAME= 'v1';

const FILE_LIST = [
    'index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf',
    './style.css',
    'index.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILE_LIST))
    );
});

self.addEventListener('fetch', (evt) => {
    const { request } = evt;
    evt.respondWith(fetch(request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
        });
    }, () => caches.match(request)));
});
