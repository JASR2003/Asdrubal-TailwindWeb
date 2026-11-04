document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('.articulo-panel nav a')];
  if (!links.length) return;

  const headings = links.map((link) => document.querySelector(link.getAttribute('href')));

  // La sección activa es el último título que ya pasó por el tercio superior de la ventana
  const updateActiveLink = () => {
    const limit = window.innerHeight / 3;
    const active = headings.filter((heading) => heading.getBoundingClientRect().top <= limit).pop();
    links.forEach((link, i) => {
      if (headings[i] === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});
