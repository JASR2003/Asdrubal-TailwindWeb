---
name: Asdrúbal Suárez
description: Sitio profesional de un Senior Backend Engineer, oscuro, sereno y preciso.
colors:
  signal-cyan: "#36d0f1"
  panel-midnight: "#020f1e"
  console-navy: "#041a2e"
  glow-blue: "#102f57"
  hover-slate: "#192a3b"
  chip-deep-blue: "#032540"
  readout-gray: "#94a3b8"
  pure-white: "#ffffff"
  button-hover-ink: "#1e3a8a"
typography:
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
  subtitle:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
  lead:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.625
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  none: "0px"
  md: "6px"
  xl: "24px"
  full: "9999px"
spacing:
  chip-gap: "8px"
  card: "16px"
  group: "24px"
  block: "40px"
  section: "48px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.button-hover-ink}"
  chip:
    backgroundColor: "{colors.chip-deep-blue}"
    textColor: "{colors.signal-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  entry-card:
    backgroundColor: "transparent"
    textColor: "{colors.readout-gray}"
    rounded: "{rounded.md}"
    padding: "{spacing.card}"
  entry-card-hover:
    backgroundColor: "{colors.hover-slate}"
---

# Design System: Asdrúbal Suárez

## Overview

**Creative North Star: "La sala de control"**

El sitio se comporta como una sala de control de noche: oscura, serena y precisa, hecha para leer el estado de un sistema sin distracciones. El azul casi negro funciona como la sala, el gris azulado como las lecturas y el cian como la única señal que indica dónde estás o qué responde.

Al navegarlo debe sentirse sereno y preciso. Hay poco ruido, la jerarquía es clara y el contenido manda. La identidad vive en pocos gestos: la columna fija que orienta, la línea de navegación que se alarga hacia la sección activa y un brillo que sigue al cursor en escritorio.

**Key Characteristics:**
- Tema oscuro único, sin variante clara.
- Un solo acento cian, reservado para estado, enlaces e interacción.
- Una sola familia tipográfica; la jerarquía sale del tamaño, el peso y el color.
- Dos columnas en escritorio, con la identidad fija y el contenido en desplazamiento.
- Plano en reposo; la respuesta llega con cambios de tono y de color.

## Colors

La paleta es un azul nocturno casi monocromático, con un único cian luminoso como señal.

### Primary
- **Signal Cyan** (`signal-cyan`): sección e idioma activos, hover de navegación, enlaces a entidades, títulos de entrada en hover y texto de chips.

### Neutral
- **Panel Midnight** (`panel-midnight`): columna fija de identidad desde tablet.
- **Console Navy** (`console-navy`): borde exterior del fondo radial de la página.
- **Glow Blue** (`glow-blue`): centro más claro del fondo radial.
- **Hover Slate** (`hover-slate`): relleno de las entradas al pasar el cursor.
- **Chip Deep Blue** (`chip-deep-blue`): fondo de chips y del menú móvil.
- **Readout Gray** (`readout-gray`): texto corrido, datos secundarios y navegación en reposo.
- **Pure White** (`pure-white`): títulos de sección y de entrada, cargo y borde de los botones.
- **Button Hover Ink** (`button-hover-ink`): texto del botón cuando se invierte en hover.

### Named Rules
**The Single Signal Rule.** El cian significa estado, enlace o interacción. No se usa como decoración ni como fondo de grandes superficies. En los artículos, el relleno cian marca solo la salida de un test que falla.

**The Night Room Rule.** Todo se apoya en el fondo oscuro. No se agrega una superficie clara en reposo; el blanco de relleno solo aparece en el hover de un botón.

## Typography

**Display Font:** Montserrat (con sans-serif de respaldo), autoalojada en `docs/fonts/` con pesos de 400 a 700.

**Character:** una geométrica limpia y constante, sin pareja tipográfica. Da una voz técnica y ordenada; el contraste lo ponen el peso y el color.

### Hierarchy
- **Headline** (regular, escala de 1.25rem en móvil a 1.875rem en escritorio): cargo profesional, debajo del logo. El nombre se muestra como logo en imagen, no como texto.
- **Title** (bold, 1.5rem): títulos de sección, en mayúsculas escritas en el contenido.
- **Subtitle** (semibold, 1.125rem): títulos de entrada y navegación; la navegación va en mayúsculas.
- **Lead** (medium, 1.25rem, interlineado amplio): párrafos de la portada.
- **Body** (regular, 1rem): descripciones de experiencia, portafolio y referencias.
- **Label** (regular, 0.875rem): chips y texto auxiliar como "Follow me on".

