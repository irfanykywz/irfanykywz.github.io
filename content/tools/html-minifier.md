---
title: "HTML Minifier"
date: 2026-01-26T14:00:00+07:00
description: "Alat untuk meminimalkan kode HTML dengan menghapus spasi, komentar, dan karakter yang tidak perlu."
icon: "icon-[ri--code-s-line]"
---

<div class="max-w-4xl mx-auto mt-6 space-y-6"> <div class="flex flex-col gap-2"> <label for="input" class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"> <i class="icon-[ri--input-method-line]"></i> Input HTML </label> <textarea id="input" rows="10" class="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors resize-y shadow-sm" placeholder="Tempel kode HTML yang ingin diminifikasi di sini..."></textarea> </div> <div class="flex flex-wrap gap-3 justify-center sm:justify-start"> <button id="minifyBtn" class="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95 flex items-center gap-2"> <i class="icon-[ri--code-s-line]"></i> Minifikasi </button> <button id="clearBtn" class="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95 flex items-center gap-2 border border-gray-200 dark:border-gray-700"> <i class="icon-[ri--delete-bin-line]"></i> Bersihkan </button> </div> <div class="flex flex-col gap-2"> <div class="flex justify-between items-center"> <label for="output" class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"> <i class="icon-[ri--terminal-box-line]"></i> Output HTML (Minified) </label> <button id="copyBtn" class="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 border border-gray-200 dark:border-gray-700"> <i class="icon-[ri--file-copy-line]"></i> Salin </button> </div> <textarea id="output" rows="10" readonly class="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-colors resize-y shadow-inner" placeholder="Hasil minifikasi akan muncul di sini..."></textarea> </div> </div>

<script>
(function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const minifyBtn = document.getElementById('minifyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');

    function minify() {
        try {
            let html = input.value;
            // Remove comments
            html = html.replace(/<!--[\s\S]*?-->/g, '');
            // Remove whitespace
            html = html.replace(/\s+/g, ' ');
            //Remove leading and trailing whitespace
            html = html.trim();

            output.value = html;
        } catch (e) {
            output.value = "Error: " + e.message;
        }
    }

    minifyBtn.addEventListener('click', minify);

    clearBtn.addEventListener('click', () => {
        input.value = '';
        output.value = '';
        input.focus();
    });

    copyBtn.addEventListener('click', () => {
        if (!output.value) return;
        navigator.clipboard.writeText(output.value).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="icon-[ri--check-line]"></i> Tersalin';
            copyBtn.classList.add('text-emerald-600', 'dark:text-emerald-400');
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.classList.remove('text-emerald-600', 'dark:text-emerald-400');
            }, 2000);
        });
    });
})();
</script>