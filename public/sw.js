// Barberaria 96 Service Worker - Industry Leading PWA Implementation
const CACHE_NAME = 'barberaria-96-v2.0.0';
const OFFLINE_URL = '/offline.html';

// Enhanced precache manifest with comprehensive file types
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico'
];

// Install event - Enhanced caching strategy
self.addEventListener('install', (event) => {
  console.log('Service Worker installing with enhanced caching...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Precaching critical resources...');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('Precaching completed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Precaching failed:', error);
      })
  );
});

// Activate event - Enhanced cache management
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating with enhanced features...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim(),
      // Enable navigation preload if supported
      self.registration.navigationPreload ? 
        self.registration.navigationPreload.enable() : 
        Promise.resolve()
    ])
  );
});

// Enhanced fetch event with comprehensive caching strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);
  const pathname = url.pathname;

  // Handle navigation requests (page loads) with enhanced strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      handleNavigationRequest(event.request)
    );
    return;
  }

  // Handle BokaDirekt iframe requests with enhanced caching
  if (url.hostname.includes('bokadirekt.se')) {
    event.respondWith(
      handleBokaDirektRequest(event.request)
    );
    return;
  }

  // Handle Google Fonts with long-term caching
  if (url.hostname.includes('fonts.googleapis.com') || 
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      handleFontRequest(event.request)
    );
    return;
  }

  // Handle static assets with optimized caching
  if (isStaticAsset(event.request)) {
    event.respondWith(
      handleStaticAssetRequest(event.request)
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (pathname.startsWith('/api/')) {
    event.respondWith(
      handleApiRequest(event.request)
    );
    return;
  }

  // Default: Network first with cache fallback
  event.respondWith(
    handleDefaultRequest(event.request)
  );
});

// Enhanced navigation request handler
async function handleNavigationRequest(request) {
  try {
    // Try network first with timeout
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), 3000)
      )
    ]);

    if (networkResponse.ok) {
      // Cache successful navigation responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Navigation network failed, trying cache:', error);
    
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Try to serve the main app for SPA routes
    const appResponse = await caches.match('/index.html');
    if (appResponse) {
      return appResponse;
    }

    // Last resort: offline page
    return caches.match(OFFLINE_URL);
  }
}

// Enhanced BokaDirekt request handler
async function handleBokaDirektRequest(request) {
  try {
    // Always try network first for booking system
    const networkResponse = await fetch(request, {
      credentials: 'include',
      mode: 'cors'
    });

    if (networkResponse.ok) {
      // Cache successful responses for short term
      const cache = await caches.open(CACHE_NAME);
      const responseToCache = networkResponse.clone();
      
      // Add timestamp for cache invalidation
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cached-at', Date.now().toString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
      return networkResponse;
    }
    
    throw new Error('BokaDirekt response not ok');
  } catch (error) {
    console.log('BokaDirekt network failed, trying cache:', error);
    
    // Try cache with freshness check
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      const cachedAt = cachedResponse.headers.get('sw-cached-at');
      const isStale = cachedAt && (Date.now() - parseInt(cachedAt)) > 300000; // 5 minutes
      
      if (!isStale) {
        return cachedResponse;
      }
    }

    // Return error response for booking system
    return new Response(
      JSON.stringify({ error: 'Booking system temporarily unavailable' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Enhanced font request handler
async function handleFontRequest(request) {
  // Cache first for fonts (they rarely change)
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Font network response not ok');
  } catch (error) {
    console.log('Font request failed:', error);
    // Return empty response for failed font requests
    return new Response('', { status: 404 });
  }
}

// Enhanced static asset handler
async function handleStaticAssetRequest(request) {
  // Cache first for static assets
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Check if we should update in background
    updateCacheInBackground(request);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Static asset network response not ok');
  } catch (error) {
    console.log('Static asset request failed:', error);
    
    // Return fallback for images
    if (request.destination === 'image') {
      return caches.match('/logo.png') || new Response('', { status: 404 });
    }
    
    return new Response('', { status: 404 });
  }
}

// Enhanced API request handler
async function handleApiRequest(request) {
  try {
    // Network first for API requests
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful API responses briefly
      const cache = await caches.open(CACHE_NAME);
      const responseToCache = networkResponse.clone();
      
      // Add short expiration
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cached-at', Date.now().toString());
      headers.set('sw-cache-duration', '60000'); // 1 minute
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
      return networkResponse;
    }
    throw new Error('API response not ok');
  } catch (error) {
    console.log('API request failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      const cachedAt = cachedResponse.headers.get('sw-cached-at');
      const duration = cachedResponse.headers.get('sw-cache-duration') || '300000';
      const isStale = cachedAt && (Date.now() - parseInt(cachedAt)) > parseInt(duration);
      
      if (!isStale) {
        return cachedResponse;
      }
    }

    return new Response(
      JSON.stringify({ error: 'Service temporarily unavailable' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Enhanced default request handler
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Default request network response not ok');
  } catch (error) {
    console.log('Default request failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('', { status: 404 });
  }
}

// Helper function to identify static assets
function isStaticAsset(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  return (
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i)
  );
}

// Background cache update for stale-while-revalidate
function updateCacheInBackground(request) {
  // Don't await this - it runs in background
  fetch(request)
    .then(response => {
      if (response.ok) {
        return caches.open(CACHE_NAME)
          .then(cache => cache.put(request, response));
      }
    })
    .catch(error => {
      console.log('Background cache update failed:', error);
    });
}

// Enhanced background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      handleBackgroundSync()
    );
  }
});

// Background sync handler
async function handleBackgroundSync() {
  try {
    // Perform any background tasks here
    console.log('Performing background sync tasks...');
    
    // Example: Sync offline bookings, update cache, etc.
    await updateCriticalResources();
    
    console.log('Background sync completed successfully');
  } catch (error) {
    console.error('Background sync failed:', error);
    throw error; // This will retry the sync
  }
}

// Update critical resources in background
async function updateCriticalResources() {
  const cache = await caches.open(CACHE_NAME);
  const criticalUrls = [
    '/',
    '/manifest.json',
    '/logo.png'
  ];

  const updatePromises = criticalUrls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.log(`Failed to update ${url}:`, error);
    }
  });

  await Promise.allSettled(updatePromises);
}

// Enhanced message handling for PWA features
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      case 'CLEAR_CACHE':
        clearAllCaches().then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
      case 'UPDATE_CACHE':
        updateCriticalResources().then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
      default:
        console.log('Unknown message type:', event.data.type);
    }
  }
});

// Clear all caches utility
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
  await Promise.all(deletePromises);
  console.log('All caches cleared');
}

// IMPORTANT: NO push notification handlers to prevent any popups
// This ensures compliance with Apple policies and user experience guidelines

console.log('Barberaria 96 Service Worker loaded - Industry Leading PWA Implementation');