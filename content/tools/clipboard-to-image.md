---
title: "Clipboard to Image"
date: 2026-01-26T10:00:00+07:00
description: "Alat praktis untuk menempelkan tangkapan layar dari clipboard dan menyimpannya sebagai file gambar secara instan."
icon: "icon-[ri--clipboard-line]"
---

<div class="max-w-4xl mx-auto mt-6 space-y-6">

<!-- Paste Area -->
<div id="pasteArea" class="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group relative overflow-hidden select-none">
    <div class="text-center space-y-3 z-10 pointer-events-none px-4">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
            <i class="icon-[ri--clipboard-line] text-3xl text-gray-400 group-hover:text-indigo-500 transition-colors"></i>
        </div>
        <p class="text-gray-600 dark:text-gray-300 font-medium text-lg">Klik di sini lalu tekan <kbd class="px-2 py-1 bg-white dark:bg-gray-700 rounded text-sm border border-gray-200 dark:border-gray-600 shadow-sm font-sans">Ctrl</kbd> + <kbd class="px-2 py-1 bg-white dark:bg-gray-700 rounded text-sm border border-gray-200 dark:border-gray-600 shadow-sm font-sans">V</kbd></p>
        <p class="text-sm text-gray-400">Atau gunakan tombol di bawah untuk menempelkan</p>
    </div>
    <!-- Hidden input to capture focus for mobile/general paste -->
    <input type="text" class="absolute inset-0 opacity-0 cursor-pointer" id="hiddenInput" autocomplete="off">
</div>

<!-- Action Buttons -->
<div class="flex flex-wrap gap-3 justify-center">
    <button id="pasteBtn" class="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95 flex items-center gap-2">
        <i class="icon-[ri--clipboard-fill]"></i> Tempel dari Clipboard
    </button>
    <button id="downloadBtn" class="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-sm active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none" disabled>
        <i class="icon-[ri--download-2-line]"></i> Unduh Gambar
    </button>
    <button id="clearBtn" class="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95 flex items-center gap-2 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
        <i class="icon-[ri--delete-bin-line]"></i> Bersihkan
    </button>
</div>

<!-- Preview Section -->
<div id="previewContainer" class="hidden flex-col gap-3 animate-fade-in-up">
    <div class="flex justify-between items-end border-b border-gray-100 dark:border-gray-700 pb-2">
        <label class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <i class="icon-[ri--image-line] text-indigo-500"></i> Pratinjau
        </label>
        <span id="imageInfo" class="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"></span>
    </div>
    <div class="relative rounded-xl border border-gray-200 dark:border-gray-700 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ib3BhY2l0eSIgZmlsbC1vcGFjaXR5PSIwLjA1Ij48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjAiIHk9IjAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMCIgeT0iMTAiIC8+PC9zdmc+')] dark:bg-gray-900 overflow-hidden shadow-sm min-h-[200px] flex items-center justify-center p-4">
        <img id="previewImage" class="max-w-full h-auto object-contain shadow-lg rounded-lg" alt="Preview">
    </div>
</div>

</div>

<script>
(function() {
    const pasteArea = document.getElementById('pasteArea');
    const hiddenInput = document.getElementById('hiddenInput');
    const pasteBtn = document.getElementById('pasteBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const imageInfo = document.getElementById('imageInfo');

    let currentBlob = null;

    // Focus hidden input when clicking the area
    pasteArea.addEventListener('click', () => hiddenInput.focus());

    // Handle paste events
    window.addEventListener('paste', handlePaste);
    
    // Handle paste button
    pasteBtn.addEventListener('click', async () => {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                const imageType = item.types.find(type => type.startsWith('image/'));
                if (imageType) {
                    const blob = await item.getType(imageType);
                    displayImage(blob);
                    return;
                }
            }
            alert('Tidak ada gambar di clipboard.');
        } catch (err) {
            hiddenInput.focus();
            alert('Gagal membaca clipboard secara otomatis. Silakan klik area kotak di atas dan tekan Ctrl+V.');
        }
    });

    function handlePaste(e) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                displayImage(blob);
                e.preventDefault();
                return;
            }
        }
    }

    function displayImage(blob) {
        if (!blob) return;
        currentBlob = blob;
        const url = URL.createObjectURL(blob);
        
        previewImage.src = url;
        previewContainer.classList.remove('hidden');
        previewContainer.classList.add('flex');
        
        const size = (blob.size / 1024).toFixed(2) + ' KB';
        const type = blob.type.split('/')[1].toUpperCase();
        
        const img = new Image();
        img.onload = function() {
            imageInfo.textContent = `${this.width}x${this.height}px • ${type} • ${size}`;
        };
        img.src = url;

        downloadBtn.disabled = false;
        clearBtn.disabled = false;
        
        // Scroll to preview
        previewContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    downloadBtn.addEventListener('click', () => {
        if (!currentBlob) return;
        const url = URL.createObjectURL(currentBlob);
        const a = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
        a.href = url;
        a.download = `screenshot-${timestamp}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    clearBtn.addEventListener('click', () => {
        currentBlob = null;
        previewImage.src = '';
        previewContainer.classList.add('hidden');
        previewContainer.classList.remove('flex');
        downloadBtn.disabled = true;
        clearBtn.disabled = true;
        imageInfo.textContent = '';
        hiddenInput.value = '';
        pasteArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
})();
</script>