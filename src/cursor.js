document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');

  // Actualiza la posición del cursor según el movimiento del mouse
  document.addEventListener('mousemove', (event) => {
    updateCursorPosition(event.clientX, event.clientY);
  });

  // Función para actualizar la posición del cursor
  function updateCursorPosition(x, y) {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }
});
