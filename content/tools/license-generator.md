---
title: License Generator
date: 2025-10-27T20:00:00+07:00
description: Alat Generate Lisensi
icon: "icon-[ri--key-fill]"
---
<!-- Using a CDN for the UUID library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js"></script>



<div class="body">
<div class="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mx-auto">

<!-- Input Group: SECRET_KEY (Dengan tombol Tempel) -->
<div class="mb-6">
<label for="secretKey" class="block mb-2 font-bold text-red-600 dark:text-red-400">SECRET_KEY (Jaga kerahasiaannya!)</label>
<div class="flex gap-2 items-center">
<input type="text" id="secretKey" value="your-super-secret-key-that-no-one-should-know" class="flex-grow w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
<button id="pasteSecretKeyBtn" class="w-auto px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors whitespace-nowrap">Tempel</button>
</div>
</div>

<!-- Input Group: Machine ID (Dengan tombol Tempel) -->
<div class="mb-6">
<label for="machineId" class="block mb-2 font-semibold text-gray-600 dark:text-gray-400">Machine ID</label>
<div class="flex gap-2 items-center">
<input type="text" id="machineId" placeholder="Tempel Machine ID target" class="flex-grow w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
<button id="pasteMachineIdBtn" class="w-auto px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors whitespace-nowrap">Tempel</button>
</div>
<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">ID ini harus didapatkan dari mesin target (hasil hash).</p>
</div>

<!-- License Type Selection -->
<div class="mb-6">
<label for="licenseType" class="block mb-2 font-semibold text-gray-600 dark:text-gray-400">Jenis Lisensi</label>
<select id="licenseType" class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
<option value="standard">Standard</option>
<option value="lifetime">Lifetime</option>
</select>
</div>

<!-- Expiry Duration Group (Dynamic Display) -->
<div class="mb-6" id="expiryDurationGroup">
<label class="block mb-2 font-semibold text-gray-600 dark:text-gray-400">Durasi Lisensi (dari sekarang)</label>
<div class="flex gap-3">
<div class="flex-1">
<label for="addYears" class="text-xs text-gray-500 dark:text-gray-400 block mb-1">Tahun</label>
<input type="number" id="addYears" value="1" min="0" class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
</div>
<div class="flex-1">
<label for="addMonths" class="text-xs text-gray-500 dark:text-gray-400 block mb-1">Bulan</label>
<input type="number" id="addMonths" value="0" min="0" class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
</div>
<div class="flex-1">
<label for="addDays" class="text-xs text-gray-500 dark:text-gray-400 block mb-1">Hari</label>
<input type="number" id="addDays" value="0" min="0" class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
</div>
<div class="flex-1">
<label for="addHours" class="text-xs text-gray-500 dark:text-gray-400 block mb-1">Jam</label>
<input type="number" id="addHours" value="0" min="0" class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
</div>
</div>
</div>

<!-- Generate Button -->
<button id="generateBtn" class="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95">Generate Key</button>

<!-- Result Display -->
<div id="result" class="mt-6 p-5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg relative flex items-center justify-between min-h-[3rem] group">
<!-- Key output is now in a dedicated span -->
<span id="keyOutput" class="flex-grow pr-12 break-all font-mono text-gray-500 dark:text-gray-400">Kunci yang Anda hasilkan akan muncul di sini...</span>
<button id="copyResultBtn" class="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hidden group-hover:block">Salin</button>
</div>
</div>	
</div>

<script>
// --- DOM Elements ---
const secretKeyInput = document.getElementById('secretKey');
const machineIdInput = document.getElementById('machineId');
const licenseTypeSelect = document.getElementById('licenseType');
const expiryDurationGroup = document.getElementById('expiryDurationGroup');
const addYearsInput = document.getElementById('addYears');
const addMonthsInput = document.getElementById('addMonths');
const addDaysInput = document.getElementById('addDays');
const addHoursInput = document.getElementById('addHours');
const generateBtn = document.getElementById('generateBtn');
const resultDiv = document.getElementById('result');
const keyOutputSpan = document.getElementById('keyOutput'); // NEW: Dedicated element for key text
const copyResultBtn = document.getElementById('copyResultBtn');
const pasteSecretKeyBtn = document.getElementById('pasteSecretKeyBtn');
const pasteMachineIdBtn = document.getElementById('pasteMachineIdBtn');

// --- UTILITY FUNCTIONS ---

