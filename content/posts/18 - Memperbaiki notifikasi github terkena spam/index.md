---
title: Memperbaiki notifikasi github terkena spam
slug: notifikasi github kena spam
description: mendapat notifikasi spam pada akun github dan cara menghilangkannya, mudah dilakukan hanya membutuhkan akses api
date: 2025-10-10T00:14:31+07:00
categories: 
tags: []
draft: false
---

ada yang aneh dengan tampilan notifikasi akun github milik saya

terdapat indikator notifikasi, tetapi ketika dibuka tidak ada pesan apapun didalamnya

pada tampilan notifikasi, saya melihat ada yang tidak beres. yaitu terdapat repo yang tidak pernah dikunjungi

saya coba cari dimesin pencari dan benar saja, ternyata repo tersebut adalah spam

repo dibuat lalu melakukan mention terhadap user secara random kemudian reponya dihapus

ini membuat user yang dimention tidak bisa melihat pesan notifikasinya dan menjadi sangat terganggu

![spam notifikasi](spam-notifikasi.avif)

`...`

karena ini sangat mengganggu maka saya cari solusi untuk mengatasinya dan ketemu pada [tautan ini](https://github.com/orgs/community/discussions/174283#discussioncomment-14533335)

disini dijelaskan untuk menghapusnya yaitu menggunakan akses api notifikasi

berikut langkah-langkahnya

1. buat generate akses token (classic) di [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. setelah mendapatkan akses token, lanjut melakukan request ke api notifikasi github. berikut kodenya:

```
curl -H "Authorization: token AKSES_TOKEN_MU" https://api.github.com/notifications
```

3. ganti **AKSES_TOKEN_MU** dengan token yang dibuat sebelumnya
4. sekarang coba request menggunakan terminal (cmd)

![run cmd](run-cmd-1.avif)

5. ambil bagian id pada response notifikasi tersebut, lalu lakukan request penghapusan notifikasi dengan kode berikut:

```
curl -X DELETE -H "Authorization: token AKSES_TOKEN_MU" https://api.github.com/notifications/threads/ID_NOTIFIKASI
```

6. jangan lupa untuk mengganti **AKSES_TOKEN_MU** dan **ID_NOTIFIKASI**
7. sekarang coba refresh halaman notifikasi jika sudah hilang maka proses penghapusan notifikasi spam berhasil

berikut previewnya

![preview](preview.avifs)