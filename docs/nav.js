document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('ul > li > a');
    const mainContainer = document.querySelector('main');

    const updateActiveLink = () => {
        let activeSection = null;
        const isLargeScreen = window.innerWidth >= 1024; // Detectar si es "lg" o mayor

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = isLargeScreen ? window.innerHeight : mainContainer.clientHeight;

            const sectionHeight = rect.height;
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visiblePercentage = (visibleHeight / sectionHeight) * 100;

            // Cambiamos 90% a 70% para activar antes
            if (visiblePercentage >= 70) {
                activeSection = section.id;
            }
        });

        if (!activeSection) {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const viewportHeight = isLargeScreen ? window.innerHeight : mainContainer.clientHeight;

                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                const visibleViewportPercentage = (visibleHeight / viewportHeight) * 100;

                // Cambiamos 40% a 25% para activar antes
                if (visibleViewportPercentage >= 25) {
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

    const attachScrollListener = () => {
        const isLargeScreen = window.innerWidth >= 1024;

        window.removeEventListener('scroll', updateActiveLink);
        mainContainer.removeEventListener('scroll', updateActiveLink);

        if (isLargeScreen) {
            window.addEventListener('scroll', updateActiveLink); // Usar scroll del window
        } else {
            mainContainer.addEventListener('scroll', updateActiveLink); // Usar scroll del mainContainer
        }

        updateActiveLink(); // Ejecutar al iniciar
    };

    window.addEventListener('resize', attachScrollListener);

    attachScrollListener();
});




document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("hamburger-button");
    const closeButton = document.getElementById("close-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll("#mobile-menu ul li a");

    // Abrir menú
    hamburgerButton.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
        hamburgerButton.classList.add("opacity-0"); // Oculta con opacidad
        hamburgerButton.classList.remove("opacity-100");
    });

    // Cerrar menú
    closeButton.addEventListener("click", () => {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
        hamburgerButton.classList.remove("opacity-0"); // Muestra con opacidad
        hamburgerButton.classList.add("opacity-100");
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("flex");
            mobileMenu.classList.add("hidden");
            hamburgerButton.classList.remove("opacity-0"); // Muestra con opacidad
            hamburgerButton.classList.add("opacity-100");
        });
    });

    // Cerrar el menú automáticamente al hacer resize a pantallas lg o más grandes
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            hamburgerButton.classList.remove("opacity-0"); // Muestra con opacidad
            hamburgerButton.classList.add("opacity-100");
        }
    });
});

