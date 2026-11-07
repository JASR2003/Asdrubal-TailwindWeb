---
titulo: Cómo /teach convierte «quiero aprender» en una misión
fecha: 2026-11-07
descripcion: Cómo se ve por dentro un curso de Python desde cero hecho con él
secciones: Cualquier cosa, La misión, Después, Por dentro, El minicurso
link_linkedin:
link_x:
---

## Se puede usar para cualquier cosa

`/teach` es un skill de Matt Pocock. Aquí está el skill original en AI Hero: [https://www.aihero.dev/skills-teach](https://www.aihero.dev/skills-teach). Lo puedes usar para aprender muchas cosas. Yo lo he usado para aprender: Ucraniano (38 lecciones), LeetCode (24) y AI Engineering (14).

En este artículo muestro cómo `/teach` convierte tres preguntas en una misión, y cómo se ve por dentro un curso hecho con él. Asumo que ya usas Claude Code o Codex. No necesitas saber Python.

Ahora te voy a mostrar un curso de Python desde cero hecho por `/teach`, que es un ejemplo de lo que `/teach` podría hacer para enseñarte, en este caso, a programar, pero lo puedes usar para cualquier cosa.

## La misión primero

`/teach`, al momento de empezar a hacer el curso, me hizo 3 preguntas. Las respondí como lo haría un principiante, no con mi experiencia real:

- «¿Para qué quieres aprender Python? Es decir, ¿qué quieres poder hacer cuando lo sepas?» → Automatizar tareas.
- «¿Cuánto tiempo puedes dedicarle y cuál es tu experiencia previa programando?» → Cero experiencia, ~30 min/día.
- «¿Cuál es la primera tarea concreta que te gustaría automatizar con Python?» → Web.

Con eso `/teach` escribió la misión: automatizar tareas web, con unos 30 minutos al día y empezando de cero.

La idea de las preguntas es que el skill sepa dirigirse a lo que tú necesitas. Y esto es una gran ventaja frente a aprender solo con libros. No es que esté en contra de los libros, por cierto; es que así saltas primero a lo más importante. Entonces, si por ejemplo tienes que aprender una tecnología en 48 horas, al menos a nivel básico, `/teach` te puede dar primero lo básico. Y una vez pasadas esas 48 horas, puede empezar a darte lo más detallado.

## Lo que hace /teach después

Otra cosa que siempre veo en `/teach` es que, por lo general, cada lección enseña una sola idea, y esa idea clave te la vas a llevar. Por ejemplo, en LeetCode una lección me enseñó una sola idea: hash maps. En el curso de Python, la primera lección es hacer un «Hola mundo». Además, `/teach` me muestra las fuentes por si quiero leer más a fondo, y un bloque de recuperación con cosas de la lección anterior, para aumentar mi fluidez.

## Cómo se ve por dentro

Esto es lo que `/teach` deja en la carpeta del curso. Por eso puedo seguir otro día donde me quedé.

```tree
minicurso-python-teach/
├── assets/
│   ├── quiz.js
│   └── style.css
├── learning-records/
│   └── 0001-punto-de-partida.md
├── lessons/
│   ├── 0001-tu-primer-script.html
│   └── 0002-preguntar-y-convertir.html
├── reference/
│   └── python-basicos.html
├── MISSION.md
├── NOTES.md
└── RESOURCES.md
```

Si quieres saber más de los learning records (la carpeta `learning-records/`), los explico en detalle en [mi artículo largo sobre cómo aprendo con IA sin empezar de cero](https://asdrubalivan.com/articulos/aprender-con-ia-sin-empezar-de-cero).

Así abre la lección 2: me pide recordar la lección 1 antes de seguir.

![Captura de la lección 2 del minicurso: el encabezado «Antes de seguir: recupera la lección 1» y una pregunta con el código sitio = "python.org" y print("https://" + sitio), con un campo de respuesta y un botón Comprobar.](leccion-2-recuperacion.png)

## El minicurso y su límite honesto

El minicurso es un ejemplo para que veas cómo es un curso real de `/teach`, en este caso de Python. El límite es que este es el comienzo de un camino de unas 10 lecciones y todavía no llegué a automatizar la tarea web con la que termina el curso. ¿Cómo se estudia? Las lecciones traen práctica, no son solo un documento de lectura. Y en este caso están pensadas para alguien que usa macOS, pero `/teach`, dependiendo de lo que uses, adapta las lecciones a ti. Recuerda que es solo un ejemplo. Te dejo el link del minicurso para que lo puedas ver con calma: [https://asdrubalivan.com/minicurso-python/](https://asdrubalivan.com/minicurso-python/)
