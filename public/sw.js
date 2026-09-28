/* Offline support. Pages: network first, cache fallback. Hashed assets: cache first. */
const VERSION = 'v2-1';
const PAGES = `pages-${VERSION}`;
const ASSETS = `assets-${VERSION}`;
const CORE = ['/', '/about/', '/this-site/', '/offline/'];
const MAX_WARM = 24;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => ![PAGES, ASSETS].includes(key)).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

async function pageFirstFromNetwork(request) {
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (await cache.match('/offline/'));
  }
}

async function assetFromCache(request) {
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/v1/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(pageFirstFromNetwork(request));
  } else if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(assetFromCache(request));
  }
});

self.addEventListener('message', (event) => {
  const { data } = event;
  if (!data || data.type !== 'warm' || !Array.isArray(data.urls)) return;
  const urls = data.urls
    .filter((path) => typeof path === 'string' && path.startsWith('/') && !path.startsWith('//'))
    .slice(0, MAX_WARM);
  event.waitUntil(
    caches.open(PAGES).then((cache) =>
      Promise.all(
        urls.map(async (path) => {
          if (await cache.match(path)) return;
          try {
            const response = await fetch(path, { credentials: 'same-origin' });
            if (response.ok) await cache.put(path, response);
          } catch {
            // Warming is best effort; a failed page is fetched normally next time.
          }
        }),
      ),
    ),
  );
});
