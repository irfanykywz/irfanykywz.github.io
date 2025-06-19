// Winter Effects JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Create snowfall effect
    createSnowfall();
    
    // Create floating ice particles
    createIceParticles();
    
    // Add winter theme toggle
    initWinterTheme();
    
    // Add parallax effect for winter elements
    initParallaxEffect();
});

function createSnowfall() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Create snowflakes
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.cssText = `
            position: absolute;
            color: rgba(255, 255, 255, 0.8);
            user-select: none;
            pointer-events: none;
            font-size: ${Math.random() * 10 + 10}px;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${Math.random() * 3 + 2}s;
        `;
        
        snowContainer.appendChild(snowflake);
    }
    
    document.body.appendChild(snowContainer);
}

function createIceParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ice-particles';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'ice-particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${Math.random() * 4 + 4}s;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

function initWinterTheme() {
    const themeToggle = document.getElementById('scheme-toggle');
    if (!themeToggle) return;
    
    // Add winter-specific theme handling
    themeToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const isWinter = localStorage.getItem('winter-mode') === 'true';
        
        if (isWinter) {
            html.classList.remove('winter-mode');
            localStorage.setItem('winter-mode', 'false');
        } else {
            html.classList.add('winter-mode');
            localStorage.setItem('winter-mode', 'true');
        }
        
        updateWinterEffects();
    });
    
    // Initialize winter mode from localStorage
    if (localStorage.getItem('winter-mode') === 'true') {
        document.documentElement.classList.add('winter-mode');
        updateWinterEffects();
    }
}

function updateWinterEffects() {
    const isWinterMode = document.documentElement.classList.contains('winter-mode');
    const snowContainer = document.querySelector('.snow-container');
    const iceParticles = document.querySelector('.ice-particles');
    
    if (snowContainer) {
        snowContainer.style.display = isWinterMode ? 'block' : 'none';
    }
    
    if (iceParticles) {
        iceParticles.style.display = isWinterMode ? 'block' : 'none';
    }
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

// Winter-themed cursor effect
function initWinterCursor() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create ice trail effect
        createIceTrail(mouseX, mouseY);
    });
}

function createIceTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'ice-trail';
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
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

// Add CSS for ice trail animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ice-trail-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.3);
        }
    }
`;
document.head.appendChild(style);

// Initialize winter cursor effect
initWinterCursor();

// Winter theme seasonal detection
function detectSeason() {
    const now = new Date();
    const month = now.getMonth();
    
    // Winter months: December (11), January (0), February (1), March (2)
    const isWinterSeason = month === 11 || month === 0 || month === 1 || month === 2;
    
    if (isWinterSeason && !localStorage.getItem('winter-mode')) {
        // Auto-enable winter mode during winter months
        document.documentElement.classList.add('winter-mode');
        localStorage.setItem('winter-mode', 'true');
        updateWinterEffects();
    }
}

// Call seasonal detection
detectSeason();

// Add winter loading animation for page transitions
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

// Export functions for use in other scripts
window.WinterEffects = {
    showLoading: showWinterLoading,
    hideLoading: hideWinterLoading,
    createSnowfall: createSnowfall,
    createIceParticles: createIceParticles
};