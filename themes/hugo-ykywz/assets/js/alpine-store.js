document.addEventListener('alpine:init', () => {
    // Store untuk Navigasi (Offcanvas)
    Alpine.store('nav', {
        isOpen: false,
        toggle() {
            this.isOpen = !this.isOpen;
            // Mencegah scroll pada body saat menu terbuka
            document.body.style.overflow = this.isOpen ? 'hidden' : '';
        },
        close() {
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    });

    // Store untuk Theme (Dark Mode)
    Alpine.store('theme', {
        isDark: document.documentElement.classList.contains('dark'),
        toggle() {
            this.isDark = !this.isDark;
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', this.isDark);
        }
    });

    // Store untuk Share Offcanvas
    Alpine.store('share', {
        isOpen: false,
        toggle() {
            this.isOpen = !this.isOpen;
            document.body.style.overflow = this.isOpen ? 'hidden' : '';
        },
        close() { this.isOpen = false; document.body.style.overflow = ''; }
    });

    // Store untuk Lightbox Gambar
    Alpine.store('lightbox', {
        isOpen: false,
        src: '',
        alt: '',
        desc: '',
        images: [],
        index: 0,
        
        open(src, alt, desc, group) {
            this.src = src;
            this.alt = alt || '';
            this.desc = desc || '';
            this.isOpen = true;
            document.body.style.overflow = 'hidden';

            // Logika Grouping
            if (group) {
                const els = document.querySelectorAll(`.image-grid-item[data-group="${group}"]`);
                if (els.length > 1) {
                    this.images = Array.from(els).map(el => ({
                        src: el.dataset.src,
                        alt: el.dataset.alt,
                        desc: el.dataset.desc || ''
                    }));
                    this.index = this.images.findIndex(img => img.src === src);
                } else {
                    this.images = [];
                }
            } else {
                this.images = [];
            }
        },
        next() {
            if (this.images.length === 0) return;
            this.index = (this.index + 1) % this.images.length;
            this.updateView();
        },
        prev() {
            if (this.images.length === 0) return;
            this.index = (this.index - 1 + this.images.length) % this.images.length;
            this.updateView();
        },
        updateView() {
            const img = this.images[this.index];
            this.src = img.src;
            this.alt = img.alt;
            this.desc = img.desc;
        },
        close() {
            this.isOpen = false;
            setTimeout(() => {
                this.src = '';
                this.alt = '';
                this.desc = '';
                this.images = [];
            }, 300); // Tunggu transisi selesai
            document.body.style.overflow = '';
        }
    });
});