### Named Rules
**The One Family Rule.** Montserrat cubre todos los roles. La jerarquía se construye con tamaño, peso y color, no con una segunda fuente. La única excepción es el código de los artículos, en la monoespaciada del sistema, porque depende de su alineación.

**The Readable Acronym Rule.** El texto con siglas de caja mixta, como "LLMs", no se transforma a mayúsculas, porque se leería "LLMS".

## Layout

Hay una retícula de 12 columnas. Desde 768px, la identidad y la navegación ocupan 5 columnas fijas a pantalla completa y el contenido ocupa las otras 7. En móvil, la cabecera se queda fija arriba, con 30% de la altura de la ventana, y el contenido se desplaza debajo.

El ritmo es generoso y vertical: 48px de relleno en cada sección y 40px entre bloques. Las entradas se apilan en una sola columna de lectura. La cuadrícula de logos de habilidades es la única excepción densa. El lema se oculta por debajo de 1024px.

## Elevation & Depth

El sistema es plano y usa capas de tono. La profundidad viene del contraste entre la columna oscura, el fondo radial y el brillo del cursor. La única sombra con función está en la cabecera móvil y en el menú desplegable, para separarlos del contenido que pasa por debajo.

### Shadow Vocabulary
- **Capa flotante** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): cabecera y menú en móvil.

### Named Rules
**The Flat Console Rule.** Las superficies son planas en reposo. Una entrada responde con un cambio de tono, no con sombra ni elevación.

## Shapes

El lenguaje mezcla tres formas con funciones distintas: ángulos rectos para acciones, esquinas apenas suavizadas (6px) para entradas y píldoras para datos. El menú móvil es la única pieza muy redondeada (24px). Los bordes son finos, de 1px, y se reservan para los botones.

## Components

### Buttons
Sobrios y seguros: un contorno blanco sobre la noche, que se invierte al responder.
- **Shape:** ángulos rectos (0px), con borde blanco de 1px.
- **Primary:** fondo transparente, texto blanco en bold, relleno de 12px por 24px. Los botones de la portada se muestran en par, con el mismo peso visual.
- **Hover / Focus:** en hover se llena de blanco y el texto pasa a azul intenso, con transición de 300ms. El foco visible es un anillo cian de 2px, separado 2px, común a todos los controles.

### Chips
- **Style:** píldora con fondo azul profundo, texto cian de 0.875rem y mayúsculas escritas en el contenido.
- **State:** solo informativos; no son interactivos.

### Cards / Containers
Las entradas de experiencia y portafolio son filas sin contenedor visible hasta que se interactúa con ellas.
- **Corner Style:** esquinas suaves (6px).
- **Background:** transparente en reposo y Hover Slate en hover, con el título en cian.
- **Shadow Strategy:** ninguna, según The Flat Console Rule.
- **Border:** ninguno.
- **Internal Padding:** 16px.

### Navigation
- **Style:** vertical en escritorio, en mayúsculas y semibold, cada enlace precedido por una línea de 2px.
- **States:** en reposo, gris con línea de 24px. En hover y en la sección activa, cian con línea de 64px y transición de 300ms.
- **Idioma:** ENG y ESP en bold, con el idioma actual en cian.
- **Mobile:** el botón `< >` abre un panel redondeado y opaco en Chip Deep Blue, para que el contenido no se transparente. Se cierra con la X, con Escape o al elegir un enlace.

### Cursor Glow
La firma del sitio: un brillo radial de 50vw de ancho, en modo de fusión overlay, que sigue al cursor. Solo aparece desde 1024px, no intercepta clics y no debe interferir con la lectura.

## Do's and Don'ts

### Do:
- **Do** conservar el brillo del cursor como firma, solo en escritorio.
- **Do** reservar Signal Cyan para estado, enlaces e interacción.
- **Do** mantener iguales las versiones en inglés y español de cada componente.
- **Do** usar los ángulos rectos en acciones, 6px en entradas y píldoras en chips.
- **Do** recompilar `docs/output.css` y revisar su diff cuando se agreguen clases nuevas.

### Don't:
- **Don't** agregar una segunda familia tipográfica.
- **Don't** sumar otro color de acento.
- **Don't** elevar las entradas con sombras en hover.
- **Don't** transformar a mayúsculas texto con siglas de caja mixta.
- **Don't** justificar el texto: crea huecos desiguales, sobre todo en móvil.
