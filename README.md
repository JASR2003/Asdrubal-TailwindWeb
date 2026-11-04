# Asdrubal-TailwindWeb

Sitio de [asdrubalivan.com](https://asdrubalivan.com), publicado desde `docs/`.

## Artículos

1. Elige qué pieza publicada va al sitio. No todo lo publicado debe ir.
2. Impórtala desde su registro: `node scripts/articulos.mjs importar <registro.md> <slug>`.
3. Completa `descripcion` en `content/articulos/<slug>.md`. Opcionales: `destacado` (frase del título que resalta en móvil) y `secciones` (etiquetas cortas de la navegación, separadas por comas).
4. Ejecuta `npm run build` y revisa el resultado.
