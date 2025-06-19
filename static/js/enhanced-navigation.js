// Enhanced Navigation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initEnhancedNavigation();
});

function initEnhancedNavigation() {
    // Initialize scroll effects
    initScrollEffects();
    
    // Enhanced dark mode toggle
    initEnhancedDarkModeToggle();
    
    // Navigation animations
    initNavigationAnimations();
    
    // Mobile navigation
    initMobileNavigation();
    
    // Keyboard navigation
    initKeyboardNavigation();
}

function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollY > lastScrollY && scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function initEnhancedDarkModeToggle() {
    const toggle = document.getElementById('scheme-toggle');
    if (!toggle) return;
    
    // Set initial state
    updateToggleState();
    
    // Enhanced click handler
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add transition animation
        toggle.classList.add('transitioning');
        
        // Create ripple effect
        createRippleEffect(e, toggle);
        
        // Toggle theme after animation starts
        setTimeout(() => {
            toggleTheme();
            updateToggleState();
        }, 100);
        
        // Remove transition class
        setTimeout(() => {
            toggle.classList.remove('transitioning');
        }, 600);
    });
    
    // Keyboard support
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
        }
    });
}

function updateToggleState() {
    const toggle = document.getElementById('scheme-toggle');
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
        toggle.classList.add('dark');
        toggle.innerHTML = feather.icons.moon.toSvg();
        toggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        toggle.classList.remove('dark');
        toggle.innerHTML = feather.icons.sun.toSvg();
        toggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('scheme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('scheme', 'dark');
    }
    
    // Trigger winter effects update
    if (window.WinterEffects) {
        window.WinterEffects.updateEffects(!isDark);
    }
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initNavigationAnimations() {
    const menuLinks = document.querySelectorAll('.header nav.menu li a');
    const socialLinks = document.querySelectorAll('.header nav.social a');
    
    // Stagger animation for menu items
    menuLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('nav-item-animate');
    });
    
    // Hover sound effect (optional)
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // You can add a subtle sound effect here
            playHoverSound();
        });
    });
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });
}

function playHoverSound() {
    // Optional: Add a subtle hover sound
    // This would require audio files and user interaction first
    // For now, we'll just add a visual feedback
    return;
}

function initMobileNavigation() {
    // Mobile menu toggle (if needed in future)
    const mobileBreakpoint = 768;
    
    function handleResize() {
        const isMobile = window.innerWidth <= mobileBreakpoint;
        const header = document.querySelector('.header');
        
        if (isMobile) {
            header.classList.add('mobile-nav');
        } else {
            header.classList.remove('mobile-nav');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
}

function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.header nav a, .header nav button');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[prevIndex].focus();
            }
        });
    });
}

// Add CSS for navigation animations
const navAnimationCSS = `
@keyframes nav-item-animate {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.nav-item-animate {
    animation: nav-item-animate 0.5s ease-out forwards;
}

@keyframes ripple-animation {
    from {
        transform: scale(0);
        opacity: 1;
    }
    to {
        transform: scale(1);
        opacity: 0;
    }
}

.mobile-nav .header nav.menu ul {
    flex-direction: column;
    gap: 0.5rem;
}

.mobile-nav .header nav.menu li a {
    width: 100%;
    max-width: 250px;
    text-align: center;
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = navAnimationCSS;
document.head.appendChild(style);

// Export for global use
window.EnhancedNavigation = {
    updateToggleState,
    toggleTheme,
    createRippleEffect
};