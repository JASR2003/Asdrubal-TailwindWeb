document.addEventListener('DOMContentLoaded', () => {
  // La dirección se arma al hacer clic para que no quede en el HTML
  document.querySelectorAll('[data-email-user]').forEach((button) => {
    button.addEventListener('click', () => {
      const address = `${button.dataset.emailUser}@${button.dataset.emailDomain}`;
      // Se muestra la dirección por si el navegador no tiene cliente de correo
      button.textContent = address;
      window.location.href = `mailto:${address}`;
    });
  });
});
