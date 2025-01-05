// Navbar
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    let lastScrollY = window.scrollY;
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > lastScrollY) {
        header.classList.add('hide'); // Hide navbar
      } else {
        header.classList.remove('hide'); // Show navbar
      }
      lastScrollY = window.scrollY;

       if (sidebar.classList.contains('open')) {
        closeSidebar();
       }
    });
  
    // Buka sidebar saat hamburger menu diklik
    hamburgerMenu.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebar.classList.remove('close');
    });
  
    // Tutup sidebar saat item menu diklik
    hamburgerMenu.addEventListener('click', () => {
        showSidebar();
      });
  
    // Tutup sidebar jika klik di luar sidebar
    sidebar.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
          closeSidebar();
        }
      });

      // Tutup sidebar jika klik di luar sidebar
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        closeSidebar();
        }
    });
  });
  
  
  function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
    setTimeout(() => {
      sidebar.style.transform = 'translateX(0)';
    }, 10); 
  }
  
  function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(100%)';
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, 750);
  }
  
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
  
      contents.forEach(content => content.classList.remove('active'));
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  // END Navbar

  // Effect H1

  document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const texts = [
      "Hello, I’am",
      "Hello 👋 , I’am",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = texts[textIndex];
      const displayText = isDeleting
        ? currentText.substring(0, charIndex--)
        : currentText.substring(0, charIndex++);

      typewriter.textContent = displayText;

      if (!isDeleting && charIndex === currentText.length) {
        // Pause before deleting
        setTimeout(() => (isDeleting = true), 1000);
      } else if (isDeleting && charIndex === 0) {
        // Move to the next text
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      // Set typing speed
      const typingSpeed = isDeleting ? 200 : 200;
      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  });

  // End Effect H1

    // Membuka img dengan skala yg lebih besar
  document.querySelectorAll('.overlay-container img').forEach(img => {
  img.addEventListener('click', () => {
    const fullScreenOverlay = document.createElement('div');
    fullScreenOverlay.style.position = 'fixed';
    fullScreenOverlay.style.top = '0';
    fullScreenOverlay.style.left = '0';
    fullScreenOverlay.style.width = '100%';
    fullScreenOverlay.style.height = '100%';
    fullScreenOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    fullScreenOverlay.style.display = 'flex';
    fullScreenOverlay.style.justifyContent = 'center';
    fullScreenOverlay.style.alignItems = 'center';
    fullScreenOverlay.style.zIndex = '1000';
  
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = img.src;
    fullScreenImage.style.maxWidth = '90%';
    fullScreenImage.style.maxHeight = '90%';
    fullScreenImage.style.borderRadius = '10px';
  
    fullScreenOverlay.appendChild(fullScreenImage);
    document.body.appendChild(fullScreenOverlay);
  
    fullScreenOverlay.addEventListener('click', () => {
      document.body.removeChild(fullScreenOverlay);
    });
  });
  });
  
  // mouse
  const grid = document.querySelector('.grid');
  const columns = 50;
  const rows = 50;
  
  // Membuat kotak-kotak grid
  const cells = [];
  for (let i = 0; i < columns * rows; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      grid.appendChild(cell);
      cells.push(cell);
  }
  
  function getDistance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  let mouseX = window.innerWidth / 2; 
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX; 
  let targetY = mouseY;
  
  document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
  });
  
  // Animasi smooth untuk efek grid
  function animate() {
      mouseX += (targetX - mouseX) * 0.7; 
      mouseY += (targetY - mouseY) * 0.7;
  
      cells.forEach((cell) => {
          const rect = cell.getBoundingClientRect();
          const cellX = rect.left + rect.width / 2;
          const cellY = rect.top + rect.height / 2;
  
          const distance = getDistance(mouseX, mouseY, cellX, cellY);
          const maxDistance = 150;
          const intensity = Math.max(0, 1 - distance / maxDistance);
  
          cell.style.borderColor = `rgb(233, 233, 233, ${0.03 + intensity * 0.17})`;
      });
  
      requestAnimationFrame(animate);
  }
  
  animate();
