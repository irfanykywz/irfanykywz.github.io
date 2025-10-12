---
title: "Enkripsi Konten"
date: 2025-10-07T00:00:00+07:00
description: "Alat sederhana untuk mengenkripsi konten dan hanya bisa dilihat dengan kunci yang benar"
icon: "ri-key-fill"
---

<style>
/* Tool-specific styling (uses theme variables from main.css) */
#form_hash{
    max-width:900px;
    margin:1rem 0;
    display:flex;
    flex-direction:column;
    gap:1rem;
    padding:1rem;
    border-radius:8px;
    border:1px solid var(--border-color);
    background:var(--bg-secondary);
    box-shadow:var(--shadow-sm);
}

#form_hash label{
    display:block;
    color:var(--text-secondary);
    font-weight:600;
    margin-bottom:0.25rem;
}

#form_hash input[type="text"],
#form_hash textarea,
#resultEncrypt{
    width:100%;
    padding:0.65rem 0.75rem;
    border-radius:6px;
    border:1px solid var(--border-color);
    background:var(--bg-primary);
    color:var(--text-primary);
    font-family:var(--font-family);
    box-shadow:none;
}

#form_hash textarea{min-height:160px;resize:vertical}

#form_hash button[type="submit"]{
    display:inline-block;
    padding:0.5rem 1rem;
    border-radius:8px;
    background:var(--accent-primary);
    color:var(--text-primary);
    color:#fff;
    border:none;
    cursor:pointer;
    font-weight:700;
    box-shadow:var(--shadow-sm);
}

#form_hash button[type="submit"]:hover{opacity:0.95;transform:translateY(-1px)}

#resultEncrypt{min-height:160px;margin-top:1rem;white-space:pre-wrap;word-break:break-word}

/* Slight spacing for form groups */
#form_hash > div{display:flex;flex-direction:column;gap:0.5rem}

/* Make inline code-looking areas readable in result */
#resultEncrypt{font-family:var(--font-mono);font-size:0.95rem}

/* Small responsive tweak */
@media (max-width:640px){
    #form_hash{padding:0.75rem}
    #form_hash button[type="submit"]{width:100%}
}
</style>

<style>
/* Styles for result container and copy controls */
#resultEncrypt{flex:1;min-height:160px;max-width:100%;}

.result-row{display:block;gap:0.5rem;align-items:flex-start}
.result-controls{display:flex;flex-direction:column;gap:0.5rem}
.copy-status{font-size:0.85rem;color:var(--text-secondary);display:block;padding-top:0.25rem;min-height:1.2em}

#copyResult{
    padding:0.45rem 0.6rem;
    border-radius:6px;
    background:var(--accent-secondary, #333);
    color:var(--text-on-accent, #fff);
    border:1px solid rgba(0,0,0,0.06);
    cursor:pointer;
    font-weight:600;
}

#copyResult:hover{opacity:0.95;transform:translateY(-1px)}

/* make the result area and controls stack on small screens */
@media (max-width:640px){
    #resultEncrypt{min-height:140px}
    #copyResult{width:100%}
    #copyResult:hover{transform:none}
    .result-row{flex-direction:column}
}
</style>

<form id="form_hash">

<div>
        <label for="secret key">Kunci Rahasia</label>
        <input type="text" id="key" placeholder="Masukkan kunci rahasia">
</div>

<div>
        <label for="content">Konten yang Dilindungi</label>
        <textarea id="content" placeholder="<p>masukkan konten HTML di sini</p>" rows="5"></textarea>
</div>

<button type="submit">Buat Snippet</button>

</form>

<div class="result-row">
    <textarea readonly onclick="this.select()" rows="8" id="resultEncrypt" aria-label="Hasil Enkripsi"></textarea>
    <div class="result-controls">
        <button id="copyResult" type="button">Salin</button>
        <span id="copyStatus" class="copy-status"></span>
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

        let content = document.getElementById('content').value,
        key = document.getElementById('key').value;

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
<div id=resultDecrypt><form id=form_hash><input autofocus id=key name=password placeholder=Key> <input type=submit value=Unlock></form></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></scr${'i'}pt>
<script>
function hashFormatDecrypt(t,e){return CryptoJS.PBKDF2(t,e,{keySize:8,iterations:1e3}).toString()}function decrypt(t,e){var r=e.substring(0,64),n=e.substring(64);return CryptoJS.HmacSHA256(n,CryptoJS.SHA256(t).toString()).toString()===r&&decryptMsg(n,t)}function decryptMsg(t,e){var r=CryptoJS.enc.Hex.parse(t.substr(0,32)),n=t.substring(32);return CryptoJS.AES.decrypt(n,e,{iv:r,padding:CryptoJS.pad.Pkcs7,mode:CryptoJS.mode.CBC}).toString(CryptoJS.enc.Utf8)}document.getElementById("form_hash").addEventListener("submit",function(t){t.preventDefault();var e,r=hashFormatDecrypt(document.getElementById("key").value,"${salt}"),n=decrypt(r,"${encryptedMsg}");n?document.getElementById("resultDecrypt").innerHTML=n:alert("wrong Key !")});    
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