# Asdrubal-TailwindWeb

Sitio de [asdrubalivan.com](https://asdrubalivan.com), publicado desde `docs/`.

## Artículos

1. Elige qué pieza publicada va al sitio. No todo lo publicado debe ir.
2. Impórtala desde su registro: `node scripts/articulos.mjs importar <registro.md> <slug>`.
3. Completa `descripcion` en `content/articulos/<slug>.md`. Opcionales: `destacado` (frase del título que resalta en móvil) y `secciones` (etiquetas cortas de la navegación, separadas por comas).
4. Ejecuta `npm run build` y revisa el resultado.

### Traducciones al inglés

El original en español no se reescribe. La traducción es automática y la revisa Asdrúbal antes de publicarse. Toda página de `content/articles/` abre con un aviso que dice que él la revisó y enlaza al original, así que no se publica sin esa revisión.

1. Crea `content/articles/<slug>.md` con las mismas claves del original (`titulo`, `fecha`, `descripcion`, `destacado`, `secciones`, `link_linkedin`, `link_x`) y `traduccion_de: <slug español>`. El slug en inglés puede ser distinto; si `traduccion_de` falta o no existe en `content/articulos/`, el build falla.
2. Usa la misma `fecha` del original. `destacado` debe aparecer tal cual en `titulo`.
3. Ejecuta `npm run build`. Genera `docs/articles/<slug>.html` (URL `/articles/<slug>`), enlaza ambos idiomas con ENG/ESP y `hreflang`, apunta la portada inglesa a la traducción y agrega ambas URL al sitemap.

Sin traducción, la portada inglesa sigue enlazando al original y lo marca como "In Spanish". No uses `/en/` ni `/es/` como carpeta: `/es` ya es una página y un directorio homónimo puede romperla en GitHub Pages.
