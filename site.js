(() => {
  // ---------- Mobile menu ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---------- Headings fade in on scroll ----------
  const headings = document.querySelectorAll('h2');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    headings.forEach(h => observer.observe(h));
  } else {
    headings.forEach(h => h.classList.add('show'));   // old browsers: just show them
  }

  // ---------- Footer year ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Project popups ----------
  // Clicking anywhere on a .project-card opens the <dialog> named in its button's data-modal.
  const openModal = (id) => {
    const dialog = document.getElementById(id);
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  };

  document.querySelectorAll('.project-card').forEach(card => {
    const trigger = card.querySelector('[data-modal]');
    if (trigger) card.addEventListener('click', () => openModal(trigger.dataset.modal));
  });

  document.querySelectorAll('dialog.modal').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(btn =>
      btn.addEventListener('click', () => dialog.close())
    );
    // Click on the dimmed backdrop closes the popup
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });

  // ---------- Carousel arrows (shown on mouse devices only, via CSS) ----------
  const carousel = document.getElementById('carousel');
  const prev = document.querySelector('.carousel-arrow--prev');
  const next = document.querySelector('.carousel-arrow--next');
  if (carousel && prev && next) {
    const step = () => {
      const card = carousel.querySelector('.card');
      const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : carousel.clientWidth * 0.8;
    };

    const updateArrows = () => {
      prev.disabled = carousel.scrollLeft <= 1;
      next.disabled = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1;
    };

    [prev, next].forEach(btn => btn.addEventListener('click', () => {
      carousel.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: 'smooth' });
    }));

    carousel.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    window.addEventListener('load', updateArrows);
    updateArrows();
  }

  // ---------- Contact form (Formspree) + thank-you overlay ----------
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form && success) {
    const submitBtn = form.querySelector('[type="submit"]');
    const againBtn = document.getElementById('form-success-close');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalHTML = submitBtn.innerHTML;   // keeps the arrow icon
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          form.reset();
          success.hidden = false;          // overlay covers the form
        } else {
          const data = await res.json().catch(() => ({}));
          alert(data.error || 'Something went wrong. Please try again.');
        }
      } catch {
        alert('Network error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });

    if (againBtn) againBtn.addEventListener('click', () => { success.hidden = true; });
  }
})();