// Mobile menu functionality
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
}

menuToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking on a lesson link (mobile)
const lessonLinks = document.querySelectorAll('.lesson-link');
lessonLinks.forEach(link => {
      link.addEventListener('click', (e) => {
      if (window.innerWidth < 768) {
            closeSidebar();
      }
      });
});

// Table of contents active link functionality
const tocLinks = document.querySelectorAll('.toc-link');
const sections = document.querySelectorAll('h2[id]');

function updateActiveLink() {
      let currentSection = '';

      sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
            currentSection = section.id;
      }
      });

      tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
      }
      });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// Handle window resize
window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
      closeSidebar();
      }
});

// Smooth scroll for TOC links
tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
            const headerHeight = 64;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
            });
      }
      });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
      closeSidebar();
      }
});

// Initialize
updateActiveLink();