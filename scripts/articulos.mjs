// Artículos del sitio: importa registros publicados y genera sus páginas estáticas.
//   node scripts/articulos.mjs importar <registro.md> <slug>
//   node scripts/articulos.mjs build
// Originales en content/articulos (español) y traducciones en content/articles (inglés).
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content/articulos');
const CONTENT_EN = join(ROOT, 'content/articles');
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

// Textos de la plantilla por idioma. El español es el original; el inglés siempre es una traducción.
const TEXTS = {
  es: {
    dir: 'articulos',
    locale: 'es_LA',
    ogImage: 'og-image-es.png',
    home: '/es',
    role: 'Asdrúbal Suárez · Ingeniero de Backend Senior',
    cta: 'Ver perfil y contacto',
    sectionsLabel: 'Secciones del artículo',
    languageLabel: 'Idioma del artículo',
    sectionId: 'seccion',
    codeLabels: { python: 'Python', ts: 'TypeScript', text: 'Salida del test' },
    and: ' y ',
    source: (links) => (links ? `<p>Publicado también en ${links}.</p>` : ''),
    notice: () => '',
  },
  en: {
    dir: 'articles',
    locale: 'en_US',
    ogImage: 'og-image.png',
    home: '/',
    role: 'Asdrúbal Suárez · Senior Backend Engineer',
    cta: 'View profile and contact',
    sectionsLabel: 'Article sections',
    languageLabel: 'Article language',
    sectionId: 'section',
    codeLabels: { python: 'Python', ts: 'TypeScript', text: 'Test output' },
    and: ' and ',
    source: (links) => `<p>Originally published in Spanish${links ? ` on ${links}` : ''}.</p>`,
    notice: (original) => `<p class="mb-8 text-sm">This is a machine translation that I reviewed. Read the <a class="enlace" href="${pathOf(original)}" hreflang="es">Spanish original</a>.</p>\n`,
  },
};

const pathOf = (a) => `/${TEXTS[a.lang].dir}/${a.slug}`;

function renderBody(blocks, t) {
  const lastP = blocks.map((b) => b.type).lastIndexOf('p');
  let section = 0;
  return blocks.map((b, i) => {
    if (b.type === 'heading') return `<h2 id="${t.sectionId}-${++section}">${inline(b.text)}</h2>`;
    if (b.type === 'p') return `<p${i === lastP ? ' class="cierre"' : ''}>${inline(b.text)}</p>`;
    const output = b.lang === 'text' ? ' class="salida"' : '';
    return `<pre${output} tabindex="0" role="region" aria-label="${attr(t.codeLabels[b.lang] ?? b.lang)}"><code>${esc(b.text)}</code></pre>`;
  }).join('\n');
}

function readArticles(dir, lang) {
  if (!existsSync(dir)) return [];
  const folder = `content/${dir.split('/').pop()}`;
  return readdirSync(dir).filter((f) => f.endsWith('.md')).map((file) => {
    const { meta, body } = parseFrontmatter(readFileSync(join(dir, file), 'utf8'));
    for (const key of ['titulo', 'fecha', 'descripcion']) {
      if (!meta[key]) throw new Error(`${folder}/${file}: falta ${key}`);
    }
    const date = new Date(`${meta.fecha}T12:00:00Z`);
    const format = (locale) => new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
    return { ...meta, lang, slug: file.replace(/\.md$/, ''), body, dateEs: format('es'), dateEn: format('en') };
  });
}

// Devuelve los originales en español y sus traducciones, enlazados entre sí.
function loadArticles() {
  const originals = readArticles(CONTENT, 'es').sort((a, b) => b.fecha.localeCompare(a.fecha));
  const translations = readArticles(CONTENT_EN, 'en');
  for (const t of translations) {
    const file = `content/articles/${t.slug}.md`;
    if (!t.traduccion_de) throw new Error(`${file}: falta traduccion_de (el slug del original en content/articulos)`);
    const original = originals.find((a) => a.slug === t.traduccion_de);
    if (!original) throw new Error(`${file}: traduccion_de apunta a "${t.traduccion_de}", pero no existe content/articulos/${t.traduccion_de}.md`);
    if (original.traduccion) throw new Error(`${file}: content/articulos/${original.slug}.md ya tiene traducción en content/articles/${original.traduccion.slug}.md`);
    t.original = original;
    original.traduccion = t;
  }
  return { originals, translations };
}

