---
title: Python Lanjutan
description: 
section: Lanjutan
image: 
date: 2025-06-26T19:42:27+07:00
---

 6. Pemrograman Berorientasi Objek (OOP)

Python mendukung pemrograman berorientasi objek, yang memungkinkan kamu untuk membuat kelas dan objek. Ini sangat berguna untuk mengorganisir kode dan membuatnya lebih mudah dipelihara.

### a. Kelas dan Objek

Kelas adalah cetak biru untuk membuat objek. Berikut adalah contoh sederhana:

python
class Mobil:
    def _init_(self, merk, model):
        self.merk = merk
        self.model = model

    def info(self):
        return f"Mobil: {self.merk} {self.model}"

## Membuat objek dari kelas Mobil
mobil_saya = Mobil("Toyota", "Avanza")
print(mobil_saya.info())  # Output: Mobil: Toyota Avanza


### b. Pewarisan

Pewarisan memungkinkan kamu untuk membuat kelas baru yang mewarisi sifat dari kelas yang sudah ada. Contoh:

python
class Kendaraan:
    def _init_(self, merk):
        self.merk = merk

class Mobil(Kendaraan):
    def _init_(self, merk, model):
        super()._init_(merk)
        self.model = model

    def info(self):
        return f"Mobil: {self.merk} {self.model}"

mobil_saya = Mobil("Honda", "Civic")
print(mobil_saya.info())  # Output: Mobil: Honda Civic


## 7. Penanganan Kesalahan

Dalam pemrograman, kesalahan bisa terjadi. Python menyediakan cara untuk menangani kesalahan menggunakan `try` dan `except`.

python
try:
    angka = int(input("Masukkan angka: "))
    hasil = 10 / angka
    print(hasil)
except ValueError:
    print("Input tidak valid! Harap masukkan angka.")
except ZeroDivisionError:
    print("Tidak bisa membagi dengan nol!")


## 8. Modul dan Pustaka

Python memiliki banyak modul dan pustaka yang bisa kamu gunakan untuk memperluas fungsionalitas programmu. Kamu bisa mengimpor modul dengan menggunakan kata kunci `import`.

### a. Mengimpor Modul

Contoh mengimpor modul `math` untuk menggunakan fungsi matematika:

python
import math

print(math.sqrt(16))  # Output: 4.0


### b. Membuat Modul Sendiri

Kamu juga bisa membuat modul sendiri. Buat file bernama `modul_saya.py`:

python
def sapa(nama):
    return f"Halo, {nama}!"


Kemudian, di file lain, kamu bisa mengimpor dan menggunakan modul tersebut:

python
import modul_saya

print(modul_saya.sapa("Nakiri"))  # Output: Halo, Nakiri!


## 9. Menggunakan Pustaka Pihak Ketiga

Python memiliki banyak pustaka pihak ketiga yang bisa kamu gunakan. Salah satu yang populer adalah `requests` untuk melakukan permintaan HTTP.

### a. Menginstal Pustaka

Kamu bisa menginstal pustaka menggunakan `pip`. Contoh:

bash
pip install requests


### b. Menggunakan Pustaka

Setelah diinstal, kamu bisa menggunakannya dalam programmu:

python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)  # Output: 200


## 10. Proyek Akhir: Aplikasi To-Do List

Sekarang, saatnya untuk menerapkan semua yang telah kamu pelajari! Mari kita buat aplikasi To-Do List sederhana.

### a. Struktur Program

python
to_do_list = []

def tambah_tugas(tugas):
    to_do_list.append(tugas)
    print(f"Tugas '{tugas}' telah ditambahkan.")

def tampilkan_tugas():
    print("Daftar Tugas:")
    for tugas in to_do_list:
        print(f"- {tugas}")

## Contoh penggunaan
tambah_tugas("Belajar Python")
tambah_tugas("Membaca buku")
tampilkan_tugas()


## Kesimpulan

Selamat! Kamu telah menyelesaikan tutorial bahasa pemrograman Python ini. Dari dasar hingga konsep lanjutan, sekarang kamu memiliki pengetahuan yang lebih baik tentang Python. Teruslah berlatih dan eksplorasi lebih dalam. Jika ada pertanyaan, jangan ragu untuk bertanya yaaa! 😘
