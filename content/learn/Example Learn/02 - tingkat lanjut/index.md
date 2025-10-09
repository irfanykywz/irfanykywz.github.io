---
title: Templating dan Shortcodes Tingkat Lanjut
slug: tingkat-lanjut
description: Mempelajari fungsi Go Templates, Shortcodes kustom, dan Partial Templates untuk membangun komponen yang dapat digunakan kembali.
section: Tingkat Lanjut
image: advanced-template.avif
date: 2025-06-01T16:00:35+07:00
weight: 2
draft: false
---

# Hugo Power-User: Membangun Komponen Kustom

Setelah Anda menguasai struktur dasar, saatnya memanfaatkan kekuatan sejati Hugo: **Go Templating**. Modul ini akan mengajarkan cara membuat bagian-bagian situs yang dinamis dan dapat digunakan kembali (*reusable components*), sehingga proses pengembangan menjadi lebih cepat dan efisien.

---

## 1. Memahami Go Template

Hugo menggunakan bahasa *templating* dari Go. Template adalah file HTML yang disematkan dengan fungsi, variabel, dan struktur kontrol (seperti `if/else` dan `range`).

### **Konsep Dasar Variabel:**

Di dalam file *layout* (`.html`), data konten Anda diakses melalui variabel global seperti `.Page` dan `.Site`.

| Variabel | Deskripsi | Contoh Penggunaan |
| :--- | :--- | :--- |
| **`.Title`** | Judul Halaman saat ini (dari *front matter*). | `<h1>{{ .Title }}</h1>` |
| **`.Content`** | Isi konten yang telah dirender dari Markdown. | `<article>{{ .Content }}</article>` |
| **`.Params`** | Mengakses variabel kustom di *front matter*. | `{{ .Params.author }}` |

### **Menggunakan Struktur Kontrol:**

Contoh membuat *conditional display* jika ada gambar di *front matter*:
```go-html-template
{{ if .Params.image }}
    <img src="{{ .Params.image | relURL }}" alt="{{ .Title }}">
{{ else }}
    <img src="/images/default.png" alt="No image">
{{ end }}