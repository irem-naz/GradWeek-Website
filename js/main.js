const NUM_SEEDS = 20;
const seedSrc = "img/flying_seed.png";

for (let i = 0; i < NUM_SEEDS; i++) {
    const img = document.createElement("img");
    img.src = seedSrc;
    img.className = "floating-seed";
  
    const scale = 0.3 + Math.random() * 0.2;
    const rot = Math.floor(Math.random() * 360);
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const driftX = `${-60 + Math.random() * 120}px`;
    const driftY = `${-60 + Math.random() * 120}px`;
    const driftR = `${-30 + Math.random() * 60}deg`;
    const opacity = 0.4 + Math.random() * 0.4;
  
    img.style.top = `${top}vh`;
    img.style.left = `${left}vw`;
    img.style.transform = `scale(${scale}) rotate(${rot}deg)`;
    img.style.setProperty('--x', driftX);
    img.style.setProperty('--y', driftY);
    img.style.setProperty('--r', driftR);
    img.style.setProperty('--opacity', opacity);
  
    document.querySelector(".seed-container").appendChild(img);

  }
  

  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll('.floating-seed').forEach(seed => {
      const rect = seed.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - e.clientX;
      const dy = rect.top + rect.height / 2 - e.clientY;
      const dist = Math.hypot(dx, dy);
  
      if (dist < 100) {
        const pushX = dx * 0.5;
        const pushY = dy * 0.5;
  
        seed.style.animation = 'none'; // stop drift
        seed.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${seed.dataset.r}) scale(${seed.dataset.scale})`;
  
        // Restore drift after 1.5s
        clearTimeout(seed._driftTimeout);
        seed._driftTimeout = setTimeout(() => {
          seed.style.animation = '';
          seed.style.transform = seed.dataset.originalTransform;
        }, 1500);
      }
    });
  });
  
  
  
  
  