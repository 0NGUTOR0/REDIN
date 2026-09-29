const carousel = document.getElementById('carousel');

if (carousel) {
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const dotsContainer = document.getElementById('carousel-dots');

  // Create dots
  if (dotsContainer) {
    cards.forEach((_, index) => {
      const dot = document.createElement('button');

      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to picture ${index + 1}`);

      dot.addEventListener('click', () => {
        const card = cards[index];

        carousel.scrollTo({
          left: card.offsetLeft - carousel.offsetLeft,
          behavior: 'smooth'
        });
      });

      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer
    ? Array.from(dotsContainer.querySelectorAll('.carousel-dot'))
    : [];

  function updateDots() {
    if (!cards.length || !dots.length) return;

    const scrollLeft = carousel.scrollLeft;
    const carouselWidth = carousel.clientWidth;

    let currentIndex = 0;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - carousel.offsetLeft;

      if (scrollLeft >= cardLeft - carouselWidth / 4) {
        currentIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  carousel.addEventListener(
    'scroll',
    updateDots,
    { passive: true }
  );

  window.addEventListener('resize', updateDots);

  updateDots();
}