// SHA-256 hashing using the browser's built-in Crypto API
async function sha256(message) {
const msgBuffer = new TextEncoder().encode(message);
const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
const hashArray = Array.from(new Uint8Array(hashBuffer));
return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
* Pastes text from the clipboard into a target input element.
*/
async function pasteFromClipboard(inputElement, buttonElement) {
const originalText = buttonElement.textContent;
try {
const text = await navigator.clipboard.readText();
if (text) {
inputElement.value = text.trim();
buttonElement.textContent = 'Tempel OK!';
saveInputs(); // Simpan input setelah menempel
} else {
buttonElement.textContent = 'Kosong!';
}
} catch (err) {
console.error('Gagal membaca konten clipboard: ', err);
buttonElement.textContent = 'Gagal!';
} finally {
setTimeout(() => {
buttonElement.textContent = originalText;
}, 1500);
}
}

// --- LOCAL STORAGE FUNCTIONS (Untuk menyimpan input terakhir) ---

function saveInputs() {
localStorage.setItem('gen_secretKey', secretKeyInput.value);
localStorage.setItem('gen_machineId', machineIdInput.value);
localStorage.setItem('gen_licenseType', licenseTypeSelect.value);
localStorage.setItem('gen_addYears', addYearsInput.value);
localStorage.setItem('gen_addMonths', addMonthsInput.value);
localStorage.setItem('gen_addDays', addDaysInput.value);
localStorage.setItem('gen_addHours', addHoursInput.value);
}

function loadInputs() {
secretKeyInput.value = localStorage.getItem('gen_secretKey') || 'your-super-secret-key-that-no-one-should-know';
machineIdInput.value = localStorage.getItem('gen_machineId') || '';
licenseTypeSelect.value = localStorage.getItem('gen_licenseType') || 'standard';
addYearsInput.value = localStorage.getItem('gen_addYears') || '1';
addMonthsInput.value = localStorage.getItem('gen_addMonths') || '0';
addDaysInput.value = localStorage.getItem('gen_addDays') || '0';
addHoursInput.value = localStorage.getItem('gen_addHours') || '0';
}

// --- MAIN LOGIC ---

async function generateKey() {
const secretKey = secretKeyInput.value;
const machineId = machineIdInput.value;
const licenseType = licenseTypeSelect.value.toUpperCase();

// Reset UI state
keyOutputSpan.textContent = '';
resultDiv.style.color = 'var(--text-secondary)';

if (!secretKey || !machineId) {
keyOutputSpan.textContent = "Kesalahan: Isi semua bidang Secret Key dan Machine ID.";
resultDiv.style.color = 'var(--accent-danger)';
return;
}

// 1. Generate a short random part (8 chars from UUID)
const keyUuidPart = uuid.v4().replace(/-/g, '').substring(0, 8).toUpperCase();

// 2. Determine expiry string
let expiryStr;
if (licenseType === 'LIFETIME') {
expiryStr = 'LIFETIME';
} else {
const addYears = parseInt(addYearsInput.value, 10) || 0;
const addMonths = parseInt(addMonthsInput.value, 10) || 0;
const addDays = parseInt(addDaysInput.value, 10) || 0;
const addHours = parseInt(addHoursInput.value, 10) || 0;

if (addYears < 0 || addMonths < 0 || addDays < 0 || addHours < 0) {
keyOutputSpan.textContent = "Kesalahan: Durasi harus nol atau positif.";
resultDiv.style.color = 'var(--accent-danger)';
return;
}

const expiryDate = new Date();
expiryDate.setFullYear(expiryDate.getFullYear() + addYears);
expiryDate.setMonth(expiryDate.getMonth() + addMonths);
expiryDate.setDate(expiryDate.getDate() + addDays);
expiryDate.setHours(expiryDate.getHours() + addHours);

// Format as YYYYMMDDHHMMSS (14 characters)
const year = String(expiryDate.getFullYear()).padStart(4, '0');
const month = String(expiryDate.getMonth() + 1).padStart(2, '0');
const day = String(expiryDate.getDate()).padStart(2, '0');
const hour = String(expiryDate.getHours()).padStart(2, '0');
const minute = String(expiryDate.getMinutes()).padStart(2, '0');
const second = String(expiryDate.getSeconds()).padStart(2, '0');

expiryStr = `${year}${month}${day}${hour}${minute}${second}`;
}

// 3. Calculate checksum (first 8 chars of SHA-256 hash)
const hashInput = `${keyUuidPart}${licenseType}${expiryStr}${machineId}${secretKey}`;
const fullHash = await sha256(hashInput);
const checksum = fullHash.substring(0, 8).toUpperCase();

// 4. Format the final key
const finalKey = `${keyUuidPart}-${expiryStr}-${checksum}`;

// Display result (HANYA MENGUBAH ISI SPAN)
keyOutputSpan.textContent = finalKey;
// Atur warna teks utama jika berhasil
keyOutputSpan.style.color = 'var(--text-primary)';
}

// Fungsi copy yang sudah diperbaiki
function copyResult() {
// AMBIL TEKS HANYA DARI keyOutputSpan
const key = keyOutputSpan.textContent.trim(); 

if (key && key !== 'Kunci yang Anda hasilkan akan muncul di sini...') {
navigator.clipboard.writeText(key).then(() => {
const originalText = copyResultBtn.textContent;
copyResultBtn.textContent = 'Tersalin!';
copyResultBtn.disabled = true;
setTimeout(() => {
copyResultBtn.textContent = originalText;
copyResultBtn.disabled = false;
}, 1500);
}).catch(err => {
console.error('Failed to copy text: ', err);
keyOutputSpan.textContent = "Gagal menyalin. Silakan salin teks secara manual.";
resultDiv.style.color = 'var(--accent-danger)';
});
}
}

// --- EVENT LISTENERS & INITIALIZATION ---

generateBtn.addEventListener('click', generateKey);
// Tombol Salin sekarang berfungsi karena mengambil teks dari span yang bersih
copyResultBtn.addEventListener('click', copyResult); 

// Hook up paste buttons
pasteSecretKeyBtn.addEventListener('click', () => {
pasteFromClipboard(secretKeyInput, pasteSecretKeyBtn);
});
pasteMachineIdBtn.addEventListener('click', () => {
pasteFromClipboard(machineIdInput, pasteMachineIdBtn);
});

// Hide/show date/time inputs based on license type and save input changes
licenseTypeSelect.addEventListener('change', () => {
expiryDurationGroup.style.display = licenseTypeSelect.value === 'lifetime' ? 'none' : 'block';
saveInputs();
});

// Save other inputs on change
[secretKeyInput, machineIdInput, addYearsInput, addMonthsInput, addDaysInput, addHoursInput].forEach(input => {
input.addEventListener('input', saveInputs);
});

// Load saved inputs on page load
loadInputs();
// Trigger change event on load to set initial UI state (hide/show duration)
licenseTypeSelect.dispatchEvent(new Event('change'));

</script>