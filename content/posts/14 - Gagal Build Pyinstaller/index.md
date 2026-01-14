---
title: Gagal Build Pyinstaller karena subfolder memiliki karakter []
slug: gagal-build-pyinstaller
date: 2025-06-30T15:59:43+07:00
draft: false
tags: ['python', 'fix error']
---


hampir 3 jam-an saya bingung kenapa ngebuild program python menjadi exe selalu gagal

program berhasil menjadi exe tapi ketika dijalankan tidak bisa

saya coba turunkan versi packagenya, saya coba samakan dengan yang bisa build namun tetep saja tidak bisa

setelah sekian lama mencoba sayapun baru menyadari kalau saya menaruh project ini didalam folder yang menggunakan simbol seperti ini [Python Journey]

full pathnya seperti ini
`D:\Apps\laragon\www\[Python Journey]\pyside6-plugin-system`

alhasil sayapun coba untuk membuildnya diluar dari folder tersebut dan ternyata benar saja, masalah terletak pada penamaan folder

full path yang baru seperti ini
`D:\Apps\laragon\www\pyside6-plugin-system`

benar-benar sangat aneh, 3 jam yang membingungkan