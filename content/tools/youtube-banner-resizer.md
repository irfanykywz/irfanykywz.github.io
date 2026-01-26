---
title: "YouTube Banner Resizer"
date: 2026-01-26T12:00:00+07:00
description: "Alat untuk mengubah ukuran dan menyesuaikan gambar agar pas dengan ukuran Banner YouTube (2560x1440) beserta panduan area aman."
icon: "icon-[ri--youtube-fill]"
---

<div class="mt-6 max-w-[90rem] mx-auto select-none space-y-6"x-data=ytBannerTool() x-init=init()><div class="items-start gap-8 grid grid-cols-1 lg:grid-cols-12"><div class="space-y-6 lg:col-span-4 xl:col-span-3"><div class="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 rounded-2xl p-4"><label class="flex items-center gap-2 dark:text-gray-200 text-gray-700 text-sm font-bold block mb-3"><i class="icon-[ri--upload-2-line] text-indigo-500"></i> Upload Gambar</label><div class="relative group"><input class="absolute inset-0 z-10 cursor-pointer h-full opacity-0 w-full"type=file @change=handleFile accept=image/*><div class="border-2 border-dashed border-gray-300 dark:border-gray-600 dark:group-hover:bg-indigo-900/20 group-hover:bg-indigo-50 group-hover:border-indigo-500 p-4 rounded-xl text-center transition-colors"><div x-show=!fileName><i class="icon-[ri--image-add-line] mb-2 text-2xl text-gray-400"></i><p class="font-medium text-xs dark:text-gray-400 mb-0 mt-0 text-gray-500">Pilih atau tarik gambar</div><div class="flex items-center gap-2 justify-center dark:text-indigo-400 text-indigo-600"x-show=fileName><i class=icon-[ri--image-line]></i> <span class="font-medium text-xs max-w-[150px] truncate"x-text=fileName></span></div></div></div></div><div class="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 rounded-2xl p-5 space-y-5"><h3 class="flex items-center gap-2 dark:text-gray-200 text-gray-700 text-sm font-bold border-b border-gray-100 dark:border-gray-700 pb-3"><i class=icon-[ri--settings-3-line]></i> Pengaturan</h3><div><label class="flex justify-between dark:text-gray-400 font-semibold mb-2 text-gray-500 text-xs tracking-wider uppercase"><span>Zoom / Skala</span> <span x-text="Math.round(scale * 100) + '%'"></span></label> <input class="accent-indigo-600 appearance-none bg-gray-200 cursor-pointer dark:bg-gray-700 h-2 rounded-lg w-full"@input=render() type=range max=3 min=0.1 step=0.01 x-model.number=scale></div><div><label class="text-xs dark:text-gray-400 text-gray-500 font-semibold mb-2 tracking-wider uppercase block">Warna Background</label><div class="flex items-center gap-2"><div class="border border-gray-200 dark:border-gray-700 shadow-sm dark:ring-offset-gray-800 focus-within:ring-indigo-500 h-10 overflow-hidden relative ring-2 ring-offset-1 ring-transparent rounded-lg shrink-0 w-10"><input class="absolute cursor-pointer -left-2 -top-2 border-0 h-16 p-0 w-16"@input=render() type=color x-model=bgColor></div><input class="border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full bg-gray-50 dark:text-white flex-1 focus:ring-2 focus:ring-indigo-500 font-mono outline-none px-3 py-2 rounded-lg text-gray-900 text-sm uppercase"@input=render() x-model=bgColor></div></div><div class="flex items-center justify-between py-1"><label class="text-gray-700 dark:text-gray-300 cursor-pointer font-medium text-sm"@click="showOverlay = !showOverlay">Panduan Safe Area</label> <button @click="showOverlay = !showOverlay"class="items-center rounded-full dark:focus:ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-6 inline-flex relative transition-colors w-11":class="showOverlay ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'"><span class="bg-white shadow-sm h-4 inline-block rounded-full transform transition-transform w-4":class="showOverlay ? 'translate-x-6' : 'translate-x-1'"></span></button></div><button @click=centerImage() class="flex items-center gap-2 dark:text-gray-200 text-gray-700 text-sm bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium hover:bg-gray-200 justify-center px-4 py-2.5 rounded-xl transition-colors w-full"><i class=icon-[ri--refresh-line]></i> Reset Posisi</button></div><button @click=download() class="flex items-center gap-2 font-bold active:scale-95 bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none hover:bg-red-700 justify-center py-3.5 rounded-xl shadow-lg shadow-red-500/20 text-white transition-all w-full":disabled=!imageLoaded><i class=icon-[ri--download-2-line]></i> Download Banner</button></div><div class="lg:col-span-8 xl:col-span-9"><div class="border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full aspect-video bg-gray-100 cursor-move group overflow-hidden relative rounded-xl shadow-inner touch-none"@mousedown=startDrag @mousemove.window=drag @mouseup.window=stopDrag @touchend.window=stopDrag @touchmove.window=drag @touchstart=startDrag><canvas class="h-full w-full block object-contain"x-ref=canvas></canvas><div class="absolute inset-0 pointer-events-none z-20"x-show=showOverlay x-transition.opacity><div class="absolute inset-0 bg-black/60"><div class="absolute border-white/30 -translate-y-1/2 bg-black/40 border-y box-content h-[29.375%] left-0 right-0 top-1/2"><div class="flex items-center justify-center absolute -translate-x-1/2 bg-transparent border-white/30 border-x bottom-0 left-1/2 top-0 w-[60.39%]"><div class="border rounded backdrop-blur-sm bg-black/50 border-white/10 font-mono px-2 py-1 sm:text-xs text-[10px] text-white/80">Safe Area (Mobile & All)</div></div><span class="absolute font-mono text-[10px] text-white/50 left-2 top-1">Desktop Max</span></div></div><div class="absolute font-mono text-[10px] text-white/50 bg-black/30 px-2 py-1 right-3 rounded top-3">TV (2560x1440)</div></div><div class="flex items-center justify-center absolute flex-col inset-0 pointer-events-none text-gray-400 z-10"x-show=!imageLoaded><div class="flex items-center justify-center bg-gray-200 dark:bg-gray-800 h-20 mb-4 rounded-full w-20"><i class="icon-[ri--image-add-line] opacity-50 text-4xl"></i></div><p class=font-medium>Pratinjau Banner<p class="mt-1 opacity-75 text-sm">Upload gambar untuk memulai editing</div></div><div class="text-xs dark:text-gray-400 text-gray-500 gap-4 grid grid-cols-1 mt-6 sm:grid-cols-3"><div class="flex gap-2 items-start"><div class="rounded h-4 mt-0.5 shrink-0 w-4 bg-gray-300 dark:bg-gray-700"></div><div><strong class="text-gray-700 block dark:text-gray-300">TV (2560 x 1440)</strong> Area penuh gambar. Hanya terlihat utuh di TV.</div></div><div class="flex gap-2 items-start"><div class="border rounded h-4 mt-0.5 shrink-0 w-4 bg-black/40 border-gray-400"></div><div><strong class="text-gray-700 block dark:text-gray-300">Desktop (2560 x 423)</strong> Area horizontal tengah. Terlihat di komputer.</div></div><div class="flex gap-2 items-start"><div class="border rounded h-4 mt-0.5 shrink-0 w-4 bg-black/60 border-white/50"></div><div><strong class="text-gray-700 block dark:text-gray-300">Mobile (1546 x 423)</strong> Area tengah paling aman. Terlihat di semua perangkat.</div></div></div></div></div></div>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('ytBannerTool', () => ({
        imageLoaded: false,
        img: null,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        bgColor: '#000000',
        showOverlay: true,
        fileName: '',
        
        // Drag state
        isDragging: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,

        init() {
            const canvas = this.$refs.canvas;
            canvas.width = 2560;
            canvas.height = 1440;
            this.render();
        },

        handleFile(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            this.fileName = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    this.img = img;
                    this.imageLoaded = true;
                    this.centerImage();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        },

        centerImage() {
            if (!this.img) return;
            // Calculate scale to fit (contain)
            const scaleW = 2560 / this.img.width;
            const scaleH = 1440 / this.img.height;
            this.scale = Math.min(scaleW, scaleH); // Fit entire image initially
            
            // Center
            this.offsetX = (2560 - (this.img.width * this.scale)) / 2;
            this.offsetY = (1440 - (this.img.height * this.scale)) / 2;
            
            this.render();
        },

        render() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');

            // Clear & Background
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (this.img) {
                const w = this.img.width * this.scale;
                const h = this.img.height * this.scale;
                ctx.drawImage(this.img, this.offsetX, this.offsetY, w, h);
            }
        },

        startDrag(e) {
            if (!this.imageLoaded) return;
            this.isDragging = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            this.startX = clientX;
            this.startY = clientY;
            this.lastX = this.offsetX;
            this.lastY = this.offsetY;
        },

        drag(e) {
            if (!this.isDragging) return;
            e.preventDefault(); // Prevent scrolling on touch
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const deltaX = clientX - this.startX;
            const deltaY = clientY - this.startY;

            // Map DOM delta to Canvas pixels
            // We need to know the ratio of displayed canvas vs actual canvas
            const canvas = this.$refs.canvas;
            const rect = canvas.getBoundingClientRect();
            const ratioX = canvas.width / rect.width;
            const ratioY = canvas.height / rect.height;

            this.offsetX = this.lastX + (deltaX * ratioX);
            this.offsetY = this.lastY + (deltaY * ratioY);
            
            this.render();
        },

        stopDrag() {
            this.isDragging = false;
        },

        download() {
            const canvas = this.$refs.canvas;
            const link = document.createElement('a');
            link.download = 'youtube-banner-' + Date.now() + '.jpg';
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
        }
    }));
});
</script>