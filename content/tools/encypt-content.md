---
title: "Enkripsi Konten"
date: 2025-10-07T00:00:00+07:00
description: "Alat sederhana untuk mengenkripsi konten dan hanya bisa dilihat dengan kunci yang benar"
icon: "icon-[ri--key-fill]"
---

<!-- Marked.js for Markdown conversion -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<form id="form_hash" class="max-w-3xl mx-auto flex flex-col gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm my-8">

<div class="flex flex-col gap-2">
        <label for="secret key" class="block font-semibold text-gray-600 dark:text-gray-400">Kunci Rahasia</label>
        <input type="text" id="key" placeholder="Masukkan kunci rahasia" class="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors">
</div>

<div class="flex items-center gap-4">
    <span class="font-semibold text-gray-600 dark:text-gray-400">Mode Input:</span>
    <div class="flex items-center gap-2">
        <input type="radio" id="modeHtml" name="inputMode" value="html" checked class="text-indigo-600 focus:ring-indigo-500">
        <label for="modeHtml" class="text-gray-700 dark:text-gray-300 cursor-pointer">HTML</label>
    </div>
    <div class="flex items-center gap-2">
        <input type="radio" id="modeMarkdown" name="inputMode" value="markdown" class="text-indigo-600 focus:ring-indigo-500">
        <label for="modeMarkdown" class="text-gray-700 dark:text-gray-300 cursor-pointer">Markdown</label>
    </div>
</div>

<div class="flex flex-col gap-2">
        <label for="content" class="block font-semibold text-gray-600 dark:text-gray-400">Konten yang Dilindungi</label>
        <textarea id="content" placeholder="<p>masukkan konten HTML di sini</p>" rows="5" class="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors min-h-[160px] resize-y"></textarea>
</div>

<button type="submit" class="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95">Buat Snippet</button>

</form>

<div class="max-w-3xl mx-auto flex flex-col gap-4">
    <textarea readonly onclick="this.select()" rows="8" id="resultEncrypt" aria-label="Hasil Enkripsi" class="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm min-h-[160px] resize-y focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"></textarea>
    <div class="flex flex-col gap-2 items-start">
        <button id="copyResult" type="button" class="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-sm active:scale-95">Salin</button>
        <span id="copyStatus" class="text-sm text-gray-500 dark:text-gray-400 min-h-[1.2em]"></span>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<script>

    /**
     * Credit
     * https://github.com/robinmoisson/staticrypt
     */ 
    function hashFormatEncrypt(key) {
        var salt = CryptoJS.lib.WordArray.random(128 / 8).toString();

        var hashKey = CryptoJS.PBKDF2(key, salt, {
            keySize: 256 / 32,
            iterations: 1000
        });

        return {
            salt: salt,
            hashKey: hashKey.toString(),
        };
    }    

    function encrypt(msg, key) {
        var iv = CryptoJS.lib.WordArray.random(128 / 8);

        var encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return iv.toString() + encrypted.toString();
    }      

    document.getElementById('form_hash').addEventListener('submit', function (e) {

        e.preventDefault();

        let content = document.getElementById('content').value;
        const key = document.getElementById('key').value;

        // Check for Markdown mode
        const mode = document.querySelector('input[name="inputMode"]:checked').value;
        if (mode === 'markdown' && typeof marked !== 'undefined') {
            content = marked.parse(content);
        }

        var goHash = hashFormatEncrypt(key),
        hashKey = goHash.hashKey,
        salt = goHash.salt;

        var encrypted = encrypt(content, hashKey),
        hmac = CryptoJS.HmacSHA256(encrypted, CryptoJS.SHA256(hashKey).toString()).toString(),
        encryptedMsg = hmac + encrypted;        

        // console.info(hmac);
        // console.info(encryptedMsg);
        // console.info(salt);        

// generate html (form unlock)
var formUnlock = `<style>#form_hash{display:flex;flex-direction:column;gap:20px}#key{padding:15px;border:2px solid #e0e0e0;border-radius:8px;font-size:16px;width:100%;box-sizing:border-box;transition:border-color .3s,box-shadow .3s}#key:focus{border-color:#007bff;outline:0;box-shadow:0 0 0 3px rgba(0,123,255,.2)}input[type=submit]{background-color:#007bff;color:#fff;padding:15px;border:none;border-radius:8px;cursor:pointer;font-size:18px;font-weight:700;letter-spacing:1px;transition:background-color .3s,transform .1s;box-shadow:0 5px 15px rgba(0,123,255,.3)}input[type=submit]:hover{background-color:#0056b3}input[type=submit]:active{transform:scale(.98)}</style>
<div id=resultDecrypt><form id=form_hash><input autofocus id=key name=password placeholder="Masukan Kunci"> <input type=submit value=Buka></form></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></scr${'i'}pt>
<script>
function hashFormatDecrypt(t,e){return CryptoJS.PBKDF2(t,e,{keySize:8,iterations:1e3}).toString()}function decrypt(t,e){var r=e.substring(0,64),n=e.substring(64);return CryptoJS.HmacSHA256(n,CryptoJS.SHA256(t).toString()).toString()===r&&decryptMsg(n,t)}function decryptMsg(t,e){var r=CryptoJS.enc.Hex.parse(t.substr(0,32)),n=t.substring(32);return CryptoJS.AES.decrypt(n,e,{iv:r,padding:CryptoJS.pad.Pkcs7,mode:CryptoJS.mode.CBC}).toString(CryptoJS.enc.Utf8)}document.getElementById("form_hash").addEventListener("submit",function(t){t.preventDefault();var e,r=hashFormatDecrypt(document.getElementById("key").value,"${salt}"),n=decrypt(r,"${encryptedMsg}");n?document.getElementById("resultDecrypt").innerHTML=n:alert("password salah!")});    
</scr${'i'}pt>
`;
document.getElementById('resultEncrypt').textContent = formUnlock;       
// reset copy status
var copyStatus = document.getElementById('copyStatus');
if(copyStatus) copyStatus.textContent = '';
    });
</script>

<script>
// copy button handler
document.getElementById('copyResult').addEventListener('click', function (){
    var txt = document.getElementById('resultEncrypt');
    var status = document.getElementById('copyStatus');
    if (!txt) return;
    try{
        txt.select();
        var successful = document.execCommand('copy');
        if(successful){
            if(status) status.textContent = 'Tersalin ke clipboard';
        }else{
            if(status) status.textContent = 'Gagal menyalin';
        }
    }catch(err){
        // Fallback: modern async clipboard API
        if(navigator.clipboard){
            navigator.clipboard.writeText(txt.value).then(function(){
                if(status) status.textContent = 'Tersalin ke clipboard';
            }, function(){
                if(status) status.textContent = 'Gagal menyalin';
            });
        }else{
            if(status) status.textContent = 'Gagal menyalin';
        }
    }
    // clear status after 3s
    if(status){
        setTimeout(function(){status.textContent='';},3000);
    }
});
</script>