---
title: "Panduan Markdown"
slug: markdown
date: 2025-10-20T10:00:00+07:00
description: "Contoh dan panduan lengkap penggunaan sintaks Markdown untuk dokumentasi."
---

# Panduan Lengkap Markdown

Selamat datang di panduan Markdown. Dokumen ini adalah contoh bagaimana Anda bisa menggunakan sintaks Markdown untuk membuat konten yang terstruktur dan mudah dibaca.

## 1. Teks Dasar

Anda bisa membuat teks menjadi **tebal**, _miring_, atau ~~dicoret~~.

```markdown
Ini adalah paragraf biasa.

**Teks tebal** (menggunakan dua tanda bintang).
__Teks tebal__ (menggunakan dua garis bawah).

*Teks miring* (menggunakan satu tanda bintang).
_Teks miring_ (menggunakan satu garis bawah).

~~Teks yang dicoret~~.
```

## 2. Judul (Headings)

Gunakan tanda pagar (`#`) untuk membuat judul. Jumlah tanda pagar menentukan level judul.

```markdown
# Judul Level 1
## Judul Level 2
### Judul Level 3
#### Judul Level 4
```

### Contoh Judul Level 3

Ini adalah konten di bawah judul level 3.

#### Contoh Judul Level 4

Ini adalah konten di bawah judul level 4.

## 3. Daftar (Lists)

Anda bisa membuat daftar berurutan (ordered) dan tidak berurutan (unordered).

### Daftar Tidak Berurutan

Gunakan tanda bintang (`*`), tambah (`+`), atau kurang (`-`).

*   Item pertama
*   Item kedua
    *   Sub-item
    *   Sub-item lainnya

### Daftar Berurutan

Gunakan angka diikuti dengan titik.

1.  Langkah pertama
2.  Langkah kedua
3.  Langkah ketiga

## 4. Kutipan (Blockquotes)

Gunakan tanda lebih besar dari (`>`) untuk membuat blok kutipan.

> Ini adalah sebuah kutipan. Anda bisa menulis beberapa baris di dalamnya, dan ini akan tetap menjadi bagian dari kutipan yang sama.
>
> > Kutipan juga bisa bersarang.

## 5. Blok Kode (Code Blocks)

Gunakan tiga backtick (`` ` ``) untuk membuat blok kode. Anda bisa menambahkan nama bahasa untuk penyorotan sintaks.

```javascript
function sapa(nama) {
  console.log(`Halo, ${nama}! Selamat datang di dokumentasi.`);
}

sapa("Pengguna");
```

Anda juga bisa menggunakan `kode sebaris` dengan satu backtick.

## 6. Tabel (Tables)

Buat tabel menggunakan pipa (`|`) dan tanda hubung (`-`).

| Header 1      | Header 2 (Tengah) | Header 3 (Kanan) |
|---------------|:-----------------:|-----------------:|
| Konten        | Konten tengah     |          $1600   |
| Baris baru    | Contoh lain       |             $12  |

## 7. Tautan dan Gambar

### Tautan (Links)

Kunjungi Google

### Gambar (Images)

Sintaksnya mirip dengan tautan, tetapi dengan tanda seru (`!`) di depannya.

!Logo Hugo

---

Itulah dasar-dasar Markdown! Anda bisa mengkombinasikan semua elemen ini untuk membuat dokumentasi yang kaya dan informatif.