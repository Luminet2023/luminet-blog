if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          // 注册成功
          console.log('Service Worker 注册成功:', registration);
        })
        .catch(function(error) {
          // 注册失败
          console.log('Service Worker 注册失败:', error);
        });
    });
  }
  