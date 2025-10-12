---
title: "Pemilih Warna"
date: 2025-10-07T00:00:00+07:00
description: "Alat kecil untuk memilih warna, melihat pratinjau, dan menyalin nilai hex. Menggunakan variabel CSS tema."
icon: "ri-palette-line"
---

  <div class="color-picker">
    <div class="color-canvas">
      <div class="row u-gap-1 u-items-center">
        <div id="swatch" class="color-swatch" aria-hidden="true"></div>
        <div class="u-grow">
          <label for="colorInput" class="card-title">Pilih warna</label>
          <input id="colorInput" class="color-input" type="color" value="#3b82f6">
        </div>
      </div>

<div class="u-flex u-gap-1 u-items-center u-mt-1">
<input id="hexValue" class="hex-input" type="text" value="#3b82f6" aria-label="nilai hex">
<button id="copyBtn" class="nav-button">Salin</button>
</div>

<div class="u-mt-1 text-sm">Contoh variabel tema: <code class="code-inline">--accent-primary</code> = <span id="varAccent">var(--accent-primary)</span></div>
</div>

<div class="color-tools">
<div>
<h3 class="card-title">Swatches</h3>
<div class="swatches">
    <button class="swatch-btn" data-color="#3b82f6" aria-label="swatch 1"></button>
    <button class="swatch-btn" data-color="#10b981"></button>
    <button class="swatch-btn" data-color="#f59e0b"></button>
    <button class="swatch-btn" data-color="#d96d65"></button>
    <button class="swatch-btn" data-color="#2563eb"></button>
</div>
</div>

<div>
<h3 class="card-title">Pratinjau</h3>
<div class="u-flex-column u-gap-1">
    <div class="preview-box">
    <div class="preview-head" id="previewText">Contoh judul pratinjau</div>
    <div class="preview-sub" id="previewSub">Contoh subteks untuk menilai kontras</div>
    </div>
    <div class="preview-buttons">
    <div id="btnPreview" class="preview-btn primary">Tombol utama</div>
    <div id="btnPreview2" class="preview-btn secondary">Sekunder</div>
    </div>
</div>
</div>

<div class="u-mt-auto muted text-sm">Tip: Gunakan input warna atau swatches. Klik Salin untuk menyalin nilai hex ke clipboard.</div>
</div>
  </div>

<style>
.color-picker input[type="color"]{border:none;padding:0;background:transparent}
.color-picker .swatch-btn{cursor:pointer}
.color-picker .swatch-btn:focus{outline:2px solid var(--accent-primary);outline-offset:2px}
.color-picker .nav-button{background:var(--bg-secondary);color:var(--text-primary);border:1px solid var(--border-color);padding:0.4rem 0.6rem;border-radius:6px}
.color-picker .nav-button:hover{background:var(--accent-primary);color:white}
.page-title{font-size:1.5rem;margin-bottom:0.5rem}
.lead{color:var(--text-secondary);margin-bottom:1rem}

/* Layout for color picker */
.color-picker{margin-top:1.5rem;display:grid;gap:1.5rem;align-items:start}
.color-canvas{padding:1rem;border-radius:8px;background:var(--bg-secondary);box-shadow:var(--shadow-md)}
.color-canvas .row{display:flex;gap:1rem;align-items:center}
.color-swatch{width:72px;height:72px;border-radius:8px;border:1px solid var(--border-color);background:var(--accent-primary)}
.color-input{width:100%;height:44px;border-radius:6px;border:1px solid var(--border-color);background:transparent;cursor:pointer}
.hex-input{flex:1;padding:0.5rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary)}

.color-tools{padding:1rem;border-radius:8px;background:var(--bg-secondary);box-shadow:var(--shadow-md);display:flex;flex-direction:column;gap:1rem}
.swatches{display:flex;gap:0.5rem;flex-wrap:wrap}
.swatch-btn{width:40px;height:40px;border-radius:6px;border:1px solid var(--border-color);cursor:pointer}

.preview-box{padding:1rem;border-radius:6px;background:linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));border:1px solid var(--border-color)}
.preview-head{font-weight:600;color:var(--text-primary)}
.preview-sub{color:var(--text-secondary)}
.preview-buttons{display:flex;gap:0.5rem}
.preview-btn{flex:1;padding:0.75rem;border-radius:6px;text-align:center}
.preview-btn.primary{background:var(--accent-primary);color:white}
.preview-btn.secondary{border:1px solid var(--border-color);color:var(--text-primary)}
</style>


<script>
(() => {
  const colorInput = document.getElementById('colorInput');
  const swatch = document.getElementById('swatch');
  const hexValue = document.getElementById('hexValue');
  const copyBtn = document.getElementById('copyBtn');
  const varAccent = document.getElementById('varAccent');
  const swatchBtns = document.querySelectorAll('.swatch-btn');

  function setColor(hex) {
    swatch.style.background = hex;
    hexValue.value = hex;
    document.getElementById('btnPreview').style.background = hex;
    const c = hex.substring(1);
    const rgb = parseInt(c,16);
    const r = (rgb>>16)&255, g = (rgb>>8)&255, b = (rgb)&255;
    const luminance = 0.2126*r + 0.7152*g + 0.0722*b;
    document.getElementById('btnPreview').style.color = luminance > 140 ? '#0f172a' : '#fff';
  }

  colorInput.addEventListener('input', e => setColor(e.target.value));
  hexValue.addEventListener('change', e => {
    const v = e.target.value.trim();
    if(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) setColor(v);
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(hexValue.value);
      copyBtn.textContent = 'Tersalin';
      setTimeout(() => (copyBtn.textContent = 'Salin'), 1500);
    } catch (err) {
      copyBtn.textContent = 'Gagal menyalin';
      setTimeout(() => (copyBtn.textContent = 'Salin'), 1500);
    }
  });

  swatchBtns.forEach(b => {
    const c = b.dataset.color;
    if(c) b.style.background = c;
    b.addEventListener('click', e => setColor(e.currentTarget.dataset.color));
  });

  try {
    const cs = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
    if(varAccent) varAccent.textContent = cs || 'n/a';
  } catch (e) {}
})();
</script>

