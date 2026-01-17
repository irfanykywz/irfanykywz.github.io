---
title: "Pemilih Warna"
date: 2025-10-07T00:00:00+07:00
description: "Alat kecil untuk memilih warna, melihat pratinjau, dan menyalin nilai hex. Menggunakan variabel CSS tema."
icon: "icon-[ri--palette-line]"
---

<div class="grid gap-6 mt-6 items-start">
    <div class="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex gap-4 items-center">
        <div id="swatch" class="w-20 h-20 rounded-xl border border-gray-200 dark:border-gray-700 bg-blue-500 shadow-inner" aria-hidden="true"></div>
        <div class="flex-grow">
          <label for="colorInput" class="block font-bold text-gray-900 dark:text-white mb-2">Pilih warna</label>
          <input id="colorInput" class="w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent cursor-pointer p-1" type="color" value="#3b82f6">
        </div>
      </div>

<div class="flex gap-3 items-center mt-6">
<input id="hexValue" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" type="text" value="#3b82f6" aria-label="nilai hex">
<button id="copyBtn" class="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium shadow-sm active:scale-95 transform">Salin</button>
</div>

<div class="mt-4 text-sm text-gray-500 dark:text-gray-400">Contoh variabel tema: <code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono text-xs">--accent-primary</code> = <span id="varAccent" class="font-mono">var(--accent-primary)</span></div>
</div>

<div class="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
<h3 class="font-bold text-gray-900 dark:text-white mb-4">Ambil Warna dari Gambar</h3>

<div class="mb-4">
<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unggah Gambar</label>
<input type="file" id="imageInput" accept="image/*" class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 transition-colors cursor-pointer"/>
</div>

<div class="relative w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[200px]">
<p id="placeholderText" class="text-gray-400 text-sm pointer-events-none">Pratinjau gambar akan muncul di sini</p>
<canvas id="imageCanvas" class="max-w-full hidden cursor-none"></canvas>
<div id="magnifier" class="hidden absolute w-32 h-32 rounded-full border-4 border-white dark:border-gray-600 shadow-2xl pointer-events-none z-20 bg-gray-100 dark:bg-gray-800 overflow-hidden">
  <canvas id="magnifierCanvas" width="128" height="128" class="w-full h-full"></canvas>
</div>
</div>

<div class="mt-2 text-xs text-gray-500 dark:text-gray-400">Klik pada gambar untuk mengambil warna pixel.</div>
</div>

<div class="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-6">
<div>
<h3 class="font-bold text-gray-900 dark:text-white mb-3">Swatches</h3>
<div class="flex gap-3 flex-wrap">
<button class="swatch-btn w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" data-color="#3b82f6" aria-label="swatch 1" style="background-color: #3b82f6;"></button>
<button class="swatch-btn w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" data-color="#10b981" style="background-color: #10b981;"></button>
<button class="swatch-btn w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" data-color="#f59e0b" style="background-color: #f59e0b;"></button>
<button class="swatch-btn w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" data-color="#d96d65" style="background-color: #d96d65;"></button>
<button class="swatch-btn w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" data-color="#2563eb" style="background-color: #2563eb;"></button>
</div>
</div>

<div>
<h3 class="font-bold text-gray-900 dark:text-white mb-3">Pratinjau</h3>
<div class="flex flex-col gap-4">
<div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50">
<div class="font-bold text-gray-900 dark:text-white text-lg" id="previewText">Contoh judul pratinjau</div>
<div class="text-gray-500 dark:text-gray-400 text-sm mt-1" id="previewSub">Contoh subteks untuk menilai kontras</div>
</div>
<div class="flex gap-3">
<div id="btnPreview" class="flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all shadow-sm" style="background-color: #3b82f6; color: white;">Tombol utama</div>
<div id="btnPreview2" class="flex-1 py-3 px-4 rounded-lg text-center font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">Sekunder</div>
</div>
</div>
</div>

<div class="mt-auto text-gray-500 dark:text-gray-400 text-sm italic">Tip: Gunakan input warna atau swatches. Klik Salin untuk menyalin nilai hex ke clipboard.</div>
</div>
</div>


