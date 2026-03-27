const CACHE_NAME = "mission-game-v2"; // ←バージョン変えるの重要！

const urlsToCache = [
  "./",
  "./index.html",
  "./missions.json"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // ←ここにまとめる！

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
