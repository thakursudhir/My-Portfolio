/* Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});*/

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('nav');

// Toggle menu & icon rotation
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuToggle.classList.remove('active');
  });
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  navLinks.classList.remove('show');
  menuToggle.classList.remove('active');

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// Close menu on scroll
window.addEventListener('scroll', () => {
  navLinks.classList.remove('show');
});


// Typing effect
const typingText = document.querySelector('.typing-text');
const words = ["IT Operation Engineer","Linux System Administrator", "Windows Administrator", "Web Developer", "Database Administrator", "Tech Enthusiast"];
let i = 0, j = 0, currentWord = '', isDeleting = false;

function type() {
  currentWord = words[i];
  typingText.textContent = currentWord.substring(0, j);

  if (!isDeleting && j < currentWord.length) {
    j++;
    setTimeout(type, 150);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(type, 100);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % words.length;
    setTimeout(type, 800);
  }
}
type();

// Smooth scroll active link
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (scrollY >= sectionTop) current = sec.getAttribute("id");
  });

  navItems.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// Contact form (demo)
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.textContent = "✅ Message sent successfully! (Demo)";
  contactForm.reset();
});

//Skills bar transitions
const progressBars = document.querySelectorAll(".progress-fill");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.width = bar.getAttribute("data-fill");
        }, index * 300); // 300ms delay per bar
      });
    } else {
      progressBars.forEach(bar => {
        bar.style.width = "0"; // reset when hidden
      });
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
  observer.observe(bar);
});


