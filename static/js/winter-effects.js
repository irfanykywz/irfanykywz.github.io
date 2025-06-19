// Winter Effects JavaScript - Enhanced

document.addEventListener('DOMContentLoaded', function() {
    // Initialize winter effects
    initWinterEffects();
});

function initWinterEffects() {
    // Create snowfall effect
    createSnowfall();
    
    // Create floating ice particles
    createIceParticles();
    
    // Add winter theme functionality
    initWinterTheme();
    
    // Add winter cursor effect
    initWinterCursor();
    
    // Initialize parallax effects
    initParallaxEffect();
    
    // Auto-detect season
    detectSeason();
}

function createSnowfall() {
    // Remove existing snow container
    const existingSnow = document.querySelector('.snow-container');
    if (existingSnow) {
        existingSnow.remove();
    }
    
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    
    // Create snowflakes with better distribution
    for (let i = 0; i < 60; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        
        // Random properties for each snowflake
        const size = Math.random() * 8 + 8;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 8;
        const animationDelay = Math.random() * 10;
        const opacity = Math.random() * 0.6 + 0.4;
        
        snowflake.style.cssText = `
            position: absolute;
            left: ${left}%;
            font-size: ${size}px;
            opacity: ${opacity};
            animation: snowfall ${animationDuration}s linear infinite;
            animation-delay: ${animationDelay}s;
            user-select: none;
            pointer-events: none;
        `;
        
        snowContainer.appendChild(snowflake);
    }
    
    document.body.appendChild(snowContainer);
}

function createIceParticles() {
    // Remove existing ice particles
    const existingIce = document.querySelector('.ice-particles');
    if (existingIce) {
        existingIce.remove();
    }
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ice-particles';
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'ice-particle';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 4 + 4;
        
        particle.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

function initWinterTheme() {
    const themeToggle = document.getElementById('scheme-toggle');
    if (!themeToggle) return;
    
    // Check if winter mode is enabled
    const isWinterMode = localStorage.getItem('winter-mode') === 'true';
    if (isWinterMode) {
        document.documentElement.classList.add('winter-mode');
        updateWinterEffects(true);
    }
    
    // Add click handler for theme toggle
    themeToggle.addEventListener('click', function() {
        setTimeout(() => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                // Enable winter effects in dark mode
                document.documentElement.classList.add('winter-mode');
                localStorage.setItem('winter-mode', 'true');
                updateWinterEffects(true);
            } else {
                // Disable winter effects in light mode
                document.documentElement.classList.remove('winter-mode');
                localStorage.setItem('winter-mode', 'false');
                updateWinterEffects(false);
            }
        }, 100);
    });
}

function updateWinterEffects(enable) {
    const snowContainer = document.querySelector('.snow-container');
    const iceParticles = document.querySelector('.ice-particles');
    
    if (snowContainer) {
        snowContainer.style.display = enable ? 'block' : 'none';
    }
    
    if (iceParticles) {
        iceParticles.style.display = enable ? 'block' : 'none';
    }
    
    // Update body class for winter styling
    if (enable) {
        document.body.classList.add('winter-active');
    } else {
        document.body.classList.remove('winter-active');
    }
}

function initWinterCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let trails = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Only create trails if winter mode is active
        if (document.documentElement.classList.contains('winter-mode')) {
            createIceTrail(mouseX, mouseY);
        }
    });
}

function createIceTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'ice-trail';
    trail.style.cssText = `
        position: fixed;
        left: ${x - 3}px;
        top: ${y - 3}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, rgba(135, 206, 235, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: ice-trail-fade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 1000);
}

function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update snowflakes position based on scroll
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach((flake, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            const yPos = scrolled * speed;
            flake.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function detectSeason() {
    const now = new Date();
    const month = now.getMonth();
    
    // Winter months: December (11), January (0), February (1), March (2)
    const isWinterSeason = month === 11 || month === 0 || month === 1 || month === 2;
    
    if (isWinterSeason && !localStorage.getItem('winter-mode')) {
        // Auto-enable winter mode during winter months
        document.documentElement.classList.add('winter-mode');
        localStorage.setItem('winter-mode', 'true');
        updateWinterEffects(true);
    }
}

// Winter loading animation
function showWinterLoading() {
    const loader = document.createElement('div');
    loader.className = 'winter-loader';
    loader.innerHTML = `
        <div class="winter-loading"></div>
        <p>Loading winter magic...</p>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(loader);
    return loader;
}

function hideWinterLoading(loader) {
    if (loader && loader.parentNode) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.parentNode.removeChild(loader);
        }, 500);
    }
}

// Performance optimization: Reduce effects on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Adjust effects based on device
if (isMobile()) {
    // Reduce number of particles on mobile
    const originalCreateSnowfall = createSnowfall;
    createSnowfall = function() {
        const existingSnow = document.querySelector('.snow-container');
        if (existingSnow) {
            existingSnow.remove();
        }
        
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        
        // Fewer snowflakes on mobile
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            
            const size = Math.random() * 6 + 6;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 6 + 6;
            const animationDelay = Math.random() * 8;
            const opacity = Math.random() * 0.5 + 0.3;
            
            snowflake.style.cssText = `
                position: absolute;
                left: ${left}%;
                font-size: ${size}px;
                opacity: ${opacity};
                animation: snowfall ${animationDuration}s linear infinite;
                animation-delay: ${animationDelay}s;
                user-select: none;
                pointer-events: none;
            `;
            
            snowContainer.appendChild(snowflake);
        }
        
        document.body.appendChild(snowContainer);
    };
}

// Export functions for global use
window.WinterEffects = {
    showLoading: showWinterLoading,
    hideLoading: hideWinterLoading,
    createSnowfall: createSnowfall,
    createIceParticles: createIceParticles,
    updateEffects: updateWinterEffects
};

// Initialize feather icons after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});