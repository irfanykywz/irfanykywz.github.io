// Enhanced Main JavaScript with Winter Effects Integration

document.addEventListener("DOMContentLoaded", function(){
  // Initialize all components
  initThemeToggle();
  initWinterEffects();
  initSmoothScrolling();
  initLazyLoading();
  initAnimations();
});

function initThemeToggle() {
  var toggle = document.getElementById("scheme-toggle");
  if (!toggle) return;

  var scheme = "light";
  var savedScheme = localStorage.getItem("scheme");
  var container = document.getElementsByTagName("html")[0];
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Determine initial scheme
  if (prefersDark) {
    scheme = "dark";
  }

  if(savedScheme) {
    scheme = savedScheme;
  }

  // Apply initial scheme
  if(scheme == "dark") {
    darkscheme(toggle, container);
  } else {
    lightscheme(toggle, container);
  }

  // Add click handler with enhanced animation
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Add transition animation
    toggle.classList.add('transitioning');
    
    // Create ripple effect
    createRippleEffect(e, toggle);
    
    // Toggle theme
    if (toggle.className.includes("light")) {
      darkscheme(toggle, container);
    } else if (toggle.className.includes("dark")) {
      lightscheme(toggle, container);
    }
    
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

function darkscheme(toggle, container) {
  localStorage.setItem("scheme", "dark");
  toggle.innerHTML = feather.icons.moon.toSvg();
  toggle.className = "dark";
  container.className = "dark";
  
  // Update winter effects for dark mode
  if (window.WinterEffects) {
    window.WinterEffects.updateEffects(true);
  }
}

function lightscheme(toggle, container) {
  localStorage.setItem("scheme", "light");
  toggle.innerHTML = feather.icons.sun.toSvg();
  toggle.className = "light";
  container.className = "";
  
  // Update winter effects for light mode
  if (window.WinterEffects) {
    window.WinterEffects.updateEffects(false);
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
    z-index: 1000;
  `;
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

function initWinterEffects() {
  // Initialize winter effects if available
  if (window.WinterEffects) {
    const isDark = document.documentElement.classList.contains('dark');
    window.WinterEffects.updateEffects(isDark);
  }
}

function initSmoothScrolling() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initLazyLoading() {
  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

function initAnimations() {
  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.post-card, .portfolio-card, .hero, .about-section').forEach(el => {
      animationObserver.observe(el);
    });
  }
}

// Add CSS for animations
const animationCSS = `
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

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transitioning {
  animation: toggle-spin 0.6s ease-in-out;
}

@keyframes toggle-spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Export for global use
window.MainJS = {
  createRippleEffect,
  initWinterEffects
};