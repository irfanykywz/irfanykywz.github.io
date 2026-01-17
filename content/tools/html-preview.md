---
title: "HTML Preview"
date: 2026-01-15T10:00:00+07:00
description: "Alat untuk menguji dan melihat pratinjau kode HTML, CSS, dan JavaScript secara real-time."
icon: "icon-[ri--html5-line]"
---

<div class="max-w-[90rem] mx-auto mt-6">
<div id="mainGrid" class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[600px]">

<!-- Editor Section -->
<div id="editorCol" class="flex flex-col gap-3 h-full">
<div class="flex items-center justify-between px-1">
<label class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
<i class="icon-[ri--code-s-slash-line] text-indigo-500"></i> Editor HTML
</label>
<div class="flex gap-2">
<button id="clearBtn" class="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
<i class="icon-[ri--delete-bin-line]"></i> Bersihkan
</button>
<button id="runBtn" class="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2 active:scale-95">
<i class="icon-[ri--play-fill]"></i> Jalankan
</button>
</div>
</div>

<textarea 
id="htmlEditor"
class="flex-grow w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-sm transition-colors leading-relaxed"
placeholder="<!-- Tempel kode HTML anda disini -->"
spellcheck="false"
></textarea>
<p class="text-xs text-gray-500 dark:text-gray-400 text-right hidden sm:block">
Tips: Tekan <kbd class="font-sans bg-gray-100 dark:bg-gray-700 px-1 rounded border border-gray-200 dark:border-gray-600">Ctrl</kbd> + <kbd class="font-sans bg-gray-100 dark:bg-gray-700 px-1 rounded border border-gray-200 dark:border-gray-600">Enter</kbd> untuk menjalankan
</p>
</div>

<!-- Preview Section -->
<div class="flex flex-col gap-3 h-full">
<div class="flex items-center justify-between px-1">
<label class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
<i class="icon-[ri--eye-line] text-emerald-500"></i> Pratinjau
</label>
<button id="newTabBtn" class="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1" title="Buka di Tab Baru">
<i class="icon-[ri--external-link-line]"></i> Tab Baru
</button>
</div>

<div id="previewContainer" class="flex-grow w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white overflow-hidden shadow-sm relative">
<button id="fullscreenBtn" class="flex absolute top-3 right-6 p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10 border border-gray-200 dark:border-gray-600 shadow-sm" title="Layar Penuh">
<i class="icon-[ri--fullscreen-line]"></i>
</button>
<iframe 
id="previewFrame"
class="w-full h-full border-none bg-white"
sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
title="Preview"
></iframe>
</div>
<p class="text-xs text-gray-500 dark:text-gray-400 text-right hidden sm:block min-h-[1.25rem]">&nbsp;</p>
</div>

</div>
</div>

<script>
(function() {
const editor = document.getElementById('htmlEditor');
const preview = document.getElementById('previewFrame');
    const previewContainer = document.getElementById('previewContainer');
    const mainGrid = document.getElementById('mainGrid');
    const editorCol = document.getElementById('editorCol');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const newTabBtn = document.getElementById('newTabBtn');
const storageKey = 'html_preview_content_v2';

    const defaultCode = ``;

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

function updatePreview() {
const code = editor.value;
const doc = preview.contentDocument || preview.contentWindow.document;

// Reset iframe content
doc.open();
doc.write(code);
doc.close();

// Save to localStorage
localStorage.setItem(storageKey, code);
}

// Event Listeners
runBtn.addEventListener('click', updatePreview);

clearBtn.addEventListener('click', () => {
if(confirm('Hapus semua kode?')) {
editor.value = '';
updatePreview();
}
});

editor.addEventListener('keydown', (e) => {
if (e.ctrlKey && e.key === 'Enter') {
e.preventDefault();
updatePreview();
}
});

    // Auto update with debounce (delay)
    editor.addEventListener('input', debounce(updatePreview, 300));

    // Fullscreen Logic
    function toggleFullscreen() {
        const isFullscreen = previewContainer.classList.contains('fixed');
        
        if (!isFullscreen) {
            previewContainer.classList.add('fixed', 'inset-0', 'z-[100]', 'w-screen', 'h-screen', 'rounded-none');
            previewContainer.classList.remove('rounded-xl', 'border', 'flex-grow', 'relative');
            document.body.style.overflow = 'hidden';
            fullscreenBtn.innerHTML = '<i class="icon-[ri--fullscreen-exit-line]"></i>';
            fullscreenBtn.title = "Keluar Layar Penuh";
        } else {
            previewContainer.classList.remove('fixed', 'inset-0', 'z-[100]', 'w-screen', 'h-screen', 'rounded-none');
            previewContainer.classList.add('rounded-xl', 'border', 'flex-grow', 'relative');
            document.body.style.overflow = '';
            fullscreenBtn.innerHTML = '<i class="icon-[ri--fullscreen-line]"></i>';
            fullscreenBtn.title = "Layar Penuh";
        }
    }

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    newTabBtn.addEventListener('click', () => {
        const code = editor.value;
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.open();
            newWindow.document.write(code);
            newWindow.document.close();
        } else {
            alert('Pop-up diblokir. Izinkan pop-up untuk membuka pratinjau di tab baru.');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && previewContainer.classList.contains('fixed')) {
            toggleFullscreen();
        }
    });

// Initialize
const savedCode = localStorage.getItem(storageKey);
editor.value = savedCode ? savedCode : defaultCode;

// Run once on load
updatePreview();
})();
</script>