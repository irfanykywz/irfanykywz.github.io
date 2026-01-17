---
title: "Fetch Converter"
date: 2026-01-16T11:00:00+07:00
description: "Alat untuk mengubah perintah fetch (Copy as fetch) dari browser menjadi kode Python Requests."
icon: "icon-[ri--translate-2]"
---

<div class="max-w-[90rem] mx-auto mt-6">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
<!-- Input Section -->
<div class="flex flex-col gap-3">
    <div class="flex items-center justify-between px-1">
        <label class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <i class="icon-[ri--code-box-line] text-indigo-500"></i> Input (Fetch)
        </label>
        <button id="pasteBtn" class="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
            <i class="icon-[ri--clipboard-line]"></i> Tempel
        </button>
    </div>
    <textarea id="inputCode" class="flex-grow w-full h-[500px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-sm transition-colors leading-relaxed" placeholder="Tempel kode fetch di sini (Klik kanan di Network tab browser > Copy > Copy as fetch)..." spellcheck="false"></textarea>
</div>

<!-- Output Section -->
<div class="flex flex-col gap-3">
    <div class="flex items-center justify-between px-1">
        <label class="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <i class="icon-[ri--terminal-box-line] text-emerald-500"></i> Output (Python Requests)
        </label>
        <button id="copyBtn" class="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
            <i class="icon-[ri--file-copy-line]"></i> Salin
        </button>
    </div>
    <textarea id="outputCode" readonly class="flex-grow w-full h-[500px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-inner transition-colors leading-relaxed" placeholder="Hasil konversi akan muncul di sini..."></textarea>
</div>
</div>
</div>

<script>
(function() {
const inputCode = document.getElementById('inputCode');
const outputCode = document.getElementById('outputCode');
const pasteBtn = document.getElementById('pasteBtn');
const copyBtn = document.getElementById('copyBtn');

function convertFetchToPython(fetchCode) {
if (!fetchCode.trim()) return '';

try {
    let capturedUrl = '';
    let capturedOptions = {};

    // Mock fetch function
    const mockFetch = (url, options) => {
        capturedUrl = url;
        capturedOptions = options || {};
        return {
            then: function() { return this; },
            catch: function() { return this; },
            finally: function() { return this; }
        };
    };

    // Execute the fetch code in a sandbox-ish way
    const run = new Function('fetch', fetchCode);
    run(mockFetch);

    if (!capturedUrl) return 'Error: Tidak dapat membaca URL dari kode fetch.';

    let pythonCode = 'import requests\nimport json\n\n';
    pythonCode += `url = "${capturedUrl}"\n\n`;

    // Headers
    if (capturedOptions.headers && Object.keys(capturedOptions.headers).length > 0) {
        pythonCode += 'headers = {\n';
        for (const [key, value] of Object.entries(capturedOptions.headers)) {
            pythonCode += `    "${key}": "${value}",\n`;
        }
        pythonCode += '}\n\n';
    } else {
        pythonCode += 'headers = {}\n\n';
    }

    // Body
    let dataParam = '';
    if (capturedOptions.body) {
        try {
            // Try to parse as JSON
            const jsonBody = JSON.parse(capturedOptions.body);
            // Convert JSON object to Python dict string representation
            // We use json.loads('''...''') in python to avoid boolean syntax issues (true vs True)
            const prettyJson = JSON.stringify(jsonBody, null, 4);
            
            pythonCode += `payload = json.loads('''${prettyJson}''')\n\n`;
            dataParam = 'json=payload';
        } catch (e) {
            // If not JSON, treat as string data
            pythonCode += `payload = ${JSON.stringify(capturedOptions.body)}\n\n`;
            dataParam = 'data=payload';
        }
    }

    const method = (capturedOptions.method || 'GET').toUpperCase();
    
    pythonCode += `response = requests.request("${method}", url, headers=headers`;
    if (dataParam) {
        pythonCode += `, ${dataParam}`;
    }
    pythonCode += ')\n\n';
    pythonCode += 'print(response.text)';

    return pythonCode;

} catch (e) {
    return `Error: ${e.message}\n\nPastikan Anda menyalin kode "Copy as fetch" yang valid dari browser.`;
}
}

inputCode.addEventListener('input', () => {
outputCode.value = convertFetchToPython(inputCode.value);
});

pasteBtn.addEventListener('click', async () => {
try {
    const text = await navigator.clipboard.readText();
    inputCode.value = text;
    outputCode.value = convertFetchToPython(text);
} catch (err) {
    alert('Gagal membaca clipboard. Pastikan izin diberikan.');
}
});

copyBtn.addEventListener('click', () => {
if (!outputCode.value) return;
navigator.clipboard.writeText(outputCode.value).then(() => {
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