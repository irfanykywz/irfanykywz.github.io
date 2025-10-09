---
title: Panduan Dasar Pengembangan Hugo
slug: example-learn
description: Seri tutorial lengkap untuk pemula tentang instalasi, konfigurasi, dan deployment Hugo.
section: Dasar
image: image.avif
date: 2025-10-09T16:00:35+07:00
draft: false
---

# Hugo 101: Membangun Situs Web Statis dalam 5 Menit

Selamat datang di panduan pengembangan situs statis menggunakan **Hugo**! Hugo adalah *framework* yang sangat cepat, ditulis dalam Go (Golang), yang memungkinkan Anda membuat situs web dengan *performance* tinggi.

Panduan ini akan membawa Anda dari instalasi dasar hingga *deployment* situs pertama Anda.

---

## Modul 1: Persiapan Lingkungan

Sebelum kita mulai, pastikan sistem Anda memenuhi persyaratan berikut:

### 1. Instalasi Go (Opsional, tapi Disarankan)
Meskipun Hugo dapat diinstal tanpa Go, memilikinya akan mempermudah kompilasi dari sumber.

* **Linux/macOS:**
    ```bash
    brew install go
    ```
* **Windows:** Unduh installer dari [situs resmi Golang](https://golang.org/dl/).

### 2. Instalasi Hugo
Gunakan manajer paket favorit Anda:

| Sistem Operasi | Perintah Instalasi |
| :--- | :--- |
| **macOS (Homebrew)** | `brew install hugo` |
| **Windows (Chocolatey)** | `choco install hugo -confirm` |
| **Linux (Snap)** | `snap install hugo` |

Verifikasi instalasi Anda dengan menjalankan:
```bash
hugo version
# Output: hugo v0.120.0+extended linux/amd64 BuildDate...