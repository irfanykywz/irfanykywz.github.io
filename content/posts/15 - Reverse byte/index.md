---
title: Reverse engineering web-ikepri, mengunduh melalui bytes
slug: Reverse engineering web-ikepri, mengunduh melalui bytes
date: 2025-07-02T19:26:35+07:00
draft: false
categories: Reverse
tags: ['bytes']
---

tidak sengaja ketika saya sedang mencari sebuah buku, saya menemukan website yang menyediakan bukunya

masuklah saya kedalam webnya, dan karena ini adalah website perpustakaan online. maka saya harus mendaftar agar bisa masuk kedalamnya.

setelah berhasil mendaftar langsung saja memesan bukunya dan ternyata bisa langsung dibaca

setelah terbaca halaman pertama, seketika terlintas dikepala. bagaimana cara mengunduhnya ?

saya ingin menyimpannya secara offline agar bisa diakses tanpa jaringan internet

reverse engineeringpun dimulai....

`***`

Dimulai dari memantau lalulintas jaringan yang mengarah keresource ebook

saya bisa menemukan dari mana sumber ebooknya dimuat, sayapun mencoba untuk mengunduhnya

setelah selesai mengunduh saya merasakan kejanggalan yaitu, file tersebut tidak memiliki format yang valid sebagai sebuah ebook

`***`

sayapun mulai mencaritahu bagamana ini dilakukan, setelah sekian lama mengutak atik lalulintas jaringan akhirnya masalah terpecahkan

file yang diunduh merupakan file yang telah diberi password dan didalamnya terdapat pdf yang sebenarnya

tanpa berpikir panjang sayapun langsung mencari passwordnya agar bisa membuka filenya

namun disini tantangan baru dimulai, password yang saya coba cari-cari ternyata berpusat disatu tempat dan itu tidak bisa dibaca 

password tersebut dienkripsi menggunakan wasm dengan bahasa perograman golang

dan ketika saya membacanya, saya tidak mengerti sama sekali 

`***`

sempat ingin menyerah dan berhenti melakukan pencarian, sayapun mencoba untuk mendebug lalulintas ebook tersebut dimuat

mulai dari memberi checkpoint dan membaca kode javascript yang berkaitan pada lalulintas ebooknya

sayapun menemukan sebuah celah dan disana ternyata bisa melihat bytes file pdf yang sudah diekstrak tanpa password beserta password pdfnya sekaligus

tanpa panjang lebar, sayapun langsung mencoba mengunduh data bytes yang sizenya berbeda dari yang lain. dan ternyata benar itu adalah file pdfnya

saya buka pdf tersebut ternyata ada password lagi, saya masukan password yang saya dapatkan bersamaan dengan byte pdfnya. dan ternyata bisa dibuka


`***`

perjuanganpun tidak sia-sia, akhirnya saya bisa mengunduh ebook yang isinya tidak bisa dibaca sehari

sekian, sampai bertemu dipost selanjutnya