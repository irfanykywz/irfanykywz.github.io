// === Skrip JavaScript Standalone untuk Efek Jatuh Halloween ===

(function() {
    const PUMPKIN_COUNT = 10; // Jumlah maksimum elemen yang akan ada di layar
    const FALL_INTERVAL = 1500; // Interval waktu (ms) untuk membuat item baru
    // const EMOJIS = ['🎃', '👻', '🦇']; // Koleksi emoji bertema
    const EMOJIS = ['🎃']; // Koleksi emoji bertema

    const container = document.createElement('div');
    // Pastikan container menutupi seluruh layar dan berada di lapisan atas (z-index)
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        pointer-events: none; /* Penting: agar tidak menghalangi klik pada konten website */
        z-index: 9999;
    `;
    document.body.appendChild(container);

    function createPumpkin() {
        // Jika sudah terlalu banyak elemen, hentikan sementara
        if (container.childElementCount >= PUMPKIN_COUNT) {
            return;
        }

        const item = document.createElement('span');
        item.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        // Gaya dasar dan posisi acak
        const startX = Math.random() * 100; // Posisi horizontal (0% - 100%)
        const size = Math.random() * (30 - 10) + 10; // Ukuran (20px - 40px)
        const duration = Math.random() * (10 - 6) + 6; // Durasi jatuh (6s - 12s)

        item.style.cssText = `
            position: absolute;
            top: -${size}px; /* Mulai dari atas layar */
            left: ${startX}vw;
            font-size: ${size}px;
            opacity: 0.9;
            /* Animasi jatuh */
            transition: transform ${duration}s linear, opacity 1s;
            transform: translateY(0);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        `;
        
        container.appendChild(item);

        // === Logika Jatuh (Menggunakan setTimeout untuk simulasi animasi) ===
        // Berikan sedikit waktu agar elemen tampil sebelum mulai jatuh
        setTimeout(() => {
            // Perintah untuk jatuh ke bawah layar
            item.style.transform = `translateY(100vh) rotate(${Math.random() * 720}deg)`; 
            // item.style.opacity = '0'; // Menghilang saat mencapai bawah
        }, 50); // Delay singkat

        // Hapus elemen setelah selesai jatuh + durasi transisi
        setTimeout(() => {
            item.style.opacity = '0';
            item.remove();
        }, (duration * 1000) + 100); 
    }

    // Mulai membuat efek jatuh secara berkala
    setInterval(createPumpkin, FALL_INTERVAL);

    // Buat beberapa item awal agar layar tidak kosong
    for (let i = 0; i < 5; i++) {
        setTimeout(createPumpkin, i * 200);
    }

})();
// Selesai dengan IIFE (Immediately Invoked Function Expression)