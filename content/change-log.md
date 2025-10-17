---
# Front Matter (YAML)
title: "Catatan Perubahan"
description: Riwayat perubahan pada situs web. fitur baru, perbaikan bug, dan peningkatan di setiap versi.
date: 2025-10-09T00:00:00+08:00

changelog:
  - version: "1.1.2"
    date: "17 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambahkan halaman profile test, halaman yang berisi hasil tes kepribadian minat dan bakat"
      - tag: "Fitur Baru"
        description: "menambahkan tombol donate paypal.me, dan email paypal pada halaman donate"
      - tag: "Fitur Baru"
        description: "menambahkan jenis tombol pada styling css, menambahkan styling pada scroll"
      - tag: "Pembaruan"
        description: "menambahkan view count dihalaman project"
      - tag: "Perbaikan"
        description: "perbaikan js view count sekarang jsnya dipisah soalnya kalau ditaruh sama partialnya bakal ngeloop kalau ditaruh di list page"        
  - version: "1.1.1"
    date: "15 Oktober 2025"
    changes:
      - tag: "Pembaruan"
        description: "kategori halaman kutipan sekarang dirender pakai kode hugo bukan javascript"
      - tag: "Pembaruan"
        description: "menambahkan fitur mansonry pada card halaman kutipan"
      - tag: "Fitur Baru"
        description: "menambahkan halaman bank prompt, untuk menaruh prompt-prompt ai siap pakai"    
      - tag: "Pembaruan"
        description: "halaman kutipan dan project kategorinya tersimpan diurl agar saat diload tidak kembali keawal"   
      - tag: "Pembaruan"
        description: "halaman- yang memiliki javascript sekarang ditaruh dibagian bawah menggunakan define footer"                     
  - version: "1.1.0"
    date: "13 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambahkan border warna warni pada foto profile halaman beranda"  
      - tag: "Perbaikan"
        description: "perbaikan responsive, halaman kontak dan belajar"
  - version: "1.0.9"
    date: "12 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambahkan menu navigasi bawah, membuat menu lainnya mudah diklik"  
      - tag: "Pembaruan"
        description: "mengubah fontawesome menjadi remixicon"          
  - version: "1.0.8"
    date: "11 Oktober 2025"
    changes:
      - tag: "Pembaruan"
        description: "memperbarui menu pada halaman belajar, sekarang bisa menambahkan section kedalam menu"  
      - tag: "Pembaruan"
        description: "memperbarui deskripsi halaman: riset, game, kumpulan kata, belajar, artikel"    
      - tag: "Fitur Baru"
        description: "menambah fitur lightbox menggunakan library glightbox. untuk melihat gambar secara penuh. diterapkan pada halaman project, dan riset"
      - tag: "Pembaruan"
        description: "menghapus script lightbox pada halaman project yang sudah tidak digunakan"  
      - tag: "Pembaruan"
        description: "menambahkan gambar ilustrasi pada halaman donasi"
      - tag: "Fitur Baru"
        description: "menambah halaman film"                   

  - version: "1.0.7"
    date: "09 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah fitur: jumlah halaman dihilat, reaction postingan clap, wow, hmm referensi velixs"
      - tag: "Fitur Baru"
        description: "menambah halaman: changelog, privacy, tos"        
      - tag: "Peningkatan"
        description: "mengubah tampilan menu footer, semua menu dijadikan satu didalam offcanvas"
      - tag: "Peningkatan"
        description: "memindahkan tombol switch darkmode ketengah footer"
      - tag: "Pembaruan"
        description: "memperbarui icon pada halaman project"
      - tag: "Pembaruan"
        description: "memeprbarui format robots.txt, meta tag seo"        

  - version: "1.0.6"
    date: "08 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah halaman: file manager"
      - tag: "Fitur Baru"
        description: "menyediakan form kontak untuk mengirim pesan"        

  - version: "1.0.5"
    date: "07 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah halaman: tools, quote"

  - version: "1.0.4"
    date: "06 Oktober 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah halaman donasi"
      - tag: "Peningkatan"
        description: "membuat style body menjadi full height" 
      - tag: "Peningkatan"
        description: "memperbaiki halaman homepage, memperbarui section: education, skills, experince" 

  - version: "1.0.3"
    date: "25 September 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah halaman baru: book-lesson, game-journey"
      - tag: "Pembaruan"
        description: "menghilangkan halaman collection, favorite"
      - tag: "Peningkatan"
        description: "setiap halaman memiliki file cssnya masing-masing untuk mempermudah pengembangan" 
      - tag: "Peningkatan"
        description: "mengubah semua kata bahasa inggris kebahasa indonesia"

  - version: "1.0.2"
    date: "13 Juli 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah halaman baru: search, categories"
      - tag: "Pembaruan"
        description: "peningkatan halaman research"  
      - tag: "Peningkatan"
        description: "mengubah gambar menggunakan format .avif untuk ukuran yang lebih kecil"          
      - tag: "Perbaikan"
        description: "peningkatan tombol darkmode"                

  - version: "1.0.1"
    date: "11 Juli 2025"
    changes:
      - tag: "Fitur Baru"
        description: "menambah halaman baru: collection, research"

  - version: "1.0.0"
    date: "Juni 2025"
    changes:
      - tag: "Fitur Baru"
        description: "Rilis Awal Website Portofolio Menggunakan Hugo. Menyediakan fitur dasar: halaman beranda, project, post, dan kontak."
---