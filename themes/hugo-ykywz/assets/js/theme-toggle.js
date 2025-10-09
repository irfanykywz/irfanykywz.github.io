// Immediately invoked function to prevent FOUC
(function() {
    // Check saved theme preference first
    const savedTheme = localStorage.getItem('theme');
    // Fall back to system preference if no saved preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme !== null ?
        savedTheme :
        (systemPrefersDark ? 'dark' : 'dark');

    // Apply theme before page renders
    if (initialTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Make page visible
    document.documentElement.classList.add('show');
})();

// Wait for DOM to be ready before setting up event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set up theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Check if elements exist before adding event listeners
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update button icon
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });

        // Initialize button state
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (currentTheme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    // Listen for system preference changes (optional)
    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    //     if (!localStorage.getItem('theme')) { // Only if no explicit preference set
    //         const newTheme = e.matches ? 'dark' : 'light';
    //         document.documentElement.setAttribute('data-theme', newTheme);
    //     }
    // });
});