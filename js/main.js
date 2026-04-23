/* ── Nav scroll effect ─────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mobile hamburger ──────────────────────────────── */
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

/* ── Active nav link ───────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── Fade-up intersection observer ────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => observer.observe(el));
}

/* ── Work page filters ─────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card[data-category]');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      workCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Notify form ───────────────────────────────────── */
const notifyForm = document.querySelector('.notify-form');
if (notifyForm) {
  notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = notifyForm.querySelector('input');
    const btn = notifyForm.querySelector('button');
    if (input.value) {
      btn.textContent = "You're on the list!";
      btn.style.background = '#1a6e1a';
      input.value = '';
      input.disabled = true;
      btn.disabled = true;
    }
  });
}

/* ── Video lightbox ────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxIframe = document.getElementById('lightbox-iframe');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(videoId) {
  lightboxIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxIframe.src = '';
  document.body.style.overflow = '';
}

if (lightbox) {
  document.querySelectorAll('.video-thumb-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(card.dataset.vid));
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

/* ── Duplicate marquee content for seamless loop ───── */
const tracks = document.querySelectorAll('.marquee-track');
tracks.forEach(track => {
  track.innerHTML += track.innerHTML;
});
