document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#mobile-menu ul > li > a');
    const mainContainer = document.querySelector('main');

    // Con texto grande en móvil, <main> deja de tener scroll propio y se desplaza toda la página
    const scrollsWithWindow = () => window.innerWidth >= 1024 || getComputedStyle(mainContainer).overflowY === 'visible';

    const updateActiveLink = () => {
        let activeSection = null;
        const isLargeScreen = scrollsWithWindow();

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
        const isLargeScreen = scrollsWithWindow();

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

    const closeMenu = (returnFocus = false) => {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
        hamburgerButton.classList.remove("opacity-0"); // Muestra con opacidad
        hamburgerButton.classList.add("opacity-100");
        hamburgerButton.setAttribute("aria-expanded", "false");
        if (returnFocus) hamburgerButton.focus();
    };

    // Abrir menú
    hamburgerButton.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
        hamburgerButton.classList.add("opacity-0"); // Oculta con opacidad
        hamburgerButton.classList.remove("opacity-100");
        hamburgerButton.setAttribute("aria-expanded", "true");
        closeButton.focus();
    });

    // Cerrar menú
    closeButton.addEventListener("click", () => closeMenu(true));

    // Cerrar menú con Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && hamburgerButton.getAttribute("aria-expanded") === "true") {
            closeMenu(true);
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", () => closeMenu());
    });

    // Cerrar el menú automáticamente al hacer resize a pantallas lg o más grandes
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) closeMenu();
    });
});

// Cabecera móvil colapsable: el logo y el cargo se van con la página; la fila de navegación
// queda fija, se oculta al bajar y reaparece al subir (estilos en input.css, .cabecera).
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".cabecera");
    const nav = header && header.querySelector("nav");
    const hamburgerButton = document.getElementById("hamburger-button");
    if (!header || !nav) return;

    const mobile = window.matchMedia("(max-width: 767px)");
    const DELTA = 8; // px de scroll antes de cambiar de dirección, para ignorar temblores
    let marcaH = 0;
    let lastY = window.scrollY;
    let jumping = false;
    let ticking = false;

    // Alto de todo lo que queda encima de la fila de navegación
    const measure = () => {
        marcaH = nav.getBoundingClientRect().top - header.getBoundingClientRect().top;
        header.style.setProperty("--marca-h", `${marcaH}px`);
    };

    const update = () => {
        ticking = false;
        if (!mobile.matches) {
            header.removeAttribute("data-pegada");
            header.removeAttribute("data-oculta");
            return;
        }
        // Se limita al rango real para ignorar el rebote de iOS en los extremos
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        const y = Math.min(Math.max(window.scrollY, 0), Math.max(maxY, 0));
        const stuck = y >= marcaH - 1;
        const menuOpen = hamburgerButton && hamburgerButton.getAttribute("aria-expanded") === "true";
        const dy = y - lastY;
        let hidden = header.hasAttribute("data-oculta");

        if (!stuck || menuOpen) {
            hidden = false;
            lastY = y;
        } else if (jumping) {
            // Tras saltar a una sección con el menú, la barra no tapa el título
            hidden = true;
            lastY = y;
        } else if (dy > DELTA) {
            hidden = true;
            lastY = y;
        } else if (dy < -DELTA) {
            hidden = false;
            lastY = y;
        }
        jumping = false;

        header.toggleAttribute("data-pegada", stuck);
        header.toggleAttribute("data-oculta", hidden);
    };

    const requestUpdate = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    };

    document.addEventListener("click", (event) => {
        if (!event.target.closest('a[href^="#"]')) return;
        jumping = true;
        setTimeout(() => { jumping = false; }, 400); // si el salto no mueve la página
    });
    if (hamburgerButton) hamburgerButton.addEventListener("click", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", () => { measure(); requestUpdate(); });
    if ("ResizeObserver" in window) new ResizeObserver(() => { measure(); requestUpdate(); }).observe(header);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); requestUpdate(); });

    measure();
    header.setAttribute("data-colapsable", "");
    update();
});
