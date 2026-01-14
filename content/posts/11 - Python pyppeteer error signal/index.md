---
title: "Python pyppeteer [Fix] ValueError: signal only works in main thread of the main interpreter"
slug: python pyppeteer error signal
date: 2025-06-28T19:10:27+07:00
draft: false
tags: ['fix bug', 'python']
---

masalah ini terjadi karena fungsi signal dan slot yang ada pada pyppteer tidak bisa dijalankan pada sub-thread

signal dan slot hanya bisa berjalan di thread utama maka dari itu error ini muncul

untuk mengatasinya yaitu dengan menonaktifkan fitur signal dan slot yang ada pada pyppeteer, dengan menambahkan kode dibawah ini pada bagian parameter launch

```
'handleSIGINT': False,
'handleSIGTERM': False,
'handleSIGHUP': False,
```

&nbsp;

kode lengkapnya akan terlihat seperti ini 

```
import asyncio
from pyppeteer import launch

async def launch_browser():
    browser = await launch({
        'handleSIGINT': False,
        'handleSIGTERM': False,
        'handleSIGHUP': False,
    })

    page = await browser.newPage()
    await page.goto('https://example.com')

    await asyncio.sleep(1000)
    # Perform actions on the page
    # await browser.close()

asyncio.run(launch_browser())
```

&nbsp;

referensi : [stackoverflow](https://stackoverflow.com/questions/53679905/running-pyppeteer-in-flask-gives-valueerror-signal-only-works-in-main-thread)