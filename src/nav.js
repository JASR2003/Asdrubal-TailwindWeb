document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('li[data-section]');

    const updateActiveLink = () => {
        let activeSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const sectionHeight = rect.height;
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visiblePercentage = (visibleHeight / sectionHeight) * 100;

            // Prioridad 1: Seleccionar si el 100% del section está visible
            if (visiblePercentage >= 90) { // Tolerancia del 90% en vez del 100%
                activeSection = section.id;
            }
        });

        // Prioridad 2: Si ninguna tiene 90%, aplicar la lógica del 51% del viewport con margen
        if (!activeSection) {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                const visibleViewportPercentage = (visibleHeight / viewportHeight) * 100;

                if (visibleViewportPercentage >= 40) { // Mínimo 40% visible
                    activeSection = section.id;
                }
            });
        }

        // Actualizar las clases activas en el nav
        navItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId === activeSection) {
                item.querySelector('a').classList.add('text-blue-txt');
                item.querySelector('span').classList.add('w-16', 'bg-blue-txt');
                item.querySelector('span').classList.remove('w-6', 'bg-gray-txt');
            } else {
                item.querySelector('a').classList.remove('text-blue-txt');
                item.querySelector('span').classList.remove('w-16', 'bg-blue-txt');
                item.querySelector('span').classList.add('w-6', 'bg-gray-txt');
            }
        });
    };

    // Escuchar eventos de scroll y resize
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);

    // Ejecutar al cargar la página
    updateActiveLink();
});

