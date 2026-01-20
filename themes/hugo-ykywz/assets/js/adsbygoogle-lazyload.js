/**
 * AdSense Lazyload - Hugo Optimized
 * Non-blocking, Idle-callback, and User Interaction Trigger
 */
(function() {
    var lazyadsense = false;

    function loadAdSense() {
        if (lazyadsense) return;
        lazyadsense = true;

        // Lepas semua event listener
        ["scroll", "mousemove", "touchstart", "keydown"].forEach(event => 
            window.removeEventListener(event, loadAdSense)
        );

        // Eksekusi pemuatan script
        var triggerLoad = function() {
            var ad = document.createElement('script');
            ad.type = 'text/javascript';
            ad.async = true;
            ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2846006866814506';
            ad.crossOrigin = 'anonymous';
            var sc = document.getElementsByTagName('script')[0];
            sc.parentNode.insertBefore(ad, sc);
        };

        // Gunakan requestIdleCallback jika didukung browser (Non-blocking)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(triggerLoad);
        } else {
            setTimeout(triggerLoad, 200);
        }
    }

    // Pemicu interaksi
    ["scroll", "mousemove", "touchstart", "keydown"].forEach(event => 
        window.addEventListener(event, loadAdSense, { passive: true })
    );

    // Cadangan: Muat otomatis setelah browser benar-benar siap (setelah window.onload)
    window.addEventListener('load', function() {
        setTimeout(loadAdSense, 5000); // 5 detik setelah halaman selesai total
    });
})();