---
title: DLP Downloader
slug: DLP Downloader
description: unduh video dari platform social media dengan mudah
image: "dlp-downloader.avif"
stack: ['python', 'yt-dlp', 'pyside6', 'qtawesome']
category: Desktop
status: Personal
# demo: https://youtu.be/Vg8MTB6wFoE
download: https://lynk.id/irfanykywz/v8xz90wg8kj5
# buy: https:google.com/ncr
# github: https://github.com/ykywz-python/
date: 2025-10-18T05:00:35+07:00
draft: false
# =============================
overview:
    - alat pengunduh video dari berbagai macam platform sosial media dengan mudah
# =============================
feature:
    - name: "Pengunduhan Fleksibel"
      icon: 'ri-file-text-line'
      description: "bisa download satuan atau sekaligus"
    - name: "Pengaturan yang fleksibel"
      icon: 'ri-file-text-line'
      description: "kustomisasi pengaturan yang ada dengan mudah"
    - name: "Auto Update"
      icon: 'ri-file-text-line'
      description: "bila sewaktu waktu aplikasi membutuhkan update"
galery:
    - name: "Tampilan Halaman Single"
      description: "paste link dan mendownload video langsung"
      image: "dlp-downloader-1.avif"             
    - name: "Tampilan Halaman Batch"
      description: "melakukan download secara masal dengan mudah"
      image: "dlp-downloader-2.avif"             
    - name: "Tampilan Dialog About"
      description: "tampilan about yang terdapat tombol donasi"
      image: "dlp-downloader-3.avif"             
    - name: "Tampilan Pengaturan General"
      description: "mengatur jumlah worker yang bisa dijalankan secara bersamaan, mengatur hasil output folder, mengatur auto update"
      image: "dlp-downloader-4.avif"             
    - name: "Tampilan Pengaturan yt-dlp"
      description: "mengatur penggunaan yt-dlp mulai dari pemilihan kualitas video, cookies, format output, dan path yt-dlp"
      image: "dlp-downloader-5.avif"             
    - name: "Tampilan Pengaturan FFMPEG"
      description: "bisa mengatur path ffmpeg secara manual"
      image: "dlp-downloader-6.avif"             
    - name: "Tampilan light mode"
      description: "tampilan lightmode dihalaman batch dengan link terisi "
      image: "dlp-downloader-7.avif"             

changelog:
  - version: "1.0.3"
    date: "23 Oktober 2025"
    changes:  
      - tag: "Pembaruan"
        description: "menghilangkan args untuk memperbaiki error 403, yt-dlp sudah update"
      - tag: "Pembaruan"
        description: "menambahkan binary deno untuk yt-dlp kedepannya, yt-dlp update pakai nightly build"        
  - version: "1.0.2"
    date: "22 Oktober 2025"
    changes:
      - tag: "Perbaikan"
        description: "memperbaiki qlabel textnya kepanjangan dengan wordwrap pada halaman single download"
      - tag: "Perbaikan"
        description: "yt-dlp yang error dengan ditambahkan args, tapi fungsi kualitas jadi tidak berfungsi hanya bisa 1080p"
      - tag: "Pembaruan"
        description: "menampilkan download speed dan size untuk update aplikasi dan download"
      - tag: "Pembaruan"
        description: "menghilangkan tombol browser, sekarang menu halaman dipindah kesebelah kanan"
      - tag: "Pembaruan"
        description: "menambahkan opsi pada halaman single, format output dan kualitas"        
  - version: "1.0.1"
    date: "20 Oktober 2025"
    changes:
      - tag: "Perbaikan"
        description: "memperbaiki thumbnail yang tidak muncul pada video"
      - tag: "Perbaikan"
        description: "memperbaiki tray icon, variable versi"          
      - tag: "Pembaruan"
        description: "memperbarui logika ganti tema, kodenya jadi lebih sederhana"
      - tag: "Perbaikan"
        description: "memperbaiki nilai pengaturan yang salah soal boolean, true false. ganti jadi angka 1 dan 0"
      - tag: "Fitur Baru"
        description: "menambahkan opsi untuk menyembunyikan window saat klik tombol keluar aplikasi"        
  - version: "1.0.0"
    date: "19 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "rilis project"
---                  