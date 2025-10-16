const originalBackground = document.body.style.backgroundImage;

const setBodyBackground = (value) => {
  document.body.style.transition = 'background-image 0.4s ease-in-out';
  document.body.style.backgroundImage = value ? `url(${value})` : originalBackground;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
};

document.addEventListener('mouseover', (event) => {
  const target = event.target.closest('[data-body-bg]');
  if (!target) return;
  const bg = target.getAttribute('data-body-bg');
  setBodyBackground(bg);
});

document.addEventListener('mouseleave', (event) => {
  const target = event.target.closest('[data-body-bg]');
  if (!target) return;
  setBodyBackground('');
});

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-open-link]');
  if (!target) return;
  const href = target.getAttribute('data-open-link');
  if (href) {
    window.open(href, '_blank', 'noopener');
  }
});
