---
title: "Penukar Text ke URI Data"
date: 2025-10-13T00:00:00+07:00
description: "Tukar Markdown atau HTML mentah menjadi URI `data:text/html` yang disandikan"
icon: "icon-[ri--file-transfer-line]"
---

<!-- Marked.js for Markdown conversion -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>
    // Global placeholder and label content
    const placeholders = {
        html: 'Masukkan kod HTML yang lengkap di sini (termasuk <html> dan <body>). Contoh:\n<html><body style="background: navy; color: white; padding: 20px;"><h1>Hello URI Data!</h1></body></html>',
        markdown: `Masukkan sintaks Markdown di sini. Contoh:\n\n# Laporan Kemajuan\n\nTeks **tebal** dan _condong_.\n\n* Senarai Item 1\n* Senarai Item 2\n\n[Pautan ke Google](https://www.google.com)`
    };

    const labels = {
        html: '1. Masukkan Kod HTML Anda',
        markdown: '1. Masukkan Kod Markdown Anda'
    };
    
    /**
     * Fungsi utama untuk menukar kandungan (Markdown atau HTML) kepada URI data:text/html.
     */
    function convertContentToDataUri() {
        const inputContentArea = document.getElementById('inputContent');
        const uriOutput = document.getElementById('uriOutput');
        const previewIframe = document.getElementById('previewIframe');
        
        // Dapatkan mod input yang dipilih
        const mode = document.querySelector('input[name="inputMode"]:checked').value;
        const content = inputContentArea.value.trim();
        let finalHtmlContent;

        if (!content) {
            uriOutput.value = `Sila masukkan kod ${mode.toUpperCase()}.`;
            previewIframe.srcdoc = "";
            return;
        }

        try {
            if (mode === 'html') {
                // HTML Mode: Gunakan kandungan HTML secara langsung
                finalHtmlContent = content;
            } else if (mode === 'markdown') {
                // Markdown Mode: Tukar kepada HTML menggunakan Marked.js
                const rawHtmlOutput = marked.parse(content);
                
                // Bungkus HTML yang dihasilkan dalam struktur dokumen HTML penuh dengan gaya asas
                finalHtmlContent = `<style> body { font-family: sans-serif; padding: 15px; color: #333; background: #fff; } h1, h2, h3 { color: #2563eb; } pre, code { background: #eee; padding: 2px 4px; border-radius: 4px; }`;
                finalHtmlContent += '</' + 'style>'
                finalHtmlContent += rawHtmlOutput
            }

            // Encode dan jana Data URI
            const dataUri = 'data:text/html,' + encodeURIComponent(finalHtmlContent);
            
            uriOutput.value = dataUri;
            previewIframe.srcdoc = finalHtmlContent;

        } catch (error) {
            uriOutput.value = `Ralat dalam penukaran: ${error.message}`;
            previewIframe.srcdoc = "";
        }
    }

    /**
     * Mengemas kini label dan placeholder input berdasarkan mod yang dipilih.
     */
    function updateInputArea() {
        const mode = document.querySelector('input[name="inputMode"]:checked').value;
        document.getElementById('inputLabel').textContent = labels[mode];
        document.getElementById('inputContent').placeholder = placeholders[mode];
    }


    /**
     * Fungsi untuk menyalin kandungan output ke clipboard.
     */
    function copyToClipboard() {
        const uriOutput = document.getElementById('uriOutput');

        if (!uriOutput.value || uriOutput.value.startsWith("Sila masukkan")) {
            showMessage("Tiada URI untuk disalin.", 'error');
            return;
        }

        // Guna document.execCommand('copy') 
        uriOutput.select();
        uriOutput.setSelectionRange(0, 99999); 
        
        try {
            document.execCommand('copy');
            showMessage("URI data berjaya disalin!", 'success');
        } catch (err) {
            console.error('Gagal menyalin:', err);
            showMessage("Gagal menyalin. Sila salin secara manual.", 'error');
        }
    }

    /**
     * Fungsi untuk memaparkan mesej sementara.
     */
    function showMessage(message, type) {
        const messageBox = document.getElementById('messageBox');
        messageBox.textContent = message;
        
        // Menggunakan jenis ('success'/'error') untuk memilih kelas CSS
        let classType = (type === 'success') ? 'success' : 'error';

        messageBox.className = `message-box ${classType}`;
        messageBox.style.opacity = '1';

        setTimeout(() => {
            messageBox.style.opacity = '0';
        }, 3000);
    }

    // Jalankan fungsi penukaran apabila butang diklik dan sediakan event listener
    window.onload = function() {
        document.getElementById('convertButton').addEventListener('click', convertContentToDataUri);
        document.getElementById('copyButton').addEventListener('click', copyToClipboard);

        // Set initial state and setup listeners for mode change
        document.querySelectorAll('input[name="inputMode"]').forEach(radio => {
            radio.addEventListener('change', updateInputArea);
        });
        updateInputArea(); // Tetapkan label dan placeholder awal (default: HTML)
    };
