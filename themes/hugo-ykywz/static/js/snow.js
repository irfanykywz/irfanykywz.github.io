/**
 * Standalone Snowfall Effect Script
 * Author: Refactored by Gemini AI (Original concept: rainbow.arch.scriptmania.com)
 *
 * To use:
 * 1. Save this code as 'snow.js'.
 * 2. Add <script src="snow.js"></script> just before your closing </body> tag.
 */

(function() {
    "use strict";

    // --- Configuration ---
    const config = {
        SNOW_MAX: 40, // Max number of snowflakes (Original: 10)
        SNOW_COLORS: ["#aaaacc", "#ddddff", "#ccccdd", "#f3f3f3", "#f0ffff"],
        SNOW_TYPES: ["Times New Roman", "Arial", "Verdana", "Courier New"],
        SNOW_LETTER: "*",
        SINK_SPEED: 0.2,
        MAX_SIZE: 30,
        MIN_SIZE: 8,
        SNOWING_ZONE: 1, // 1: all, 2: left, 3: center, 4: right
    };

    // --- Variables ---
    const snowflakes = [];
    let animationFrameId = null;

    // --- Helper Functions ---

    /** Get a random integer between 0 and range-1. */
    const random = (range) => Math.floor(range * Math.random());

    /** Get the current viewport width minus a small padding. */
    const getMarginRight = () => window.innerWidth - 15;

    /**
     * Calculates the starting X position based on the snowing zone.
     * @param {number} size - The size of the snowflake.
     * @returns {number} The X coordinate.
     */
    function getStartX(size) {
        const marginright = getMarginRight();
        const halfWidth = marginright / 2;
        const maxOffset = marginright - size;

        switch (config.SNOWING_ZONE) {
            case 2: // Left
                return random(halfWidth - size);
            case 3: // Center
                return random(halfWidth - size) + marginright / 4;
            case 4: // Right
                return random(halfWidth - size) + halfWidth;
            case 1: // All Over
            default:
                return random(maxOffset);
        }
    }

    /**
     * Initializes all snowflakes and starts the animation loop.
     */
    function initSnow() {
        const sizeRange = config.MAX_SIZE - config.MIN_SIZE;
        const body = document.body;

        // 1. Inject a simple style block for the base snowflake appearance
        const style = document.createElement('style');
        style.textContent = `
            .snowflake {
                position: fixed;
                pointer-events: none;
                user-select: none;
                opacity: 0.8;
                z-index: 9999;
                /* Optimize for performance */
                will-change: transform, left, top;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);


        // 2. Create and initialize snowflake elements
        for (let i = 0; i < config.SNOW_MAX; i++) {
            const size = random(sizeRange) + config.MIN_SIZE;
            const posx = getStartX(size);
            const posy = random(window.innerHeight) - size; // Start from top, can be slightly off-screen

            // Create the DOM element
            const snowflakeEl = document.createElement('span');
            snowflakeEl.className = 'snowflake';
            snowflakeEl.textContent = config.SNOW_LETTER;

            // Apply initial dynamic styles
            snowflakeEl.style.fontSize = `${size}px`;
            snowflakeEl.style.fontFamily = config.SNOW_TYPES[random(config.SNOW_TYPES.length)];
            snowflakeEl.style.color = config.SNOW_COLORS[random(config.SNOW_COLORS.length)];
            snowflakeEl.style.left = `${posx}px`;
            snowflakeEl.style.top = `${posy}px`;

            // Store dynamic properties in a simple object
            snowflakes.push({
                el: snowflakeEl,
                size: size,
                posx: posx,
                posy: posy,
                crds: 0, // Sine wave angle
                lftrght: Math.random() * 15, // Horizontal drift amplitude
                x_mv: 0.03 + Math.random() / 10, // Horizontal movement speed
                sink: config.SINK_SPEED * size / 5, // Vertical movement speed
            });

            body.appendChild(snowflakeEl);
        }

        // 3. Start the animation loop
        moveSnow();
    }

    /**
     * Animation loop using requestAnimationFrame for smoother motion.
     */
    function moveSnow() {
        const marginbottom = window.innerHeight;
        const marginright = getMarginRight();

        for (const flake of snowflakes) {
            flake.crds += flake.x_mv;
            flake.posy += flake.sink;

            // Calculate new position (vertical fall + horizontal sine wave drift)
            const newX = flake.posx + flake.lftrght * Math.sin(flake.crds);
            const newY = flake.posy;

            // Apply new position using transform for better performance
            flake.el.style.transform = `translate(${newX}px, ${newY}px)`;

            // Check if it has fallen off the screen
            if (newY >= marginbottom - 2 * flake.size || newX > marginright - 3 * flake.lftrght) {
                // Reset to the top with a new random X position
                flake.posx = getStartX(flake.size);
                flake.posy = -flake.size;
            }
        }

        animationFrameId = requestAnimationFrame(moveSnow);
    }

    // --- Execution ---

    // Start the whole thing when the DOM is ready to ensure the body exists
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSnow);
    } else {
        initSnow();
    }

    // Handle window resize for dynamic boundaries
    window.addEventListener('resize', () => {
        // No need to clear snowflakes, the animation loop will use the new window.innerHeight/innerWidth
        // on the next frame.
    });
})();