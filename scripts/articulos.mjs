// Artículos del sitio: importa registros publicados y genera sus páginas estáticas.
//   node scripts/articulos.mjs importar <registro.md> <slug>
//   node scripts/articulos.mjs build
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content/articulos');
const DOCS = join(ROOT, 'docs');
const SITE = 'https://asdrubalivan.com';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
const LINK_CLASS = 'text-blue-txt';
const LINK_STYLE = 'text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px';

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Falta el frontmatter');
  const meta = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: match[2].trim() };
}

function importar(path, slug) {
  if (!path || !slug) throw new Error('Uso: importar <registro.md> <slug>');
  const { meta, body } = parseFrontmatter(readFileSync(path, 'utf8'));
  const section = body.split('## Texto publicado')[1];
  if (!section) throw new Error('El registro no tiene "## Texto publicado"');
  // Lo que sigue al texto (acompañamiento, "Cómo resonó") no es parte del artículo.
  const text = section.split(/^(?:## |Texto de acompañamiento)/m)[0].trim();
  const [first, ...rest] = text.split('\n');
  const out = join(CONTENT, `${slug}.md`);
  if (existsSync(out)) throw new Error(`Ya existe ${out}`);
  writeFileSync(out, `---
titulo: ${first.replace(/^Título:\s*/, '').trim()}
fecha: ${meta.fecha}
descripcion:
destacado:
secciones:
link_linkedin: ${meta.link_linkedin ?? ''}
link_x: ${meta.link_x ?? ''}
---

${rest.join('\n').trim()}
`);
  console.log(`Importado en ${out}. Completa descripcion antes de build.`);
}

function parseBody(md) {
  const blocks = [];
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const code = [];
      while (!lines[++i].startsWith('```')) code.push(lines[i]);
      blocks.push({ type: 'code', lang, text: code.join('\n') });
    } else if (line.startsWith('### ')) {
      blocks.push({ type: 'heading', text: line.slice(4) });
    } else if (line.trim()) {
      blocks.push({ type: 'p', text: line });
    }
  }
  return blocks;
}

const LANG_LABEL = { python: 'Python', ts: 'TypeScript', text: 'Salida del test' };

function renderBody(blocks) {
  const lastP = blocks.map((b) => b.type).lastIndexOf('p');
  let section = 0;
  return blocks.map((b, i) => {
    if (b.type === 'heading') return `<h2 id="seccion-${++section}">${inline(b.text)}</h2>`;
    if (b.type === 'p') return `<p${i === lastP ? ' class="cierre"' : ''}>${inline(b.text)}</p>`;
    const output = b.lang === 'text' ? ' class="salida"' : '';
    return `<pre${output} tabindex="0" role="region" aria-label="${attr(LANG_LABEL[b.lang] ?? b.lang)}"><code>${esc(b.text)}</code></pre>`;
  }).join('\n');
}

