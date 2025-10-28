---
title: License Generator
date: 2025-10-27T20:00:00+07:00
description: Alat Generate Lisensi
icon: "ri-key-fill"
---



<style>
:root {
--bg-primary: #0f0f23;
--bg-secondary: #20203c;
--bg-tertiary: #0f172a;
--text-primary: #ffffff;
--text-secondary: #94a3b8;
--text-muted: #64748b;
--accent-primary: #3b82f6;
--accent-danger: #d96d65;
--border-color: #334155;
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
--radius-md: 0.375rem;
--radius-lg: 0.5rem;
--transition-fast: 150ms ease-in-out;
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5);
}

.body {
font-family: var(--font-family);
margin: 0;
padding: 2rem 0;
background-color: var(--bg-primary);
color: var(--text-primary);
display: flex;
/* Mengatur perataan tengah horizontal dan vertikal */
justify-content: start;
align-items: start; 
}

.container-x {
width: 100%;
max-width: 600px; /* Batasan Lebar Maksimum */
background: var(--bg-secondary);
padding: 2rem;
border-radius: var(--radius-lg);
box-shadow: var(--shadow-lg);
}

.container-x h1 {
text-align: center;
color: var(--text-primary);
margin-bottom: 1.5rem;
}

.form-group {
margin-bottom: 1.5rem;
}

.container-x label {
display: block;
margin-bottom: 0.5rem;
font-weight: 600;
color: var(--text-secondary);
}

/* Styling for Input and Select */
input, select {
padding: 0.75rem;
border: 1px solid var(--border-color);
border-radius: var(--radius-md);
box-sizing: border-box;
background-color: var(--bg-tertiary);
color: var(--text-primary);
transition: border-color var(--transition-fast);
}
input:focus, select:focus {
outline: none;
border-color: var(--accent-primary);
}
select {
width: 100%;
}

/* Layout for input fields with a paste button */
.input-with-button {
display: flex;
gap: 10px;
align-items: center;
}
.input-with-button input {
flex-grow: 1;
width: auto; /* Override default input width */
}

.warning {
color: var(--accent-danger);
font-weight: bold;
}

.info {
font-size: 0.75rem;
color: var(--text-muted);
margin-top: 0.25rem;
}

button {
width: 100%;
padding: 0.75rem;
background-color: var(--accent-primary);
color: var(--text-primary);
border: none;
border-radius: var(--radius-md);
font-size: 1rem;
cursor: pointer;
transition: background-color var(--transition-fast), filter var(--transition-fast);
font-weight: 700;
}

button:hover {
filter: brightness(1.2);
}

/* Paste Button specific style */
.paste-btn {
width: auto;
padding: 0.75rem 1rem;
background-color: var(--border-color);
font-size: 0.9rem;
white-space: nowrap;
font-weight: 600;
}
.paste-btn:hover {
background-color: var(--text-muted);
filter: none;
}

/* Result Display */
#result {
margin-top: 1.5rem;
padding: 1.25rem;
background: var(--bg-tertiary);
border: 1px solid var(--border-color);
border-radius: var(--radius-md);
word-wrap: break-word;
font-family: var(--font-mono);
color: var(--text-secondary);
position: relative;
min-height: 3rem; /* Ensure minimum height */
display: flex; /* Untuk memastikan tombol 'Salin' tetap di sebelah teks jika di-hover */
align-items: center;
justify-content: space-between;
}

#keyOutput {
flex-grow: 1;
padding-right: 50px; /* Beri ruang agar teks tidak tertutup tombol */
word-break: break-all;
color: var(--text-primary); /* Mengubah warna agar lebih menonjol */
}

#copyResultBtn {
position: absolute;
top: 0.5rem;
right: 0.5rem;
width: auto;
padding: 0.25rem 0.75rem;
font-size: 0.8rem;
background-color: var(--border-color);
display: none;
}
#result:hover #copyResultBtn {
display: block;
}
</style>
<!-- Using a CDN for the UUID library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js"></script>



<div class="body">
<div class="container-x">

<!-- Input Group: SECRET_KEY (Dengan tombol Tempel) -->
<div class="form-group">
<label for="secretKey" class="warning">SECRET_KEY (Jaga kerahasiaannya!)</label>
<div class="input-with-button">
<input type="text" id="secretKey" value="your-super-secret-key-that-no-one-should-know">
<button id="pasteSecretKeyBtn" class="paste-btn">Tempel</button>
</div>
</div>

<!-- Input Group: Machine ID (Dengan tombol Tempel) -->
<div class="form-group">
<label for="machineId">Machine ID</label>
<div class="input-with-button">
<input type="text" id="machineId" placeholder="Tempel Machine ID target">
<button id="pasteMachineIdBtn" class="paste-btn">Tempel</button>
</div>
<p class="info">ID ini harus didapatkan dari mesin target (hasil hash).</p>
</div>

<!-- License Type Selection -->
<div class="form-group">
<label for="licenseType">Jenis Lisensi</label>
<select id="licenseType">
<option value="standard">Standard</option>
<option value="lifetime">Lifetime</option>
</select>
</div>

<!-- Expiry Duration Group (Dynamic Display) -->
<div class="form-group" id="expiryDurationGroup">
<label>Durasi Lisensi (dari sekarang)</label>
<div style="display: flex; gap: 10px;">
<div style="flex: 1;">
<label for="addYears" class="info">Tahun</label>
<input type="number" id="addYears" value="1" min="0" style="width: 100%;">
</div>
<div style="flex: 1;">
<label for="addMonths" class="info">Bulan</label>
<input type="number" id="addMonths" value="0" min="0" style="width: 100%;">
</div>
<div style="flex: 1;">
<label for="addDays" class="info">Hari</label>
<input type="number" id="addDays" value="0" min="0" style="width: 100%;">
</div>
<div style="flex: 1;">
<label for="addHours" class="info">Jam</label>
<input type="number" id="addHours" value="0" min="0" style="width: 100%;">
</div>
</div>
</div>

<!-- Generate Button -->
<button id="generateBtn">Generate Key</button>

<!-- Result Display -->
<div id="result">
<!-- Key output is now in a dedicated span -->
<span id="keyOutput">Kunci yang Anda hasilkan akan muncul di sini...</span>
<button id="copyResultBtn">Salin</button>
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