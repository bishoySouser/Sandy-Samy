/**
 * Saweras Tax & Accounting — Interactive UI & Localization Engine
 * Cosmic Dark Glassmorphism Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initLocalization();
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initShowcaseTabs();
  initContactForm();
  initParallaxEffects();
});

/**
 * 1. Localization Engine (AR / EN)
 */
let currentLang = localStorage.getItem('saweras_lang') || 'ar';

function initLocalization() {
  const toggleBtn = document.getElementById('langToggle');

  // Apply initially saved or default language
  applyLanguage(currentLang);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('saweras_lang', currentLang);
      applyLanguage(currentLang);
    });
  }
}

function applyLanguage(lang) {
  if (typeof translations === 'undefined' || !translations[lang]) return;

  const t = translations[lang];
  const html = document.documentElement;

  // Set document direction and language attributes
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update Page Title
  if (t.pageTitle) {
    document.title = t.pageTitle;
  }

  // Update text for all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Update title / tooltip attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key] !== undefined) {
      el.title = t[key];
    }
  });

  // Update language toggle button visual indicator
  const optAr = document.getElementById('langOptAr');
  const optEn = document.getElementById('langOptEn');
  if (optAr && optEn) {
    if (lang === 'ar') {
      optAr.classList.add('active');
      optEn.classList.remove('active');
    } else {
      optEn.classList.add('active');
      optAr.classList.remove('active');
    }
  }

  // Update arrow directions in pill buttons
  document.querySelectorAll('.btn-primary-pill i.fa-arrow-left, .btn-primary-pill i.fa-arrow-right').forEach(icon => {
    if (lang === 'ar') {
      icon.className = 'fa-solid fa-arrow-left';
    } else {
      icon.className = 'fa-solid fa-arrow-right';
    }
  });

  document.querySelectorAll('.card-cta i.fa-chevron-left, .card-cta i.fa-chevron-right').forEach(icon => {
    if (lang === 'ar') {
      icon.className = 'fa-solid fa-chevron-left';
    } else {
      icon.className = 'fa-solid fa-chevron-right';
    }
  });
}

/**
 * 2. Navbar Scroll Effect: Adds subtle glass intensification on scroll
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
 * 3. Mobile Navigation Toggle
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
 * 4. ScrollSpy for Vertical Dock & Top Header Links
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const dockItems = document.querySelectorAll('.dock-item');
  const navLinks = document.querySelectorAll('.header-nav a');

  if (sections.length === 0) return;

  function updateActiveSection() {
    let currentId = '';
    const scrollPosition = window.scrollY + 220;

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
 * 5. Showcase Tabs Switcher
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
 * 6. Interactive Contact Form with Validation & Feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#clientName').value.trim();
    const phone = form.querySelector('#clientPhone').value.trim();

    const isAr = document.documentElement.lang === 'ar';

    if (!name || !phone) {
      const errorMsg = isAr 
        ? 'يرجى كتابة الاسم ورقم الهاتف أو الإيميل للتواصل معك.' 
        : 'Please enter your name and phone number or email.';
      showAlert(errorMsg, 'error');
      return;
    }

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>${isAr ? 'جاري الإرسال...' : 'Sending...'}</span>`;
    submitBtn.disabled = true;

    // Simulate sending with nice response
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      const successMsg = isAr
        ? 'تم استلام رسالتك بنجاح! سيتواصل معك مستشار مكتب ساويرس في أقرب وقت.'
        : 'Your message has been received! A Saweras advisor will contact you shortly.';
      showAlert(successMsg, 'success');
      form.reset();

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
 * 7. Parallax Effect on Iridescent Orbs & Crystals
 */
function initParallaxEffects() {
  const floatingElements = document.querySelectorAll('.floating-orb, .floating-crystal, .contact-decor-crystal');
  if (floatingElements.length === 0 || window.innerWidth < 992) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;

    floatingElements.forEach((el, index) => {
      const speed = (index + 1) * 14;
      const x = mouseX * speed;
      const y = mouseY * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, { passive: true });
}
