---
title: Menjalankan Python
description: 
section: Menjalankan Kode
image: 
date: 2025-06-02T16:00:35+07:00
---

## 2. Menjalankan Python

Setelah instalasi, kamu bisa menjalankan Python melalui:

- **Command Line**: Buka Command Prompt dan ketik `python`.
- **IDE**: Gunakan editor seperti PyCharm atau Visual Studio Code.

## 3. Dasar-Dasar Python

### a. Variabel dan Tipe Data

Di Python, kamu bisa membuat variabel dengan mudah. Contoh:

python
nama = "Nakiri"
umur = 20
print(nama, umur)


#### Tipe Data

Python memiliki beberapa tipe data dasar:

- **String**: Teks, contoh: `"Hello"`
- **Integer**: Angka bulat, contoh: `10`
- **Float**: Angka desimal, contoh: `10.5`
- **Boolean**: True atau False

### b. Struktur Kontrol

#### i. Percabangan

Menggunakan `if`, `elif`, dan `else`:

python
umur = 18
if umur >= 18:
    print("Dewasa")
else:
    print("Anak-anak")


#### ii. Perulangan

Menggunakan `for` dan `while`:

python
for i in range(5):
    print(i)

count = 0
while count < 5:
    print(count)
    count += 1


### c. Fungsi

Fungsi digunakan untuk mengorganisir kode. Contoh:

python
def sapa(nama):
    print("Halo, " + nama + "!")

sapa("Nakiri")


## 4. Struktur Data

Python memiliki beberapa struktur data yang berguna untuk menyimpan koleksi data:

### a. List

List adalah kumpulan data yang terurut dan dapat diubah:

python
buah = ["apel", "jeruk", "pisang"]
print(buah[0])  # Output: apel


### b. Tuple

Tuple mirip dengan list, tetapi tidak dapat diubah:

python
koordinat = (10.0, 20.0)
print(koordinat[1])  # Output: 20.0


### c. Dictionary

Dictionary adalah kumpulan pasangan kunci-nilai:

python
data_mahasiswa = {
    "nama": "Nakiri",
    "umur": 20,
    "jurusan": "Informatika"
}
print(data_mahasiswa["nama"])  # Output: Nakiri


## 5. Proyek Kecil

Setelah memahami dasar-dasar Python, saatnya untuk menerapkan pengetahuanmu! Yuk, kita buat proyek kecil:

### Proyek: Kalkulator Sederhana

Buatlah program kalkulator sederhana yang dapat melakukan operasi penjumlahan, pengurangan, perkalian, dan pembagian. Berikut adalah contoh struktur programnya:

python
def kalkulator(angka1, angka2, operasi):
    if operasi == "tambah":
        return angka1 + angka2
    elif operasi == "kurang":
        return angka1 - angka2
    elif operasi == "kali":
        return angka1 * angka2
    elif operasi == "bagi":
        return angka1 / angka2
    else:
        return "Operasi tidak valid"

# Contoh penggunaan
print(kalkulator(10, 5, "tambah"))  # Output: 15


## Kesimpulan

Selamat! Kamu sudah belajar banyak tentang Python, mulai dari instalasi, dasar-dasar, hingga membuat proyek kecil. Teruslah berlatih dan eksplorasi lebih dalam. Jika ada pertanyaan, jangan ragu untuk bertanya yaaa! 😘

## Sumber Belajar Tambahan

- [Dokumentasi Resmi Python](https://docs.python.org/3/)
- [W3Schools Python Tutorial](https://www.w3schools.com/python/)
- [Codecademy Python Course](https://www.codecademy.com/learn/learn-python-3)

Semoga tutorial ini bermanfaat dan selamat belajar! 🎉


Gimana? Udah siap untuk dipakai? Ihhh, semoga tutorialnya bikin kamu makin semangat belajar Python yaaa! 😄✨