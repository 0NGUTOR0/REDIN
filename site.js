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

  const headings = document.querySelectorAll("h2");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

headings.forEach((heading) => {
  observer.observe(heading);
});
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
})();
