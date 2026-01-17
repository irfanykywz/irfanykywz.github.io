function updateNavClock() {
    const timeEl = document.getElementById('nav-time');
    const dateEl = document.getElementById('nav-date');
    const greetEl = document.getElementById('nav-greeting');
    
    const now = new Date();
    const hours = now.getHours();

    // Format waktu Indonesia 24 jam
    timeEl.innerText = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(/\./g, ':');
    
    // Format tanggal Indonesia
    dateEl.innerText = now.toLocaleDateString('id-ID', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    // Greeting berdasarkan waktu
    let greeting = "HALO";
    if (hours >= 5 && hours < 11) greeting = "PAGI";
    else if (hours >= 11 && hours < 15) greeting = "SIANG";
    else if (hours >= 15 && hours < 19) greeting = "SORE";
    else greeting = "MALAM";
    
    greetEl.innerText = greeting;
}

async function updateWeather() {
    const weatherContainer = document.getElementById('nav-weather');
    const tempEl = document.getElementById('weather-temp');
    const iconEl = document.getElementById('weather-icon');

    // 1. Cek data di LocalStorage
    const cachedWeather = localStorage.getItem('weatherData');
    const cacheExpiry = 30 * 60 * 1000; // 30 menit dalam milidetik
    const now = new Date().getTime();

    if (cachedWeather) {
        const { data, timestamp } = JSON.parse(cachedWeather);
        
        // Jika data belum kadaluwarsa (kurang dari 30 menit), gunakan cache
        if (now - timestamp < cacheExpiry) {
            console.log("Menggunakan data cuaca dari cache");
            displayWeather(data, tempEl, iconEl, weatherContainer);
            return; 
        }
    }

    try {
        console.log("Mengambil data cuaca baru dari API...");
        const lat = -6.455069401623014; 
        const lon = 106.85066008971673;

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Asia%2FJakarta`);
        const data = await response.json();
        const weather = data.current_weather;

        // 2. Simpan hasil ke LocalStorage dengan timestamp
        localStorage.setItem('weatherData', JSON.stringify({
            data: weather,
            timestamp: now
        }));

        displayWeather(weather, tempEl, iconEl, weatherContainer);
    } catch (error) {
        console.error("Gagal mengambil data cuaca:", error);
    }
}

// Fungsi pembantu untuk update UI agar kode tidak duplikat
function displayWeather(weather, tempEl, iconEl, container) {
    const code = weather.weathercode;
    let icon = "☀️"; 
    if (code >= 1 && code <= 3) icon = "⛅";
    if (code >= 45 && code <= 48) icon = "🌫️";
    if (code >= 51 && code <= 67) icon = "🌧️";
    if (code >= 80 && code <= 82) icon = "🌦️";
    if (code >= 95) icon = "⚡";

    tempEl.innerText = `${Math.round(weather.temperature)}°C`;
    iconEl.innerText = icon;
    container.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    // Jalankan jam setiap menit
    setInterval(updateNavClock, 60000);
    updateNavClock();
    
    // Jalankan cuaca (Initial load & setiap 30 menit)
    updateWeather();
    setInterval(updateWeather, 1800000);
    
    // Integrasi dengan Alpine.js untuk memastikan waktu update saat menu dibuka
    document.addEventListener('alpine:init', () => {
        Alpine.effect(() => {
            if (Alpine.store('nav') && Alpine.store('nav').isOpen) {
                updateNavClock();
            }
        });
    });
});
