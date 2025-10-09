/**
 * Standalone Halloween Snowfall Effect Script (Full Coverage)
 * FIX: Corrected initial positioning to ensure items show up on screen.
 */

(function() {
    "use strict";

    // --- Configuration (Adjust these values) ---
    const config = {
        MAX_ITEMS: 1, // Total number of items on the screen (more is heavier on CPU)
        EMOJIS: ['🎃'],
        MIN_SIZE_PX: 10,
        MAX_SIZE_PX: 20,
        SINK_SPEED: 0.8, // Base vertical speed (0.1 is slow, 1.0 is fast)
        HORIZONTAL_DRIFT: 15, // Max horizontal sine wave amplitude in pixels
    };

    // --- Variables ---
    const items = [];
    let animationFrameId = null;

    // --- Helper Functions ---
    const random = (min, max) => Math.random() * (max - min) + min;
    const randomInt = (max) => Math.floor(Math.random() * max);

    // Use window.innerWidth, but account for potential scrollbar width
    const getViewportWidth = () => window.innerWidth - 15; 

    /**
     * Calculates the starting X position across the full width of the viewport.
     */
    function getStartX(size) {
        // Use the entire available width for placement
        const maxOffset = getViewportWidth() - size;
        return random(0, maxOffset);
    }

    /**
     * Initializes all falling items (emojis) and prepares their physics.
     */
    function initFallingItems() {
        // Inject base CSS style for performance
        const style = document.createElement('style');
        style.textContent = `
            .halloween-item {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                opacity: 0.4;
                pointer-events: none;
                user-select: none;
                z-index: 9999;
                /* Optimize for performance (using transform) */
                will-change: transform;  
            }
        `;
        document.head.appendChild(style);

        // Create item elements and set initial state
        for (let i = 0; i < config.MAX_ITEMS; i++) {
            const size = random(config.MIN_SIZE_PX, config.MAX_SIZE_PX);
            const posx = getStartX(size);
            
            // *** FIX 1: Corrected initial Y position (posy) ***
            // Scatter the items within the first viewport height, 
            // starting from one screen height *above* the visible area.
            // This ensures the entire screen fills up quickly and naturally.
            const posy = random(-window.innerHeight, window.innerHeight); 

            const itemEl = document.createElement('span');
            itemEl.className = 'halloween-item';
            itemEl.textContent = config.EMOJIS[randomInt(config.EMOJIS.length)];

            // Apply styles
            itemEl.style.fontSize = `${size}px`;
            itemEl.style.color = 'inherit';
            itemEl.style.textShadow = '1px 1px 3px rgba(0,0,0,0.5)';

            // Store dynamic properties
            items.push({
                el: itemEl,
                size: size,
                posx: posx,
                posy: posy,
                crds: random(0, 100),
                lftrght: random(5, config.HORIZONTAL_DRIFT),
                x_mv: random(0.01, 0.05),
                sink: config.SINK_SPEED * size / 10,
            });

            document.body.appendChild(itemEl);
        }

        // Start the animation loop
        moveItems();
    }

    /**
     * Animation loop using requestAnimationFrame.
     */
    function moveItems() {
        const viewportHeight = window.innerHeight;
        const viewportWidth = getViewportWidth();

        for (const item of items) {
            item.crds += item.x_mv;
            item.posy += item.sink;

            // Calculate new position (vertical fall + horizontal sine wave drift)
            const newX = item.posx + item.lftrght * Math.sin(item.crds);
            const newY = item.posy;

            // Apply new position using transform (using posx and posy as translation)
            // *** FIX 2: Ensure transform is applied correctly for initial positions ***
            item.el.style.transform = `translate(${newX}px, ${newY}px)`;

            // Check if it has fallen below the viewport
            if (newY >= viewportHeight || newX > viewportWidth - item.size) {
                // Reset to the top with a new random X position across the entire width
                item.posx = getStartX(item.size);
                item.posy = -item.size; // Start slightly above the top
            }
        }

        animationFrameId = requestAnimationFrame(moveItems);
    }

    // --- Initialization ---

    function initialize() {
        if (document.body) {
            initFallingItems();
        } else {
            document.addEventListener('DOMContentLoaded', initialize);
        }
    }

    // Start the initialization process
    initialize();
})();