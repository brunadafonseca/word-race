// service worker: script that browser runs in the background
// separate from webpage
// opens the door to features that don't need webpage or user interaction

const dataCacheName = 'word-race'
const cacheName = 'word-race'
const filesToCache = [
  '/',
  './assets/images/racing-flag-128.png',
  './assets/images/racing-flag-256.png',
  './assets/images/racing-flag-512.png',
  './assets/images/broccoli-128.png',
  './assets/images/strawberry-128.png',
  './assets/images/cat-128.png',
  './assets/images/shirt.png',
  './assets/images/shuffle.png',
  './assets/images/books.png',
  './assets/images/rgb.png',
  './assets/images/sad-kitty.png',
  './assets/images/kitty.png',
  './assets/images/girl.png',
  './assets/css/styles.css',
  './assets/fonts/WalterTurncoat-Regular.ttf',
  './index.html',
  './app.js',
  './manifest.json'
]

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install')
  // extendable event, ensures sw doesnt install untill code inside it has successfully occurred
  e.waitUntil( 
    // create new cache called 'word-race', returns promise
    caches.open(cacheName)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell')
        // addAll takes array of origin-relative URLS to all resources you want to cache
        return cache.addAll(filesToCache)
      })
      .catch((err) => {
        console.log(err.message)
      })
  )
})

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .catch((err) => {
        console.log(err.message)
      })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url)
  // hijack HTTP responses and update them
  e.respondWith(
    // responds with resource whose url matches network request url
    caches.match(e.request)
      .then((res) => {
        // return response or fetch default network request for that resource.
        return res || fetch(e.request).then((res) => {
          // clones response and puts it in the cache
          return caches.open(cacheName).then((cache) => {

            cache.put(e.request, res.clone())
            return res
          })
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  )
})

// Service worker:
// event-driven worker 
// registered agains origin and path
// runs in a worker context: has no DOM access, runs on different thread to the main JS that powers the app
// designed to be fully async
// act as proxy servers that sit between web apps, 
// the browser and the networkInterfaces(when available)
// Intended to:
// - enable creation of effective offline experiences
// - intercept network requests and take appropriate action based on
//   whether network is available
// - update assets residing on the server 
// they also allow access to push notifications and background sync APIs

// SW is first registered, if successful, sw is downloaded to client and attempts installation/activation
// for urls accessed by the user inside the whole origin, or inside a subset specified 

// Download
// Install
// Activate

// After that, it's downloaded every 24h or so. May be downloade more frequently
// but MUST be downloaded every 24h to prevent bad scripts from being annoying for too long

// If downloaded file is new, installation is attempted

// if new sw available, new version is installed in the bg, but not activated (worker in waiting)
// only activated when there are no pages loaded that still use the old sw
// when that happens, the new sw activates (becomes active worker)
// to avoid that, skipWaiting() and existing pages can be claimed by active worker using Clients.claim()

// activate
// good time to clean up old caches and other things associated with previous version of your sw

// sw responds to requests using FetchEvent. response can be modified using respondWith method

// Interfaces

// Cache
// represents storage for Req/Res object pairs that are cached as part of sw life cycle

// waitUntil - extendable event