<script>
(() => {
  const colorInput = document.getElementById('colorInput');
  const swatch = document.getElementById('swatch');
  const hexValue = document.getElementById('hexValue');
  const copyBtn = document.getElementById('copyBtn');
  const varAccent = document.getElementById('varAccent');
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const imageInput = document.getElementById('imageInput');
  const imageCanvas = document.getElementById('imageCanvas');
  const magnifier = document.getElementById('magnifier');
  const magnifierCanvas = document.getElementById('magnifierCanvas');
  const placeholderText = document.getElementById('placeholderText');

  function setColor(hex) {
    swatch.style.background = hex;
    hexValue.value = hex;
    document.getElementById('btnPreview').style.background = hex;
    const c = hex.substring(1);
    const rgb = parseInt(c,16);
    const r = (rgb>>16)&255, g = (rgb>>8)&255, b = (rgb)&255;
    const luminance = 0.2126*r + 0.7152*g + 0.0722*b;
    document.getElementById('btnPreview').style.color = luminance > 140 ? '#0f172a' : '#fff';
  }

  colorInput.addEventListener('input', e => setColor(e.target.value));
  hexValue.addEventListener('change', e => {
    const v = e.target.value.trim();
    if(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) setColor(v);
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(hexValue.value);
      copyBtn.textContent = 'Tersalin';
      setTimeout(() => (copyBtn.textContent = 'Salin'), 1500);
    } catch (err) {
      copyBtn.textContent = 'Gagal menyalin';
      setTimeout(() => (copyBtn.textContent = 'Salin'), 1500);
    }
  });

  swatchBtns.forEach(b => {
    const c = b.dataset.color;
    if(c) b.style.background = c;
    b.addEventListener('click', e => setColor(e.currentTarget.dataset.color));
  });

  // Image Picker Logic
  if(imageInput && imageCanvas) {
    const ctx = imageCanvas.getContext('2d');
    const magCtx = magnifierCanvas ? magnifierCanvas.getContext('2d') : null;
    
    imageInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = () => {
          imageCanvas.width = img.width;
          imageCanvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          imageCanvas.classList.remove('hidden');
          placeholderText.classList.add('hidden');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    if (magCtx) {
        imageCanvas.addEventListener('mousemove', e => {
            magnifier.classList.remove('hidden');
            const rect = imageCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Posisi magnifier (tengah kursor)
            magnifier.style.left = `${x - magnifier.offsetWidth / 2}px`;
            magnifier.style.top = `${y - magnifier.offsetHeight / 2}px`;

            // Hitung koordinat source pada gambar asli
            const scaleX = imageCanvas.width / rect.width;
            const scaleY = imageCanvas.height / rect.height;
            const srcX = x * scaleX;
            const srcY = y * scaleY;

            // Gambar area zoom
            const zoom = 4;
            const magW = magnifierCanvas.width;
            const magH = magnifierCanvas.height;
            const srcW = magW / zoom;
            const srcH = magH / zoom;

            magCtx.imageSmoothingEnabled = false; // Pixelated agar jelas
            magCtx.clearRect(0, 0, magW, magH);
            magCtx.drawImage(imageCanvas, srcX - srcW/2, srcY - srcH/2, srcW, srcH, 0, 0, magW, magH);

            // Gambar Crosshair (Bidikan)
            magCtx.strokeStyle = '#ef4444'; // red-500
            magCtx.lineWidth = 1;
            magCtx.strokeRect((magW - zoom)/2, (magH - zoom)/2, zoom, zoom);
        });

        imageCanvas.addEventListener('mouseleave', () => {
            magnifier.classList.add('hidden');
        });
    }

    imageCanvas.addEventListener('click', e => {
        const rect = imageCanvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (imageCanvas.width / rect.width);
        const y = (e.clientY - rect.top) * (imageCanvas.height / rect.height);
        const p = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
        setColor(hex);
    });
  }

  try {
    const cs = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
    if(varAccent) varAccent.textContent = cs || 'n/a';
  } catch (e) {}
})();
</script>
