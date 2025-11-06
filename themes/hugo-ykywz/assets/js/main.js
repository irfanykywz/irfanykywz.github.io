document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get the raw href value (e.g., "#2-judul-headings")
            const rawHref = this.getAttribute('href');
            
            // 1. Remove the leading '#'
            const id = rawHref.substring(1); 
            
            // 2. Escape the ID and re-add the '#' for the selector
            const validSelector = '#' + CSS.escape(id);
            
            // Use the valid selector to find the element
            const target = document.querySelector(validSelector);
            
            if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            }
        });
    });

  // Add scroll effect to navigation
  // let lastScrollTop = 0;
  // const header = document.querySelector('.header');
  
  // window.addEventListener('scroll', function() {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
  //   if (scrollTop > lastScrollTop && scrollTop > 100) {
  //     // Scrolling down
  //     header.style.transform = 'translateY(-100%)';
  //   } else {
  //     // Scrolling up
  //     header.style.transform = 'translateY(0)';
  //   }
    
  //   lastScrollTop = scrollTop;
  // });

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  // Select the bottom navigation bar
  const bottomNav = document.querySelector('.bottom-nav');
  // Define the threshold (how far to scroll before hiding)
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // check bottomNav first exist or not
      if (!bottomNav) {
          return; // Exit if bottomNav does not exist
      }
      
      
      if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
          // Scrolling down, hide the navigation
          bottomNav.classList.add('hide');
      } else {
          // Scrolling up or near the top, show the navigation
          bottomNav.classList.remove('hide');
      }
      
      lastScrollTop = scrollTop;
  });  


  console.log('Muhamad Irfan\'s portfolio initialized successfully!');
});

// // Utility functions
// function debounce(func, wait) {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }

// // Add resize handler for responsive adjustments
// window.addEventListener('resize', debounce(() => {
//   // Recalculate any dynamic layouts if needed
//   console.log('Window resized');
// }, 250));

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

// Offcanvas
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.getElementsByClassName('toggleOffcanvasBtn');
    const closeBtn = document.getElementById('closeOffcanvasBtn');
    const menu = document.getElementById('offcanvasMenu');
    const backdrop = document.getElementById('offcanvasBackdrop');

    // A reference to the button that opened the offcanvas (important for focus management)
    let lastToggleBtn = null;

    // Fungsi untuk menampilkan/menyembunyikan offcanvas
    function toggleOffcanvas(event) {
        const isShown = menu.classList.contains('show');
        
        menu.classList.toggle('show', !isShown);
        backdrop.classList.toggle('show', !isShown);

        // Mengatur fokus ke elemen yang sesuai
        if (!isShown) {
            // Save the button that was clicked to open the menu
            // We check event.currentTarget because the event might come from the backdrop or Esc key
            if (event && event.currentTarget && event.currentTarget.classList.contains('toggle-offcanvas-btn')) {
                lastToggleBtn = event.currentTarget;
            }
            menu.focus(); // Fokus ke menu saat ditampilkan (untuk aksesibilitas)
        } else {
            // Check if we have a saved button to focus on, otherwise, focus on the close button or body
            if (lastToggleBtn) {
                lastToggleBtn.focus(); // Kembali fokus ke tombol yang membuka offcanvas
                lastToggleBtn = null; // Clear the reference
            } else if (closeBtn) {
                 // Fallback if the menu was closed by backdrop/escape and lastToggleBtn wasn't set
                 closeBtn.focus();
            }
        }
    }

    // 2. **Changed:** Loop through all buttons with the class and attach the event listener
    for (let i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].addEventListener('click', toggleOffcanvas);
    }
    
    // Event listener untuk tombol dan backdrop
    // check element first before addevent
    if (closeBtn) {    
        closeBtn.addEventListener('click', toggleOffcanvas);
    }

    if (backdrop) {
        backdrop.addEventListener('click', toggleOffcanvas);
    }
    
    // Tambahan: Tutup dengan tombol ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menu.classList.contains('show')) {
            // Call toggleOffcanvas without an event object for Escape key
            toggleOffcanvas();
        }
    });
});