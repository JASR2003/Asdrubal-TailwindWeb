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
            const spans = link.querySelectorAll('span'); // Selecciona todos los spans dentro del link

            if (href === activeSection) {
                link.classList.add('text-blue-txt');
                spans[0].classList.add('w-16', 'bg-blue-txt');
                spans[0].classList.remove('w-6', 'bg-gray-txt');
                spans[1].classList.add('text-blue-txt');
            } else {
                link.classList.remove('text-blue-txt');
                spans[0].classList.remove('w-16', 'bg-blue-txt');
                spans[0].classList.add('w-6', 'bg-gray-txt');
                spans[1].classList.remove('text-blue-txt');
            }
        });

    };

    // Escuchar eventos de scroll y resize
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);

    // Ejecutar al cargar la página
    updateActiveLink();
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("hamburger-button");
    const closeButton = document.getElementById("close-button");
    const mobileMenu = document.getElementById("mobile-menu");

    // Abrir menú
    hamburgerButton.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
    });
    
    // Cerrar menú
    closeButton.addEventListener("click", () => {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
    });

    // Cerrar el menú flotante automáticamente al hacer resize a pantallas lg o más grandes
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.add("hidden");
        }
    });
});
