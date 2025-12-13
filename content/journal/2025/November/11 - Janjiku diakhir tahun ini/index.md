---
title: Janjiku diakhir tahun ini
slug: Janjiku diakhir tahun ini
date: 2025-11-11T20:00:02+07:00
weather: Hujan
location: Bogor, Indonesia
tags: []
draft: false
---

my promise end of this year

<style>#form_hash{display:flex;flex-direction:column;gap:20px}#key{padding:15px;border:2px solid #e0e0e0;border-radius:8px;font-size:16px;width:100%;box-sizing:border-box;transition:border-color .3s,box-shadow .3s}#key:focus{border-color:#007bff;outline:0;box-shadow:0 0 0 3px rgba(0,123,255,.2)}input[type=submit]{background-color:#007bff;color:#fff;padding:15px;border:none;border-radius:8px;cursor:pointer;font-size:18px;font-weight:700;letter-spacing:1px;transition:background-color .3s,transform .1s;box-shadow:0 5px 15px rgba(0,123,255,.3)}input[type=submit]:hover{background-color:#0056b3}input[type=submit]:active{transform:scale(.98)}</style>
<div id=resultDecrypt><form id=form_hash><input autofocus id=key name=password placeholder="Masukan Kunci"> <input type=submit value=Buka></form></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<script>
function hashFormatDecrypt(t,e){return CryptoJS.PBKDF2(t,e,{keySize:8,iterations:1e3}).toString()}function decrypt(t,e){var r=e.substring(0,64),n=e.substring(64);return CryptoJS.HmacSHA256(n,CryptoJS.SHA256(t).toString()).toString()===r&&decryptMsg(n,t)}function decryptMsg(t,e){var r=CryptoJS.enc.Hex.parse(t.substr(0,32)),n=t.substring(32);return CryptoJS.AES.decrypt(n,e,{iv:r,padding:CryptoJS.pad.Pkcs7,mode:CryptoJS.mode.CBC}).toString(CryptoJS.enc.Utf8)}document.getElementById("form_hash").addEventListener("submit",function(t){t.preventDefault();var e,r=hashFormatDecrypt(document.getElementById("key").value,"ca260f73cc2baf729a356e5d3eae5970"),n=decrypt(r,"2151ce74974de5fdc78720261c7f5b522f691a818b0751f6910b4baaa246ff5d4a8821382af689c88f583af7440ca059U2FsdGVkX1/VIH8puybKdLmxTtTphi7XM9cRnFF69cq63aZr4cI5mgfqeCOr75a0AyUDkPSHJJfXv8XmleYaSb7q9QWeYKOJpgMhE1KcMaEOwDq4U4SRzBOmERusNxAWQWdB/9wVtNHhkyAO6oTirLHn3MQtfYtWxdUNQQG3lBwcxGr4lbDaqJU3SaodVCi5a78/mF1lUqvtMYJBtpWiugjP23NMqPLJ1Vd5E0J1mQ9tIyp71QsjgIXvAGJzSbliDVmd72NXwkW+nF44TlxNmTK6AJq8XXBKrO/orLiKROtnU/aSyMfqR1NXpsK34ZZJ2CZVoEhVa47b7uuI5olYzc1NCZmdT2uB9w5iH+Q1YZFqIbHmFIbH14JZC2nvDkHZlyZ/YjkIUUS7NnGDK56MouE9CY69mFDWcWBVkSUlQqQ9nRaEclbuV04+vvIb7Vl53uvlGpa9hkEcjWsfuvQqyQ==");n?document.getElementById("resultDecrypt").innerHTML=n:alert("password salah!")});    
</script>
