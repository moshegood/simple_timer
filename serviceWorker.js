const cacheName = "mySiteCache"
const assets = [
  "index.html",
  "css/style.css",
  "js/app.js",
]

self.addEventListener("install", installEvent => {
  console.log('Going to cache stuff')
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('cache is open')
      cache.addAll(assets)
    }).catch(console.log)
  )
})
