// ========================================
// Mobile Menu Toggle
// ========================================
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
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Close menu on scroll (only for mobile)
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) {
    navLinks.classList.remove('show');
    menuToggle.classList.remove('active');
  }
});

// Keyboard accessibility for menu toggle
menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    menuToggle.click();
  }
});

// ========================================
// Typing Effect
// ========================================
const typingText = document.querySelector('.typing-text');
const words = [
  "IT Operations Engineer",
  "Linux Administrator",
  "Windows Administrator", 
  "Web Developer",
  "Database Administrator",
  "DevOps Enthusiast"
];
let i = 0, 
    j = 0, 
    currentWord = '', 
    isDeleting = false,
    isTyping = true;

function type() {
  currentWord = words[i];
  
  if (isTyping) {
    typingText.textContent = currentWord.substring(0, j);
    j++;
    
    if (j > currentWord.length) {
      isTyping = false;
      setTimeout(type, 1500); // Pause at full word
    } else {
      setTimeout(type, 150);
    }
  } else {
    typingText.textContent = currentWord.substring(0, j);
    j--;
    
    if (j < 0) {
      isTyping = true;
      i = (i + 1) % words.length;
      setTimeout(type, 500); // Pause before next word
    } else {
      setTimeout(type, 100);
    }
  }
}

// Start typing effect
type();

// ========================================
// Smooth Scroll Active Link
// ========================================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 150;
    const sectionHeight = sec.clientHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = sec.getAttribute("id");
    }
  });

  navItems.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    formMessage.textContent = "⚠️ Please fill in all fields!";
    formMessage.className = "error";
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = "⚠️ Please enter a valid email!";
    formMessage.className = "error";
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual backend/EmailJS)
  setTimeout(() => {
    formMessage.innerHTML = `✅ Thank you, ${name}! Your message has been sent successfully.`;
    formMessage.className = "success";
    contactForm.reset();
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.className = "";
    }, 5000);
  }, 1500);
  
  // For actual email integration with EmailJS, uncomment below:
  /*
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm, 'YOUR_PUBLIC_KEY')
    .then(() => {
      formMessage.innerHTML = `✅ Thank you, ${name}! Your message has been sent successfully.`;
      formMessage.className = "success";
      contactForm.reset();
    })
    .catch((error) => {
      formMessage.textContent = "❌ Failed to send message. Please try again.";
      formMessage.className = "error";
    });
  */
});

// ========================================
// Skills Progress Bar Animation
// ========================================
const progressBars = document.querySelectorAll(".progress-fill");

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate all bars when skills section is visible
      progressBars.forEach((bar, index) => {
        const fillValue = bar.getAttribute("data-fill");
        
        setTimeout(() => {
          bar.style.width = fillValue;
        }, index * 150);
      });
      
      // Unobserve after animation starts (play once)
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe the skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ========================================
// Education Slideshow
// ========================================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// ========================================
// Lazy Loading Images
// ========================================
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// ========================================
// Smooth Scroll Enhancement
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========================================
// Header Background on Page Load
// ========================================
// Check scroll position on page load
if (window.scrollY > 50) {
  navbar.classList.add('scrolled');
}

// ========================================
// Console Info
// ========================================
console.log('%c🎨 Portfolio by Sudhir Thakur', 'color: #38bdf8; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to connect!', 'color: #94a3b8; font-size: 14px;');

// ========================================
// Particles Effect in Hero Section
// ========================================
const heroSection = document.querySelector('.hero');

function createParticles() {
  // Create canvas for particles
  const canvas = document.createElement('canvas');
  canvas.classList.add('particles-canvas');
  canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;';
  
  if (heroSection) {
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
    
    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      };
    }
    
    function initParticles() {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animateParticles);
    }
    
    // Initialize
    resizeCanvas();
    initParticles();
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }
}

// Start particles effect
createParticles();

