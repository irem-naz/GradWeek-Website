// Number of floating seed elements to create and animate
const NUM_SEEDS = 20;

// Path to the image file used for the seed graphic
const seedSrc = "img/flying_seed.png";

// Loop to generate and customize each seed
for (let i = 0; i < NUM_SEEDS; i++) {
    // Create a new image element to represent the seed
    const img = document.createElement("img");
    img.src = seedSrc;
    img.className = "floating-seed";

    // Randomize appearance and motion for natural variation
    const scale = 0.3 + Math.random() * 0.2;           // Size of the seed
    const rot = Math.floor(Math.random() * 360);       // Initial rotation angle
    const top = Math.random() * 100;                   // Vertical position (vh)
    const left = Math.random() * 100;                  // Horizontal position (vw)
    const driftX = `${-60 + Math.random() * 120}px`;   // Horizontal drift animation offset
    const driftY = `${-60 + Math.random() * 120}px`;   // Vertical drift animation offset
    const driftR = `${-30 + Math.random() * 60}deg`;   // Rotation drift
    const opacity = 0.4 + Math.random() * 0.4;         // Seed transparency

    // Set initial position, transform, and animation variables using CSS custom properties
    img.style.top = `${top}vh`;
    img.style.left = `${left}vw`;
    img.style.transform = `scale(${scale}) rotate(${rot}deg)`;
    img.style.setProperty('--x', driftX);
    img.style.setProperty('--y', driftY);
    img.style.setProperty('--r', driftR);
    img.style.setProperty('--opacity', opacity);

    // Store original transform for animation reset
    img.dataset.originalTransform = img.style.transform;
    img.dataset.scale = scale;
    img.dataset.r = `${rot}deg`;

    // Add the seed to the container on the page
    document.querySelector(".seed-container").appendChild(img);
}

// Interactivity: respond to mouse movements
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll('.floating-seed').forEach(seed => {
        // Get the current position of the seed on the screen
        const rect = seed.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - e.clientX;  // X distance from cursor to seed center
        const dy = rect.top + rect.height / 2 - e.clientY;  // Y distance from cursor to seed center
        const dist = Math.hypot(dx, dy);                    // Euclidean distance

        // If the cursor is near the seed, make it move away
        if (dist < 100) {
            const pushX = dx * 0.5;  // X-direction push
            const pushY = dy * 0.5;  // Y-direction push

            // Temporarily stop floating animation and apply "pushed" transform
            seed.style.animation = 'none';
            seed.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${seed.dataset.r}) scale(${seed.dataset.scale})`;

            // Restore the original floating motion after 1.5 seconds
            clearTimeout(seed._driftTimeout);
            seed._driftTimeout = setTimeout(() => {
                seed.style.animation = '';
                seed.style.transform = seed.dataset.originalTransform;
            }, 1500);
        }
    });
});
