// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
const header     = document.getElementById('mainHeader');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('show');
  menuToggle.classList.toggle('active', isOpen);
  // Prevent body scroll when menu open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when any nav link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu on scroll
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768 && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Keyboard a11y
menuToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); menuToggle.click(); }
});

// ============================================
// HEADER SHADOW ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});
if (window.scrollY > 50) header.classList.add('scrolled');

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}, { passive: true });

// ============================================
// TYPING EFFECT
// ============================================
const typingEl = document.querySelector('.typing-text');
const words = [
  'Linux Administrator',
  'IT Operations Engineer',
  'Windows Administrator',
  'Web Developer',
  'DevOps Engineer',
  'Cloude Engineer',
  'Software Engineer',
  'Database Administrator'
  
];
let wi = 0, ci = 0, deleting = false;

function type() {
  const word = words[wi];
  typingEl.textContent = deleting
    ? word.substring(0, ci--)
    : word.substring(0, ci++);

  if (!deleting && ci > word.length)  { deleting = true; setTimeout(type, 1400); return; }
  if ( deleting && ci < 0)            { deleting = false; wi = (wi+1) % words.length; setTimeout(type, 500); return; }
  setTimeout(type, deleting ? 80 : 140);
}
type();

// ============================================
// SKILLS PROGRESS BARS
// ============================================
const progressBars   = document.querySelectorAll('.progress-fill');
const skillsSection  = document.getElementById('skills');

if (skillsSection) {
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      progressBars.forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.getAttribute('data-fill'); }, i * 120);
      });
      obs.unobserve(skillsSection);
    }
  }, { threshold: 0.25 }).observe(skillsSection);
}

// ============================================
// EDUCATION SLIDESHOW
// ============================================
const slides  = document.querySelectorAll('.slide:not(.slide-controls)');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let current = 0, autoTimer;

function showSlide(idx) {
  slides.forEach(s => s.classList.remove('active'));
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  // Update dots if they exist
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function startAuto() { autoTimer = setInterval(() => showSlide(current + 1), 5000); }
function resetAuto()  { clearInterval(autoTimer); startAuto(); }

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => { showSlide(current + 1); resetAuto(); });
  prevBtn.addEventListener('click', () => { showSlide(current - 1); resetAuto(); });
  startAuto();
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      formMessage.textContent = '⚠️ Please fill in all fields!';
      formMessage.className = 'error'; return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMessage.textContent = '⚠️ Please enter a valid email!';
      formMessage.className = 'error'; return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      formMessage.innerHTML = `✅ Thank you, ${name}! Your message has been sent.`;
      formMessage.className = 'success';
      contactForm.reset();
      btn.innerHTML = orig; btn.disabled = false;
      setTimeout(() => { formMessage.textContent = ''; formMessage.className = ''; }, 5000);
    }, 1500);
  });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { obs.unobserve(en.target); } });
    });
    document.querySelectorAll('img[loading="lazy"]').forEach(img => io.observe(img));
  }
});

console.log('%c🚀 Portfolio by Sudhir Thakur', 'color:#38bdf8;font-size:18px;font-weight:bold;');
