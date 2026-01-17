// Konfigurasi gambar kursor
const cursors = {
    hover: "/cursors/cur222.cur", 
    default: "/cursors/cur116.cur"    
};

/**
 * Fungsi untuk menerapkan kursor ke elemen tertentu
 */
function applyCustomCursor() {
    // 1. Set kursor default untuk seluruh body
    document.body.style.cursor = `url(${cursors.default}), auto`;

    // 2. Cari semua elemen interaktif (link, button, dll)
    const interactiveElements = document.querySelectorAll('a, button, .hover-target');

    interactiveElements.forEach(el => {
        // Saat mouse masuk ke elemen (Hover)
        el.addEventListener('mouseenter', () => {
            el.style.cursor = `url(${cursors.hover}), pointer`;
        });

        // Saat mouse keluar dari elemen (Kembali ke default)
        el.addEventListener('mouseleave', () => {
            el.style.cursor = `url(${cursors.default}), auto`;
        });
    });
}

// Jalankan fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', applyCustomCursor);