</script>

<div class="max-w-5xl mx-auto">
<br>
<!-- Bahagian Input Kandungan -->
<div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">

<!-- Pemilih Mod -->
<div id="modeSelector" class="mb-4 flex items-center gap-4">
<span class="font-medium text-gray-900 dark:text-white">Pilih Mod Input:</span>
<div class="flex items-center gap-2">
    <input type="radio" id="modeHtml" name="inputMode" value="html" checked class="text-indigo-600 focus:ring-indigo-500">
    <label for="modeHtml" class="text-gray-700 dark:text-gray-300 cursor-pointer">HTML</label>
</div>

<div class="flex items-center gap-2">
    <input type="radio" id="modeMarkdown" name="inputMode" value="markdown" class="text-indigo-600 focus:ring-indigo-500">
    <label for="modeMarkdown" class="text-gray-700 dark:text-gray-300 cursor-pointer">Markdown</label>
</div>
</div>

<label id="inputLabel" for="inputContent" class="block text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3">
<!-- Label akan dikemas kini oleh JS -->
</label>
<textarea 
id="inputContent" 
rows="10" 
placeholder="Placeholder akan dikemas kini oleh JS"
class="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-sm min-h-[10rem] focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-y"
></textarea>
</div>

<!-- Bahagian Butang -->
<div class="flex justify-center mb-8">
<button 
id="convertButton"
class="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all transform active:scale-95"
>
Tukar & Jana URI Data
</button>
</div>

<!-- Bahagian Output URI Data & Pratonton -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

<div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
<label for="uriOutput" class="block text-lg font-medium text-amber-500 dark:text-amber-400 mb-3">
2. URI Data Dihasilkan (`data:text/html,...`)
</label>
<textarea 
id="uriOutput" 
rows="10" 
readonly 
placeholder="URI Data akan muncul di sini selepas penukaran..."
class="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-amber-600 dark:text-amber-400 font-mono text-xs min-h-[10rem] focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-y break-all"
></textarea>

<div class="mt-4 flex justify-end">
<button 
id="copyButton"
class="inline-flex items-center px-5 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition-colors"
>
<!-- Ikon Salin (Inline SVG) -->
<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v2"></path></svg>
Salin ke Clipboard
</button>
</div>
</div>

<!-- Bahagian Pratonton -->
<div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
<h3 class="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-3">
3. Pratonton Kandungan
</h3>
<div class="w-full h-80 bg-white border-4 border-emerald-500 rounded-xl overflow-hidden shadow-inner p-1">
<iframe 
id="previewIframe" 
srcdoc="" 
title="Pratonton HTML yang dijana"
class="w-full h-full border-none bg-white"
></iframe>
</div>
<p class="text-gray-500 dark:text-gray-400 mt-2 text-xs">
Ini memaparkan hasil penukaran yang dimuatkan sebagai dokumen HTML.
</p>
</div>
</div>

</div>

<!-- Kotak Mesej (Untuk Notifikasi Salin) -->
<div id="messageBox" class="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-xl text-white opacity-0 transition-opacity duration-300 pointer-events-none z-50">
<!-- Mesej akan dimasukkan di sini oleh JavaScript -->
</div>
