---
title: "Penukar Text ke URI Data"
date: 2025-10-13T00:00:00+07:00
description: "Tukar Markdown atau HTML mentah menjadi URI `data:text/html` yang disandikan"
icon: "ri-key-fill"
---

<style>
.app-container {
max-width: 64rem; /* max-w-5xl */
margin-left: auto;
margin-right: auto;
}

.app-header {
text-align: center;
margin-bottom: var(--space-8);
}
.app-header h1 {
font-size: 2.25rem; 
font-weight: 800;
color: var(--accent-primary); 
margin-bottom: var(--space-2);
}
.app-header p {
color: var(--text-secondary); 
}

/* Card Style */
.card {
background-color: var(--bg-secondary);
padding: var(--space-6);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-xl);
margin-bottom: var(--space-8);
}

/* Input & Output Areas */
.card label {
display: block;
font-size: 1.125rem; 
font-weight: 500; 
margin-bottom: var(--space-3);
}

textarea {
resize: none;
width: 100%;
padding: var(--space-4);
background-color: var(--bg-tertiary);
border: 1px solid var(--border-color);
border-radius: var(--radius-lg);
color: var(--text-primary);
font-size: 0.875rem;
min-height: 10rem;
transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
textarea:focus {
outline: none;
border-color: var(--accent-primary);
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Ring effect */
}

#uriOutput {
color: var(--accent-warning); 
font-family: var(--font-mono); 
word-break: break-all;
}
#uriOutput:focus {
border-color: var(--accent-warning);
box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.5);
}

/* Mode Selector Styling */
#modeSelector label {
display: inline;
margin-right: var(--space-4);
font-size: 1rem;
font-weight: 400; /* Override card label font-weight */
color: var(--text-primary);
cursor: pointer;
transition: color var(--transition-fast);
}
#modeSelector input[type="radio"]:checked + label {
font-weight: 700;
color: var(--accent-secondary);
}
#modeSelector input[type="radio"] {
margin-right: var(--space-1);
}

/* Button Styles */
.button-group {
display: flex;
justify-content: center;
margin-bottom: var(--space-8);
}
.button-base {
padding: var(--space-3) var(--space-8);
font-weight: 700;
border-radius: 9999px; 
transition: var(--transition-normal);
cursor: pointer;
border: none;
display: inline-flex;
align-items: center;
justify-content: center;
line-height: 1; /* Fix vertical alignment */
}

.button-primary {
background-color: var(--accent-primary); 
color: var(--text-primary);
box-shadow: var(--shadow-lg), 0 0 15px rgba(59, 130, 246, 0.4); 
}
.button-primary:hover {
opacity: 0.9;
transform: scale(1.05);
}

.button-secondary {
padding: var(--space-2) var(--space-5);
background-color: var(--accent-warning); 
color: var(--bg-primary); 
font-weight: 600;
border-radius: var(--radius-lg);
box-shadow: var(--shadow-md);
}
.button-secondary:hover {
opacity: 0.9;
}

/* Responsive Grid Layout */
.responsive-grid {
display: flex;
flex-direction: column;
gap: var(--space-8);
}
@media (min-width: 768px) {
.responsive-grid {
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
}
}

/* Preview Area */
.preview-text {
color: var(--text-muted); 
margin-top: var(--space-2);
font-size: 0.75rem; 
}
.preview-frame-wrapper {
width: 100%;
height: 20rem; 
background-color: var(--text-primary); 
border: 4px solid var(--accent-secondary); 
border-radius: var(--radius-lg);
overflow: hidden;
box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2); 
padding: var(--space-1);
}
.preview-frame-wrapper iframe {
width: 100%;
height: 100%;
background-color: var(--text-primary);
border: none;
}

/* Message Box */
.message-box {
position: fixed;
bottom: var(--space-4);
right: var(--space-4);
padding: var(--space-3);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-xl);
color: var(--text-primary);
opacity: 0;
transition: opacity var(--transition-normal);
pointer-events: none;
z-index: 100;
}
.message-box.success {
background-color: var(--accent-secondary);
}
.message-box.error {
background-color: var(--accent-danger);
}
</style>

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

<div class="app-container">
<br>
<!-- Bahagian Input Kandungan -->
<div class="card">

<!-- Pemilih Mod -->
<div id="modeSelector" style="margin-bottom: var(--space-4);">
<span style="font-weight: 500; margin-right: var(--space-4); color: var(--text-primary);">Pilih Mod Input:</span>
<input type="radio" id="modeHtml" name="inputMode" value="html" checked>
<label for="modeHtml">HTML</label>

<input type="radio" id="modeMarkdown" name="inputMode" value="markdown">
<label for="modeMarkdown">Markdown</label>
</div>

<label id="inputLabel" for="inputContent" style="color: var(--accent-primary);">
<!-- Label akan dikemas kini oleh JS -->
</label>
<textarea 
id="inputContent" 
rows="10" 
placeholder="Placeholder akan dikemas kini oleh JS"
></textarea>
</div>

<!-- Bahagian Butang -->
<div class="button-group">
<button 
id="convertButton"
class="button-base button-primary"
>
Tukar & Jana URI Data
</button>
</div>

<!-- Bahagian Output URI Data & Pratonton -->
<div class="responsive-grid">

<div class="card">
<label for="uriOutput" style="color: var(--accent-warning);">
2. URI Data Dihasilkan (`data:text/html,...`)
</label>
<textarea 
id="uriOutput" 
rows="10" 
readonly 
placeholder="URI Data akan muncul di sini selepas penukaran..."
></textarea>

<div style="margin-top: var(--space-4); display: flex; justify-content: flex-end;">
<button 
id="copyButton"
class="button-base button-secondary"
>
<!-- Ikon Salin (Inline SVG) -->
<svg style="width: 1.25rem; height: 1.25rem; margin-right: var(--space-2);" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v2"></path></svg>
Salin ke Clipboard
</button>
</div>
</div>

<!-- Bahagian Pratonton -->
<div class="card">
<h3 style="color: var(--accent-secondary); font-size: 1.125rem; font-weight: 500; margin-bottom: var(--space-3);">
3. Pratonton Kandungan
</h3>
<div class="preview-frame-wrapper">
<iframe 
id="previewIframe" 
srcdoc="" 
title="Pratonton HTML yang dijana"
></iframe>
</div>
<p class="preview-text">
Ini memaparkan hasil penukaran yang dimuatkan sebagai dokumen HTML.
</p>
</div>
</div>

</div>

<!-- Kotak Mesej (Untuk Notifikasi Salin) -->
<div id="messageBox" class="message-box">
<!-- Mesej akan dimasukkan di sini oleh JavaScript -->
</div>
