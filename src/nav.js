document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('ul > li > a');

    const updateActiveLink = () => {
        let activeSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const sectionHeight = rect.height;
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visiblePercentage = (visibleHeight / sectionHeight) * 100;

            if (visiblePercentage >= 90) {
                activeSection = section.id;
            }
        });

        if (!activeSection) {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                const visibleViewportPercentage = (visibleHeight / viewportHeight) * 100;

                if (visibleViewportPercentage >= 40) {
                    activeSection = section.id;
                }
            });
        }

        // Actualizar las clases activas en el nav
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1); // Obtiene el id sin el '#'
            const line = link.querySelector('span:first-child'); // Selecciona el span de la línea

            if (href === activeSection) {
                link.classList.add('text-blue-txt');
                line.classList.add('w-16', 'bg-blue-txt');
                line.classList.remove('w-6', 'bg-gray-txt');
            } else {
                link.classList.remove('text-blue-txt');
                line.classList.remove('w-16', 'bg-blue-txt');
                line.classList.add('w-6', 'bg-gray-txt');
            }
        });
    };

    // Escuchar eventos de scroll y resize
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);

    // Ejecutar al cargar la página
    updateActiveLink();
});