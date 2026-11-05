document.addEventListener('DOMContentLoaded', () => {
  // La dirección se arma al hacer clic para que no quede en el HTML
  document.querySelectorAll('[data-email-user]').forEach((button) => {
    button.addEventListener('click', () => {
      const address = `${button.dataset.emailUser}@${button.dataset.emailDomain}`;
      // Se muestra la dirección por si el navegador no tiene cliente de correo;
      // el <wbr> deja cortar tras la arroba sin alterar lo que se copia
      button.replaceChildren(`${button.dataset.emailUser}@`, document.createElement('wbr'), button.dataset.emailDomain);
      button.removeAttribute('aria-label');
      window.location.href = `mailto:${address}`;
    });
  });
});
