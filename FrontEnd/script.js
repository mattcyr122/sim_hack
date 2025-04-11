// script.js

// Placeholder for any future interactivity
document.addEventListener("DOMContentLoaded", () => {
    console.log("Wishlist site loaded.");
  
    // Add JS-based functionality here in the future
  });
  
  // Snowfall Effect
document.addEventListener("DOMContentLoaded", () => {
    const snowContainer = document.querySelector('.snowfall');
  
    function createSnowflake() {
      const flake = document.createElement("div");
      flake.classList.add("snowflake");
  
      const size = Math.random() * 8 + 2;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
  
      flake.style.left = `${Math.random() * window.innerWidth}px`;
      flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      flake.style.opacity = Math.random();
      flake.style.background = "white";
  
      snowContainer.appendChild(flake);
  
      // Remove flake after falling
      setTimeout(() => {
        flake.remove();
      }, 5000);
    }
  
    // Generate snowflakes continuously
    setInterval(createSnowflake, 200);
  });