# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas que evalúan contratar a Asdrúbal Suárez para un empleo remoto, a tiempo completo o por contrato: fundadores, CTOs y engineering managers, además de reclutadores y hiring managers. Llegan a comprobar si su experiencia y su criterio encajan con un rol, y a decidir si le escriben.

## Product Purpose

asdrubalivan.com es el sitio profesional de Asdrúbal, en inglés y español. Existe para que quien contrata vea su criterio y su experiencia antes de una llamada. El éxito es que esa persona le escriba directamente.

El sitio declara públicamente que está disponible y buscando empleo. La consultoría y los proyectos freelance propios no son un objetivo del sitio.

## Positioning

Senior Backend Engineer con más de 14 años en software, base en Python, FastAPI y PostgreSQL, y foco en la confiabilidad de LLMs en producción. Muchos declaran esa experiencia; él la ha sostenido en un sistema real. También hace de puente entre negocio y técnica: diagnostica el problema de la empresa y lo traduce a una solución técnica.

El titular es backend, no "AI engineer". Trabaja 100% remoto desde Venezuela.

## Operating Context

Se evalúa junto a LinkedIn, el CV y el perfil de Toptal, así que debe mantenerse alineado con ellos. Los visitantes suelen revisarlo rápido, durante un proceso de selección o antes de una conversación.

## Capabilities and Constraints

- Sitio estático con páginas paralelas: `docs/index.html` (EN) y `docs/es.html` (ES). Todo cambio de contenido se aplica en ambas.
- Dominio: asdrubalivan.com (`docs/CNAME`).
- Contacto: correo (alias de reenvío `hello` del dominio, en Namecheap) y LinkedIn, al mismo nivel.
- Para reducir el spam, la dirección no se escribe en el HTML: `docs/email.js` la arma al hacer clic. No activar catch-all.

## Brand Commitments

- Nombre público: Asdrúbal Suárez. X: @AsdrubalCodes.
- Voz directa, técnica y concreta, sin tono de gurú, moralejas ni promesas infladas. Puede mostrar fallos reales, sin autocrítica ni burla de sí mismo.

## Evidence on Hand

Se pueden usar:

- **Riley, dos cambios distintos:** disponibilidad de 93% a 99% con Vertex AI como principal y Claude de respaldo; de 99% a 99,9% ajustando Gunicorn en Azure. Nunca atribuir el salto completo a un solo cambio. Las cifras se presentan solo como logro, sin describir a Riley como un sistema que fallaba.
- **Estado en Riley:** tiempo completo hasta abril de 2026; desde entonces, contrato part-time por horas.
- **Experiencia internacional:** EE. UU. (Teamitfy, consultora para startups de EE. UU.; un cliente de agtech vía TEAM International) y Europa (equipos europeos en CryptoFR, hasta 2022; hablar de esta experiencia en pasado). No contar a Riley ni a Tellen como equipos de EE. UU. mientras no esté confirmado.
- **Toptal:** miembro actual de la red. Se muestra como credencial, no como cliente ni historial laboral, y sin mencionar procesos internos.
- **Otras cifras:** consulta de PostgreSQL de unos 10 s a menos de 100 ms (aproximada); APIs para más de 10.000 usuarios; más de 1 M de trades al día en Vascar.
- **Proyecto propio:** remote-venezuela-hiring (contrataenve.com).
- **Prueba social:** recomendaciones en LinkedIn, enlazadas desde el sitio.

No usar ni inventar:

- Clientes bajo NDA o con NDA posible: no se nombran.
- Salario, tarifas o pretensiones económicas.
- Demos o experimentos presentados como experiencia de producción.
- "Diez años con equipos de EE. UU. y Europa" o "remoto desde 2016": no tienen respaldo.
- Testimonios, clientes o métricas sin fuente.
- Temas de salud personal o quejas sobre Venezuela.

## Product Principles

- El criterio se demuestra con problemas reales, causas y resultados, no con adjetivos.
- Toda afirmación debe poder sostenerse en una entrevista.
- Quien evalúa debe entender rápido qué hace, qué ha logrado y cómo escribirle.
- Inglés y español dicen lo mismo.
