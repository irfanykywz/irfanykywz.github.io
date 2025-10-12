---
title: Belajar Nuitka
slug: belajar nuitka
date: 2025-06-28T19:35:43+07:00
weather: Hujan
location: Bogor, Indonesia
tags: []
draft: false
---

hari ini bangun pagi tiba-tiba buka nuitka untuk dipelajari

langsung saja saya coba dan ternyata sangat lama sekali mencompilenya

berbeda dengan pyinstaller yang bisa lebih cepat

sepertinya ini terjadi karena nuitka dan pyinstaller berbeda cara mencompilenya

nuitka mencompile kode python menjadi c++, sedangkan pyinstaller tidak

namun kelebihan nuitka yaitu tidak mudah didecompile, karena kode yang dicompile nuitka sudah menjadi kode c++

inilah alasan saya mencoba mempelajari compiler nuitka ini yaitu agar tidak mudah didecompile

namun untuk mendapatkan hal tersebut butuh waktu lama untuk membuildnya, saya sudah coba langsung membuild pyside6 + pyppteer dengan nuitka dan hasilnya hanya 20megabyte saja !

selain itu nuitka juga ada fitur onefile yang dimana bisa mencache file temporarynya + bisa dicustom agar tidak perlu mengekstraknya berkali-kali ketika menjalan program

hal lain yang saya suka yaitu eksekusi lebih cepat

berikut previewnya
![preview compile nuitka](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnxXUH7n8w1KEk4OvRFU9sKw41qm5a_8zzas-ZDR0DYK_bEfV835iSWb9_MjiOy2OnRKwIH8Mdfarss1DitTvYV_-jNHThjYEykzL9f3jIVsRgmLCmzc0lr_MJ2SNPcMsES9ozgrINx6GJ8aSvM5XS89o17FOYUQdlbFliM8S1AXUX9X5CUd-nZaNMziU/s1600/Screenshot_2.png)

`***`

untuk reponya bisa dicek disini

[https://github.com/ykywz-python](https://github.com/ykywz-python)