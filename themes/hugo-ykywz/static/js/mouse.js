// --- Konfigurasi ---
const colour = "#ffcc00"; // Warna sparkle (Kuning keemasan)
const sparkles = 5;

// --- Variabel Global ---
let x = 400, ox = 400;
let y = 300, oy = 300;
let swide = 800;
let shigh = 600;
let sleft = 0, sdown = 0;

// --- Array untuk menyimpan elemen dan status ---
const tiny = new Array(sparkles);
const star = new Array(sparkles);
const starv = new Array(sparkles).fill(0);
const starx = new Array(sparkles);
const stary = new Array(sparkles);
const tinyx = new Array(sparkles);
const tinyy = new Array(sparkles);
const tinyv = new Array(sparkles).fill(0);

// --- Fungsi Pembantu: Membuat Div Sparkle ---
function createDiv(height, width, isStar = false) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    div.style.backgroundColor = colour;
    div.style.pointerEvents = "none"; // Penting: agar tidak menghalangi event mouse
    div.style.borderRadius = isStar ? "50%" : "0"; // Sedikit modernisasi

    return div;
}

// --- Fungsi Inisialisasi ---
function initSparkles() {
    if (!document.getElementById) return;

    for (let i = 0; i < sparkles; i++) {
        // Elemen 'tiny'
        let rats = createDiv(3, 3);
        rats.style.visibility = "hidden";
        document.body.appendChild(tiny[i] = rats);

        // Elemen 'star' (bentuk palang)
        rats = createDiv(5, 5, true); // Menggunakan true untuk borderRadius
        rats.style.backgroundColor = "transparent";
        rats.style.visibility = "hidden";

        const rlef = createDiv(1, 5);
        const rdow = createDiv(5, 1);
        
        rats.appendChild(rlef);
        rats.appendChild(rdow);

        // Menyesuaikan posisi elemen dalam palang (cross)
        rlef.style.top = "2px"; 
        rlef.style.left = "0px";
        rlef.style.backgroundColor = colour;

        rdow.style.top = "0px";
        rdow.style.left = "2px";
        rdow.style.backgroundColor = colour;

        document.body.appendChild(star[i] = rats);
    }

    set_width();
    sparkle();
}

// --- Fungsi Utama: Animasi Sparkle ---
function sparkle() {
    // Jika posisi mouse berubah, luncurkan sparkle baru
    if (x !== ox || y !== oy) {
        ox = x;
        oy = y;
        for (let c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px";
                star[c].style.top = (stary[c] = y) + "px";
                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
    }

    // Update posisi semua sparkle
    for (let c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }

    // Loop animasi
    setTimeout(sparkle, 40);
}

// --- Update 'Star' (Palang) ---
function update_star(i) {
    // Menyusutkan ukuran
    if (--starv[i] === 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";

    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3; // Kecepatan jatuh
        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            starx[i] += (i % 5 - 2) / 5; // Pergerakan horizontal acak
            star[i].style.left = starx[i] + "px";
        } else {
            // Keluar dari viewport
            star[i].style.visibility = "hidden";
            starv[i] = 0;
            return;
        }
    } else {
        // Star menghilang, ubah menjadi 'tiny' sparkle
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }
}

// --- Update 'Tiny' Sparkle ---
function update_tiny(i) {
    // Menyusutkan ukuran
    if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }

    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3; // Kecepatan jatuh
        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tinyx[i] += (i % 5 - 2) / 5; // Pergerakan horizontal acak
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            // Keluar dari viewport
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
            return;
        }
    } else {
        tiny[i].style.visibility = "hidden";
    }
}

// --- Penanganan Mouse Movement ---
function mouse(e) {
    set_scroll();
    // Menggunakan properti standar (e.pageX dan e.pageY)
    y = e.pageY;
    x = e.pageX;
}

// --- Penanganan Scroll ---
function set_scroll() {
     sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
     sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}

// --- Penanganan Resize Window ---
function set_width() {
    // Menggunakan cara modern untuk mendapatkan dimensi viewport
    swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// --- Event Listener Modern ---
window.addEventListener('load', initSparkles);
document.addEventListener('mousemove', mouse);
window.addEventListener('resize', set_width);