function loadArticles() {
  return readdirSync(CONTENT).filter((f) => f.endsWith('.md')).map((file) => {
    const { meta, body } = parseFrontmatter(readFileSync(join(CONTENT, file), 'utf8'));
    for (const key of ['titulo', 'fecha', 'descripcion']) {
      if (!meta[key]) throw new Error(`${file}: falta ${key}`);
    }
    const date = new Date(`${meta.fecha}T12:00:00Z`);
    const format = (locale) => new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
    return { ...meta, slug: file.replace(/\.md$/, ''), body, dateEs: format('es'), dateEn: format('en') };
  }).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

function renderTitle({ titulo, destacado }) {
  const title = esc(titulo);
  return destacado ? title.replace(esc(destacado), `<strong>${esc(destacado)}</strong>`) : title;
}

function renderPage(a) {
  const url = `${SITE}/articulos/${a.slug}`;
  const blocks = parseBody(a.body);
  const headings = blocks.filter((b) => b.type === 'heading');
  const labels = a.secciones ? a.secciones.split(',').map((s) => s.trim()) : [];
  const nav = headings.length ? `<nav aria-label="Secciones del artículo">
${headings.map((h, i) => `<a href="#seccion-${i + 1}"><span class="linea"></span>${esc(labels[i] ?? h.text)}</a>`).join('\n')}
</nav>` : '';
  const sources = [
    a.link_linkedin && `<a class="enlace" href="${attr(a.link_linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    a.link_x && `<a class="enlace" href="${attr(a.link_x)}" target="_blank" rel="noopener">X</a>`,
  ].filter(Boolean).join(' y ');
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.titulo,
    description: a.descripcion,
    datePublished: a.fecha,
    inLanguage: 'es',
    url,
    author: { '@id': `${SITE}/#person`, '@type': 'Person', name: 'Asdrúbal Suárez', url: `${SITE}/` },
    sameAs: [a.link_linkedin, a.link_x].filter(Boolean),
  };
  return `<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(a.titulo)} | Asdrúbal Suárez</title>
    <meta name="description" content="${attr(a.descripcion)}">
    <meta name="robots" content="max-image-preview:large">
    <meta name="theme-color" content="#020f1e">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Asdrúbal Suárez">
    <meta property="og:title" content="${attr(a.titulo)}">
    <meta property="og:description" content="${attr(a.descripcion)}">
    <meta property="og:url" content="${url}">
    <meta property="og:locale" content="es_LA">
    <meta property="og:image" content="${SITE}/png/og-image-es.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="article:published_time" content="${a.fecha}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@AsdrubalCodes">
    <meta name="twitter:creator" content="@AsdrubalCodes">
    <meta name="twitter:title" content="${attr(a.titulo)}">
    <meta name="twitter:description" content="${attr(a.descripcion)}">
    <meta name="twitter:image" content="${SITE}/png/og-image-es.png">
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" type="image/png" sizes="192x192" href="/png/favicon-192.png">
    <link rel="apple-touch-icon" href="/png/apple-touch-icon.png">
    <link rel="preload" href="/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link href="/output.css" rel="stylesheet">
    <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>

<body class="bg-custom-radial bg-fixed text-gray-txt font-montserrat min-w-[320px]">
    <div id="custom-cursor" class="pointer-events-none hidden lg:block lg:fixed top-0 left-0 aspect-square w-[50vw] rounded-full bg-custom-cursor mix-blend-overlay z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
    <main>
<article class="articulo">
<header class="articulo-panel">
<a class="logo" href="/es"><img src="/png/logo.png" alt="Asdrúbal Suárez" width="1000" height="105"></a>
<h1>${renderTitle(a)}</h1>
<div class="datos">
<p><time datetime="${a.fecha}">${a.dateEs}</time></p>
${sources ? `<p>Publicado también en ${sources}.</p>` : ''}
</div>
${nav}
</header>
<div class="articulo-texto">
${renderBody(blocks)}
<footer class="pie">
<p>Asdrúbal Suárez · Ingeniero de Backend Senior</p>
<a class="boton" href="/es">Ver perfil y contacto</a>
</footer>
</div>
</article>
    </main>
    <script src="/cursor.js" defer></script>
    <script src="/articulo.js" defer></script>
</body>

</html>
`;
}

function replaceBetween(file, start, end, content) {
  const path = join(DOCS, file);
  const src = readFileSync(path, 'utf8');
  const from = src.indexOf(start);
  const to = src.indexOf(end);
  if (from < 0 || to < 0) throw new Error(`${file}: faltan los marcadores ${start}`);
  writeFileSync(path, `${src.slice(0, from + start.length)}\n${content}\n${src.slice(to)}`);
}

function renderHomeEntries(articles, english) {
  return articles.map((a) => `                    <div class="p-4 rounded-md bg-transparent hover:bg-blue-hover transition group">
                        <h3 class="text-lg font-semibold group-hover:text-blue-txt transition-colors text-white"><a href="/articulos/${a.slug}"${english ? ' hreflang="es" lang="es"' : ''}>${esc(a.titulo)}</a></h3>
                        <p class="text-base text-gray-txt">${english ? `${a.dateEn} · In Spanish` : a.dateEs}</p>
                        <p class="mt-2 text-base text-gray-txt"${english ? ' lang="es"' : ''}>${esc(a.descripcion)}</p>
                    </div>`).join('\n');
}

function build() {
  const articles = loadArticles();
  mkdirSync(join(DOCS, 'articulos'), { recursive: true });
  for (const a of articles) writeFileSync(join(DOCS, 'articulos', `${a.slug}.html`), renderPage(a));
  replaceBetween('es.html', '<!-- articulos:start -->', '<!-- articulos:end -->', renderHomeEntries(articles, false));
  replaceBetween('index.html', '<!-- articulos:start -->', '<!-- articulos:end -->', renderHomeEntries(articles, true));
  replaceBetween('sitemap.xml', '<!-- articulos:start -->', '<!-- articulos:end -->', articles.map((a) => `  <url>
    <loc>${SITE}/articulos/${a.slug}</loc>
    <lastmod>${a.fecha}</lastmod>
  </url>`).join('\n'));
  console.log(`${articles.length} artículo(s) generados`);
}

const [command, ...args] = process.argv.slice(2);
if (command === 'importar') importar(...args);
else if (command === 'build') build();
else throw new Error('Uso: articulos.mjs importar <registro.md> <slug> | build');
