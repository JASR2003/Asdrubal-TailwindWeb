document.addEventListener('DOMContentLoaded', () => {
  // Navegación de escritorio e índice plegable de móvil: mismas anclas, mismo estado activo
  const links = [...document.querySelectorAll('.articulo-panel nav a, .articulo-panel .indice a')];
  if (!links.length) return;

  const headings = links.map((link) => document.querySelector(link.getAttribute('href')));

  // La sección activa es el último título que ya pasó por el tercio superior de la ventana.
  // Al llegar al final de la página queda activa la última: su título puede no alcanzar ese tercio.
  const updateActiveLink = () => {
    const limit = window.innerHeight / 3;
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const active = atEnd
      ? headings.at(-1)
      : headings.filter((heading) => heading.getBoundingClientRect().top <= limit).pop();
    links.forEach((link, i) => {
      if (headings[i] === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});
