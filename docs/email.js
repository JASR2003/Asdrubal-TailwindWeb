document.addEventListener('DOMContentLoaded', () => {
  // La dirección se arma al hacer clic para que no quede en el HTML
  document.querySelectorAll('[data-email-user]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const address = `${link.dataset.emailUser}@${link.dataset.emailDomain}`;
      link.href = `mailto:${address}`;
      link.removeAttribute('target');
      // Se muestra la dirección por si el navegador no tiene cliente de correo
      link.textContent = address;
      window.location.href = link.href;
    });
  });
});
