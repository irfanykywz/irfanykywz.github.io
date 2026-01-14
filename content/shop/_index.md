---
title: "Produk dan Layanan"
description: "Temukan produk digital berkualitas dan jasa profesional untuk kebutuhan Anda."
icon: "ri-store-2-line"
layout: "shop"
contact_wa: "6281389215100"
contact_telegram: "irfanykywz"

payments:
  - name: "QRIS"
    account_number: "Scan QR"
    account_name: "a.n. Irfan YKYWZ"
    image: "/images/qris-irfanykywz.avif" 
    type: "qris"
  - name: "Bank BNI"
    account_number: "1605859742"
    account_name: "a.n. Muhamad Irfan"
    type: "bank"
  - name: "E-Wallet DANA"
    account_number: "081389215100"
    account_name: "a.n. Muhamad Irfan"
    type: "ewallet"

coupons:
  - code: "DISKON10"
    type: "percentage" # Tipe diskon: 'percentage' atau 'fixed'
    value: 10 # Nilai: 10 untuk 10%
  - code: "BOT30"
    type: "percentage"
    value: 30
    products: # Kupon ini hanya berlaku untuk produk dengan slug berikut
      - produk-1
    expires: "2026-01-15" # Format YYYY-MM-DD
  - code: "HEMAT50"
    type: "fixed"
    value: 50000 # Nilai: 50000 untuk potongan Rp 50.000
---