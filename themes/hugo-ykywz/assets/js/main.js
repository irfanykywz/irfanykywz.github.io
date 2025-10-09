// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

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

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.project-item, .blog-post, .favorite-item, .faq-item, .journal-entry, .tag-item, .popular-tag-card').forEach(el => {
    observer.observe(el);
  });

  // Add hover effects to project cards and skill tags
  document.querySelectorAll('.project-item, .favorite-item, .popular-tag-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add loading states for external links
  document.querySelectorAll('a[href^="http"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.textContent.includes('Demo') || this.textContent.includes('GitHub') || this.textContent.includes('Visit')) {
        // Add loading state for external links
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }
    });
  });

  
  // Skill tag hover effects
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  console.log('Muhamad Irfan\'s portfolio initialized successfully!');
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
  // Recalculate any dynamic layouts if needed
  console.log('Window resized');
}, 250));

// Theme toggle functionality (optional future enhancement)
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
});

// Ofcanvas
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleOffcanvasBtn');
    const closeBtn = document.getElementById('closeOffcanvasBtn');
    const menu = document.getElementById('offcanvasMenu');
    const backdrop = document.getElementById('offcanvasBackdrop');

    // Fungsi untuk menampilkan/menyembunyikan offcanvas
    function toggleOffcanvas() {
        const isShown = menu.classList.contains('show');
        
        menu.classList.toggle('show', !isShown);
        backdrop.classList.toggle('show', !isShown);

        // Mengatur fokus ke elemen yang sesuai
        if (!isShown) {
            menu.focus(); // Fokus ke menu saat ditampilkan (untuk aksesibilitas)
        } else {
            toggleBtn.focus(); // Kembali fokus ke tombol saat ditutup
        }
    }

    // Event listener untuk tombol dan backdrop
    toggleBtn.addEventListener('click', toggleOffcanvas);
    closeBtn.addEventListener('click', toggleOffcanvas);
    backdrop.addEventListener('click', toggleOffcanvas);
    
    // Tambahan: Tutup dengan tombol ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menu.classList.contains('show')) {
            toggleOffcanvas();
        }
    });
});