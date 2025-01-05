// Navbar Hide

// const navbar = document.querySelector('.navbar');
// let lastScrollTop = 0;

// window.addEventListener('scroll', () => {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//   if (scrollTop > lastScrollTop) {
//     navbar.classList.add('hide');
//   } else {
//     navbar.classList.remove('hide');
//   }

//   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
// });

// const hamburger = document.querySelector('.hamburger');
// const menu = document.querySelector('.menu');

// hamburger.addEventListener('click', () => {
//   menu.classList.toggle('show');
// });

// End Navbar Hide
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const sidebar = document.querySelector('.sidebar');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  let lastScrollY = window.scrollY;

  // Menyembunyikan atau menampilkan navbar berdasarkan arah scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      header.classList.add('hide'); // Hide navbar
    } else {
      header.classList.remove('hide'); // Show navbar
    }
    lastScrollY = window.scrollY;
  });

  // Membuka sidebar saat hamburger menu diklik
  hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebar.classList.remove('close');
  });

  // Menutup sidebar saat item menu diklik
  sidebar.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.tagName === 'LI') {
      sidebar.classList.add('close');
      sidebar.classList.remove('open');
    }
  });

  // Menutup sidebar jika klik di luar sidebar
  document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      sidebar.classList.add('close');
      sidebar.classList.remove('open');
    }
  });
});


function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
  setTimeout(() => {
    sidebar.style.transform = 'translateX(0)';
  }, 10); // Memberikan waktu untuk transisi
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.transform = 'translateX(100%)';
  setTimeout(() => {
    sidebar.style.display = 'none';
  }, 750); // Waktu sama dengan durasi transisi CSS
}


// Navbar Finish
// function showSidebar(){
//   const sidebar = document.querySelector('.sidebar')
//   sidebar.style.display = 'flex'
// }

// function closeSidebar(){
//   const sidebar = document.querySelector('.sidebar')
//   sidebar.style.display = 'none'
// }

// END Navbar

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Hapus active class dari semua tab
    tabs.forEach(t => t.classList.remove('active'));
    // Tambahkan active class ke tab yang diklik
    tab.classList.add('active');

    // Sembunyikan semua content
    contents.forEach(content => content.classList.remove('active'));
    // Tampilkan content yang sesuai dengan tab yang diklik
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

  // JavaScript to handle full-screen viewing
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

// Mendapatkan jarak antara dua titik
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

let mouseX = window.innerWidth / 2; // Posisi awal mouse (tengah layar)
let mouseY = window.innerHeight / 2;
let targetX = mouseX; // Target posisi mouse
let targetY = mouseY;

// Update posisi mouse berdasarkan gerakan dengan delay
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

// Animasi smooth untuk efek grid
function animate() {
    // Lerping posisi mouse untuk smooth movement
    mouseX += (targetX - mouseX) * 0.7; // Kecepatan interpolasi (0.1 = 10%)
    mouseY += (targetY - mouseY) * 0.7;

    // Perbarui efek pada grid
    cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const cellX = rect.left + rect.width / 2;
        const cellY = rect.top + rect.height / 2;

        const distance = getDistance(mouseX, mouseY, cellX, cellY);
        const maxDistance = 130; // Jarak maksimum untuk efek terang
        const intensity = Math.max(0, 1 - distance / maxDistance);

        cell.style.borderColor = `rgba(190, 190, 190, ${0.03 + intensity * 0.17})`;
    });

    requestAnimationFrame(animate); // Memastikan animasi tetap berjalan
}

animate(); // Mulai animasi