function renderTitle({ titulo, destacado }) {
  const title = esc(titulo);
  return destacado ? title.replace(esc(destacado), `<strong>${esc(destacado)}</strong>`) : title;
}

function renderLanguageLinks(a, t) {
  const pair = a.original ?? a.traduccion;
  if (!pair) return '';
  const [en, es] = a.lang === 'en' ? [a, pair] : [pair, a];
  const link = (target, text, label) => {
    const current = target === a;
    return `<a href="${pathOf(target)}" hreflang="${target.lang}" lang="${target.lang}" aria-label="${label}"${current ? ' aria-current="page"' : ''} class="py-2 -my-2 px-2 -mx-2 text-lg font-bold uppercase ${current ? 'text-blue-txt' : 'text-gray-txt hover:text-blue-txt'}">${text}</a>`;
  };
  // No va en un <nav>: articulo.js y los estilos de .articulo-panel nav tratan esos enlaces como secciones.
  return `
<div class="flex items-center gap-4" role="group" aria-label="${t.languageLabel}">
${link(en, 'ENG', 'ENG (English)')}
${link(es, 'ESP', 'ESP (Español)')}
</div>`;
}

function renderAlternates(a) {
  const original = a.original ?? a;
  if (!original.traduccion) return '';
  return `
    <link rel="alternate" hreflang="es" href="${SITE}${pathOf(original)}">
    <link rel="alternate" hreflang="en" href="${SITE}${pathOf(original.traduccion)}">
    <link rel="alternate" hreflang="x-default" href="${SITE}${pathOf(original)}">`;
}

