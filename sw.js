// 定义缓存名称
const CACHE_NAME = "hcyhomo-cache";

// 定义需要缓存的资源列表
const urlsToCache = [
  '/',
  '/assets',
];

// 安装 Service Worker
self.addEventListener('install', function(event) {
  // 延迟安装过程，直到缓存打开并所有资源都缓存完成
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求并从缓存中返回响应
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 如果缓存中有匹配的响应，则直接返回缓存中的响应
        if (response) {
          return response;
        }
        // 否则从网络请求资源
        return fetch(event.request);
      })
  );
});

// 清理旧的缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // 清理除当前缓存之外的其他缓存
            return cacheName !== CACHE_NAME;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
  );
});
