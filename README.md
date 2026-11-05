# Asdrubal-TailwindWeb

Sitio de [asdrubalivan.com](https://asdrubalivan.com), publicado desde `docs/`.

## Artículos

1. Elige qué pieza publicada va al sitio. No todo lo publicado debe ir.
2. Impórtala desde su registro: `node scripts/articulos.mjs importar <registro.md> <slug>`.
3. Completa `descripcion` en `content/articulos/<slug>.md`. Opcionales: `destacado` (frase del título que resalta en móvil) y `secciones` (etiquetas cortas de la navegación, separadas por comas).
4. Ejecuta `npm run build` y revisa el resultado.

### Formato del texto

El build entiende párrafos, títulos `##` (secciones, con entrada en la navegación) y `###` (subtítulos; en un artículo sin `##`, los `###` son las secciones), citas en bloque (`>`), listas con viñetas (`- `), tablas, enlaces `[texto](url)`, `**negrita**`, `` `código` `` en línea y bloques de código (`python`, `ts`, `bash`, `markdown`; `text` es la salida de un test que falla y se muestra con relleno cian).

- **Fragmentos en otro idioma:** para que un lector de pantalla los pronuncie bien, pon `{en}` (o el código de dos letras que corresponda) al inicio del párrafo, por ejemplo `> {en} "Fluency can give…"`, o tras el lenguaje de un bloque de código: ` ```markdown {en} `. El marcador no se muestra y el build emite `lang="en"` en ese bloque; si coincide con el idioma de la página, no emite nada. Marca citas y bloques corridos, no nombres de herramientas, términos sueltos ni código en línea.
- **Figuras:** `![alt](archivo.svg)` seguido de una línea en cursiva con el pie. El SVG vive en `content/articulos/<slug>/`, se incrusta en la página (para que `currentColor` tome el color del texto) y debe traer `role="img"` y `aria-label`, que es su descripción accesible. En pantallas angostas se desplaza dentro de su marco.
- **Imagen social propia:** copia la imagen (1200×630) a `docs/png/` y escribe su nombre en `imagen_social` en el frontmatter. Sin esa clave se usa la del idioma. El build la valida con los límites de [las vistas previas de WhatsApp](https://developers.facebook.com/docs/whatsapp/link-previews): PNG o JPEG de 1200×630 y menos de 600 KB (avisa desde 300 KB). Además comprueba que `og:title`, `og:description`, `og:url` y `og:image` no estén vacíos y que el `<head>` quepa en los primeros 300 KB.

### Traducciones al inglés

El original en español no se reescribe. La traducción es automática y la revisa Asdrúbal antes de publicarse. Toda página de `content/articles/` abre con un aviso que dice que él la revisó y enlaza al original, así que no se publica sin esa revisión.

1. Crea `content/articles/<slug>.md` con las mismas claves del original (`titulo`, `fecha`, `descripcion`, `destacado`, `secciones`, `link_linkedin`, `link_x`) y `traduccion_de: <slug español>`. El slug en inglés puede ser distinto; si `traduccion_de` falta o no existe en `content/articulos/`, el build falla.
2. Usa la misma `fecha` del original. `destacado` debe aparecer tal cual en `titulo`.
3. Ejecuta `npm run build`. Genera `docs/articles/<slug>.html` (URL `/articles/<slug>`), enlaza ambos idiomas con ENG/ESP y `hreflang`, apunta la portada inglesa a la traducción y agrega ambas URL al sitemap.

Sin traducción, la portada inglesa sigue enlazando al original y lo marca como "In Spanish". No uses `/en/` ni `/es/` como carpeta: `/es` ya es una página y un directorio homónimo puede romperla en GitHub Pages.
