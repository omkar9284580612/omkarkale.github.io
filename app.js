/* ===================================================
   OMKAR KALE — PREMIUM PORTFOLIO JAVASCRIPT
   Vanilla JS — Modular, Performance-Optimized
=================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticles();
  initNeuralNetwork();
  initMouseGlow();
  initNavbar();
  initTypingAnimation();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initContactForm();
  initBackToTop();
});

/* ===================================================
   1. LOADING SCREEN
=================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1200);
  });
}

/* ===================================================
   2. FLOATING PARTICLES BACKGROUND (Canvas)
=================================================== */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(80, Math.floor((width * height) / 18000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        color: Math.random() > 0.5 ? '0, 212, 255' : '177, 75, 255',
        opacity: Math.random() * 0.5 + 0.15
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

/* ===================================================
   3. FLOATING NEURAL NETWORK NODES (Hero)
=================================================== */
function initNeuralNetwork() {
  const container = document.getElementById('neuralNetwork');
  const nodeCount = 18;

  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement('div');
    node.className = 'neural-node' + (Math.random() > 0.5 ? ' purple' : '');
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 100}%`;
    node.style.animationDelay = `${Math.random() * 8}s`;
    node.style.animationDuration = `${6 + Math.random() * 6}s`;
    container.appendChild(node);
  }
}

/* ===================================================
   4. MOUSE-FOLLOWING GLOW EFFECT
=================================================== */
function initMouseGlow() {
  const glow = document.getElementById('mouseGlow');
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    // Smooth easing toward the mouse position
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* ===================================================
   5. NAVBAR — SCROLL STATE, MOBILE MENU, ACTIVE LINKS
=================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click + smooth scroll
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Highlight active section link
  function updateActiveLink() {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  updateActiveLink();
}

/* ===================================================
   6. TYPING ANIMATION — HERO ROLES
=================================================== */
function initTypingAnimation() {
  const typingText = document.getElementById('typingText');
  const roles = [
    'Data Scientist',
    'Machine Learning Engineer',
    'AI Enthusiast',
    'Python Developer',
    'Future AI Entrepreneur'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 80;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER_TYPE = 1800;
  const PAUSE_AFTER_DELETE = 400;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(type, TYPE_SPEED);
    } else {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(type, DELETE_SPEED);
    }
  }

  type();
}

/* ===================================================
   7. SCROLL REVEAL ANIMATIONS (Intersection Observer)
=================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));

  // Hero reveals trigger immediately on load
  document.querySelectorAll('.hero .reveal').forEach((el) => {
    requestAnimationFrame(() => el.classList.add('visible'));
  });
}

/* ===================================================
   8. ANIMATED COUNTERS (Statistics)
=================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString() + '+';
      }
    }

    requestAnimationFrame(update);
  }
}

/* ===================================================
   9. SKILL PROGRESS BAR ANIMATIONS
=================================================== */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        // Slight delay for staggered effect within a card
        requestAnimationFrame(() => {
          fill.style.width = `${width}%`;
        });
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach((fill) => observer.observe(fill));
}

/* ===================================================
   10. CONTACT FORM HANDLING
=================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic client-side validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#ff4ecd';
      } else {
        input.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate successful submission
    successMsg.classList.add('visible');
    form.reset();

    setTimeout(() => {
      successMsg.classList.remove('visible');
    }, 5000);
  });
}

/* ===================================================
   11. BACK TO TOP BUTTON
=================================================== */
function initBackToTop() {
  const button = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    button.classList.toggle('visible', window.scrollY > 400);
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
