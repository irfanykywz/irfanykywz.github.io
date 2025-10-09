---
title: Persiapan Lingkungan dan Tools
slug: persiapan
description: Detail tools penting yang wajib diinstal dan konfigurasi awal sebelum memulai pengembangan Hugo.
section: Persiapan
image: ide-setup.avif
date: 2025-06-01T16:00:35+07:00
weight: 1
draft: false
---

# Persiapan Dasar: Tools Wajib dan Lingkungan

Modul ini akan memastikan semua *tools* yang Anda butuhkan untuk mengembangkan situs Hugo dengan efisien telah terpasang dan dikonfigurasi dengan benar. Pengaturan yang baik akan menghemat banyak waktu di masa depan.

---

## 1. Editor Kode (Code Editor)

Meskipun Anda bisa menggunakan *notepad* biasa, menggunakan *Code Editor* yang canggih sangat disarankan karena fitur *syntax highlighting* dan integrasi Git.

| Editor | Platform | Fitur Utama untuk Hugo |
| :--- | :--- | :--- |
| **Visual Studio Code (VS Code)** | Multi-platform | Ekstensi Markdown, Git, dan Hugo Preview. **Sangat Direkomendasikan.** |
| **Sublime Text** | Multi-platform | Sangat ringan dan cepat, bagus untuk *file* konfigurasi besar. |

### **Tips Konfigurasi VS Code:**

Setelah menginstal VS Code, segera instal ekstensi berikut melalui *marketplace*:
* **Markdown All in One:** Mempercepat penulisan konten Markdown.
* **vscode-icons:** Membuat struktur file proyek Anda lebih mudah dibaca.
* **GitLens:** Meningkatkan kemampuan manajemen versi Git.

## 2. Sistem Kontrol Versi (Git)

Menggunakan **Git** adalah keharusan. Ini memungkinkan Anda melacak semua perubahan, bekerja dengan tema eksternal (seperti yang kita lakukan di modul sebelumnya), dan memudahkan *deployment* ke platform *hosting* statis (seperti Netlify atau GitHub Pages).

### **Langkah Instalasi Git:**

1.  Unduh dan instal Git dari [situs resmi](https://git-scm.com/downloads).
2.  Verifikasi instalasi di terminal/CMD:
    ```bash
    git --version
    # Output: git version 2.40.1
    ```
3.  Konfigurasi identitas awal (ini hanya perlu dilakukan sekali):
    ```bash
    git config --global user.name "Nama Anda"
    git config --global user.email "emailanda@example.com"
    ```

---

## 3. Terminal atau Command Line (CLI)

Anda akan sering menggunakan Terminal (atau Command Prompt/PowerShell di Windows) untuk menjalankan perintah Hugo. Pastikan Anda nyaman dengan navigasi dasar.

### **Rekomendasi Terminal:**

* **Windows:** Gunakan **Windows Terminal** baru atau **Git Bash** (terinstal bersama Git).
* **macOS/Linux:** Terminal bawaan sudah memadai.

**Penting:** Selalu pastikan Anda berada di direktori **root** proyek Hugo Anda (`/quickstart/` atau nama proyek Anda) saat menjalankan perintah seperti `hugo new` atau `hugo server`.

***

**Langkah Selanjutnya:** Setelah semua *tools* ini terpasang, Anda siap untuk masuk ke modul mendalam tentang struktur file dan *Templating* Hugo.

---

Modul apa yang selanjutnya ingin Anda fokuskan? Mungkin "Struktur File Hugo" atau "Templating Lanjutan"?