function renderPage(a) {
  const t = TEXTS[a.lang];
  const url = `${SITE}${pathOf(a)}`;
  const linkedin = a.link_linkedin || a.original?.link_linkedin;
  const x = a.link_x || a.original?.link_x;
  const links = [linkedin, x].filter(Boolean);
  const blocks = parseBody(a.body);
  const headings = blocks.filter((b) => b.type === 'heading');
  const labels = a.secciones ? a.secciones.split(',').map((s) => s.trim()) : [];
  const nav = headings.length ? `<nav aria-label="${t.sectionsLabel}">
${headings.map((h, i) => `<a href="#${t.sectionId}-${i + 1}"><span class="linea"></span>${esc(labels[i] ?? h.text)}</a>`).join('\n')}
</nav>` : '';
  const sources = [
    linkedin && `<a class="enlace" href="${attr(linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    x && `<a class="enlace" href="${attr(x)}" target="_blank" rel="noopener">X</a>`,
  ].filter(Boolean).join(t.and);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.titulo,
    description: a.descripcion,
    datePublished: a.fecha,
    inLanguage: a.lang,
    url,
    author: { '@id': `${SITE}/#person`, '@type': 'Person', name: 'Asdrúbal Suárez', url: `${SITE}/` },
    // LinkedIn y X publican el original, así que en una traducción describen a la obra traducida.
    ...(a.original
      ? { translationOfWork: { '@type': 'Article', headline: a.original.titulo, inLanguage: 'es', url: `${SITE}${pathOf(a.original)}`, sameAs: links } }
      : { sameAs: links }),
  };
  return `<!doctype html>
<html lang="${a.lang}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(a.titulo)} | Asdrúbal Suárez</title>
    <meta name="description" content="${attr(a.descripcion)}">
    <meta name="robots" content="max-image-preview:large">
    <meta name="theme-color" content="#020f1e">
    <link rel="canonical" href="${url}">${renderAlternates(a)}
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Asdrúbal Suárez">
    <meta property="og:title" content="${attr(a.titulo)}">
    <meta property="og:description" content="${attr(a.descripcion)}">
    <meta property="og:url" content="${url}">
    <meta property="og:locale" content="${t.locale}">
    <meta property="og:image" content="${SITE}/png/${t.ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="article:published_time" content="${a.fecha}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@AsdrubalCodes">
    <meta name="twitter:creator" content="@AsdrubalCodes">
    <meta name="twitter:title" content="${attr(a.titulo)}">
    <meta name="twitter:description" content="${attr(a.descripcion)}">
    <meta name="twitter:image" content="${SITE}/png/${t.ogImage}">
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
<a class="logo" href="${t.home}"><img src="/png/logo.png" alt="Asdrúbal Suárez" width="1000" height="105"></a>
<h1>${renderTitle(a)}</h1>
<div class="datos">
<p><time datetime="${a.fecha}">${a.lang === 'en' ? a.dateEn : a.dateEs}</time></p>
${t.source(sources)}
</div>${renderLanguageLinks(a, t)}
${nav}
</header>
<div class="articulo-texto">
${t.notice(a.original)}${renderBody(blocks, t)}
<footer class="pie">
<p>${t.role}</p>
<a class="boton" href="${t.home}">${t.cta}</a>
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
  return articles.map((a) => {
    const shown = (english && a.traduccion) || a;
    // Sin traducción, la portada inglesa enlaza al original y avisa que está en español.
    const spanishInEnglish = english && !a.traduccion;
    return `                    <div class="p-4 rounded-md bg-transparent hover:bg-blue-hover transition group">
                        <h3 class="text-lg font-semibold group-hover:text-blue-txt transition-colors text-white"><a href="${pathOf(shown)}"${spanishInEnglish ? ' hreflang="es" lang="es"' : ''}>${esc(shown.titulo)}</a></h3>
                        <p class="text-base text-gray-txt">${english ? `${shown.dateEn}${spanishInEnglish ? ' · In Spanish' : ''}` : shown.dateEs}</p>
                        <p class="mt-2 text-base text-gray-txt"${spanishInEnglish ? ' lang="es"' : ''}>${esc(shown.descripcion)}</p>
                    </div>`;
  }).join('\n');
}

function renderSitemapEntries(articles) {
  return articles.map((a) => {
    const original = a.original ?? a;
    const alternates = original.traduccion ? `
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${pathOf(original)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${pathOf(original.traduccion)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pathOf(original)}"/>` : '';
    return `  <url>
    <loc>${SITE}${pathOf(a)}</loc>
    <lastmod>${a.fecha}</lastmod>${alternates}
  </url>`;
  }).join('\n');
}

// Las carpetas son solo de páginas generadas: lo que ya no tiene fuente se borra.
function writePages(lang, articles) {
  const dir = join(DOCS, TEXTS[lang].dir);
  mkdirSync(dir, { recursive: true });
  const expected = new Set(articles.map((a) => `${a.slug}.html`));
  for (const file of readdirSync(dir)) {
    if (file.endsWith('.html') && !expected.has(file)) rmSync(join(dir, file));
  }
  for (const a of articles) writeFileSync(join(dir, `${a.slug}.html`), renderPage(a));
}

function build() {
  const { originals, translations } = loadArticles();
  writePages('es', originals);
  writePages('en', translations);
  replaceBetween('es.html', '<!-- articulos:start -->', '<!-- articulos:end -->', renderHomeEntries(originals, false));
  replaceBetween('index.html', '<!-- articulos:start -->', '<!-- articulos:end -->', renderHomeEntries(originals, true));
  const entries = originals.flatMap((a) => (a.traduccion ? [a, a.traduccion] : [a]));
  replaceBetween('sitemap.xml', '<!-- articulos:start -->', '<!-- articulos:end -->', renderSitemapEntries(entries));
  console.log(`${originals.length} artículo(s) y ${translations.length} traducción(es) generados`);
}

const [command, ...args] = process.argv.slice(2);
if (command === 'importar') importar(...args);
else if (command === 'build') build();
else throw new Error('Uso: articulos.mjs importar <registro.md> <slug> | build');
