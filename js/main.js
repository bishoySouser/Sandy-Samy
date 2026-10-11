/**
 * Saweras Tax & Accounting — Interactive UI Script
 * Cosmic Dark Glassmorphism Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initShowcaseTabs();
  initContactForm();
  initParallaxEffects();
});

/**
 * 1. Navbar Scroll Effect: Adds a subtle blur/border intensification on scroll
 */
function initNavbarScroll() {
  const header = document.querySelector('header.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 2. Mobile Navigation Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('headerNav');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    toggleBtn.innerHTML = isExpanded ? '✕' : '☰';
  });

  // Close menu when clicking any nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = '☰';
    });
  });
}

/**
 * 3. ScrollSpy for Vertical Dock & Top Header Links
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const dockItems = document.querySelectorAll('.dock-item');
  const navLinks = document.querySelectorAll('.header-nav a');

  if (sections.length === 0) return;

  function updateActiveSection() {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (!currentId && window.scrollY < 200) {
      currentId = 'home';
    }

    if (currentId) {
      dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();
}

/**
 * 4. Showcase Tabs Switcher
 */
function initShowcaseTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.deck-card');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/**
 * 5. Interactive Contact Form with Validation & Feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#clientName').value.trim();
    const phone = form.querySelector('#clientPhone').value.trim();
    const service = form.querySelector('#clientService').value;
    const message = form.querySelector('#clientMessage').value.trim();

    if (!name || !phone) {
      showAlert('يرجى كتابة الاسم ورقم الهاتف أو الإيميل للتواصل معك.', 'error');
      return;
    }

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>جاري الإرسال...</span>';
    submitBtn.disabled = true;

    // Simulate sending with nice response
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showAlert('تم استلام رسالتك بنجاح! سيتواصل معك مستشار مكتب ساويرس في أقرب وقت.', 'success');
      form.reset();

      // Clear alert after 7 seconds
      setTimeout(() => {
        if (alertBox) alertBox.style.display = 'none';
      }, 7000);
    }, 900);
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-status-alert ${type}`;
    alertBox.style.display = 'block';
  }
}

/**
 * 6. Subtle Parallax Effect on Iridescent Orbs & Crystals
 */
function initParallaxEffects() {
  const floatingElements = document.querySelectorAll('.floating-orb, .floating-crystal, .contact-decor-crystal');
  if (floatingElements.length === 0 || window.innerWidth < 992) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;

    floatingElements.forEach((el, index) => {
      const speed = (index + 1) * 15;
      const x = mouseX * speed;
      const y = mouseY * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, { passive: true });
}
