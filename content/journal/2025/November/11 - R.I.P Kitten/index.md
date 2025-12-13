---
title: R.I.P Kitten
slug: R.I.P Kitten
date: 2025-11-11T06:00:02+07:00
weather: Hujan
location: Bogor, Indonesia
tags: []
draft: false
---

rest in peace...

<style>#form_hash{display:flex;flex-direction:column;gap:20px}#key{padding:15px;border:2px solid #e0e0e0;border-radius:8px;font-size:16px;width:100%;box-sizing:border-box;transition:border-color .3s,box-shadow .3s}#key:focus{border-color:#007bff;outline:0;box-shadow:0 0 0 3px rgba(0,123,255,.2)}input[type=submit]{background-color:#007bff;color:#fff;padding:15px;border:none;border-radius:8px;cursor:pointer;font-size:18px;font-weight:700;letter-spacing:1px;transition:background-color .3s,transform .1s;box-shadow:0 5px 15px rgba(0,123,255,.3)}input[type=submit]:hover{background-color:#0056b3}input[type=submit]:active{transform:scale(.98)}</style>
<div id=resultDecrypt><form id=form_hash><input autofocus id=key name=password placeholder="Masukan Kunci"> <input type=submit value=Buka></form></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<script>
function hashFormatDecrypt(t,e){return CryptoJS.PBKDF2(t,e,{keySize:8,iterations:1e3}).toString()}function decrypt(t,e){var r=e.substring(0,64),n=e.substring(64);return CryptoJS.HmacSHA256(n,CryptoJS.SHA256(t).toString()).toString()===r&&decryptMsg(n,t)}function decryptMsg(t,e){var r=CryptoJS.enc.Hex.parse(t.substr(0,32)),n=t.substring(32);return CryptoJS.AES.decrypt(n,e,{iv:r,padding:CryptoJS.pad.Pkcs7,mode:CryptoJS.mode.CBC}).toString(CryptoJS.enc.Utf8)}document.getElementById("form_hash").addEventListener("submit",function(t){t.preventDefault();var e,r=hashFormatDecrypt(document.getElementById("key").value,"5ce842e057ac37de3b211e39cd2f6aa0"),n=decrypt(r,"b56b2aefc48104bf8f5d5ecb7776ebe7cf8135bf9eaa5697419bc13792fd292258169dd859e7311ed3624277d2083f46U2FsdGVkX19VGA1yQmzxZpqak9UBABbrw5eWuyZW2FkhALjS5IJn3VxPbssNQhJuUpNzBeG9JIXWvtRasrSLvRU+EBycDl6NaqQAU7JQRPK3exE2pL31BKRnbPBFmkksAMDoRffIG5Bg/qxP9MHZNKFpHX1zUQ62BkfnY6PE/PiNfRIDcNG8JC1/QjL4sp0Oa6g8ATE7Om0cp86n/iqG3bMESGeIaBeoWmUPkqJjB10=");n?document.getElementById("resultDecrypt").innerHTML=n:alert("password salah!")});    
</script>
