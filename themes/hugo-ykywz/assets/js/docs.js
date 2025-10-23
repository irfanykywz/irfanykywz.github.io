document.addEventListener('DOMContentLoaded', function () {
    // --- Fungsionalitas Offcanvas Sidebar untuk Mobile ---
    const menuToggle = document.getElementById('docsMenuToggle');
    const sidebar = document.querySelector('.docs-sidebar');
    const overlay = document.getElementById('docsOverlay');

    if (menuToggle && sidebar && overlay) {
        const openSidebar = () => {
            sidebar.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Mencegah scroll di body
        };

        const closeSidebar = () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = ''; // Kembalikan scroll
        };

        menuToggle.addEventListener('click', openSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Tutup sidebar saat link di dalamnya diklik (berguna untuk navigasi anchor)
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // --- Fungsionalitas Active Scrolling untuk Daftar Isi (Table of Contents) ---
    const headings = Array.from(document.querySelectorAll('.docs-content h2, .docs-content h3, .docs-content h4'));
    const tocLinks = Array.from(document.querySelectorAll('.docs-sidebar nav a'));

    if (headings.length === 0 || tocLinks.length === 0) {
        return; // Keluar jika tidak ada heading atau link TOC
    }

    const observerOptions = {
        rootMargin: '-100px 0px -60% 0px', // Aktifkan saat heading berada di 100px dari atas viewport
        threshold: 0
    };

    let activeId = '';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId = entry.target.id;
            }
        });

        // Hapus semua kelas 'active'
        tocLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke link yang sesuai
        if (activeId) {
            const activeLink = tocLinks.find(link => link.getAttribute('href') === `#${activeId}`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
                // Auto-scroll sidebar untuk menjaga link aktif tetap terlihat
                activeLink.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }
    }, observerOptions);

    // Amati setiap heading
    headings.forEach(heading => {
        observer.observe(heading);
    });
});