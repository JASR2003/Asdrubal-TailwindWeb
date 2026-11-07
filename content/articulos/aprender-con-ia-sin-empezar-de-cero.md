---
titulo: Una me enseña, otra me hace construir y otra me interroga: así aprendo con IA sin empezar de cero
titulo_seo: Aprender con IA sin empezar de cero: /teach, VibeWise y /grilling
fecha: 2026-11-05
actualizado: 2026-11-07
descripcion: Cómo uso /teach, VibeWise y /grilling para aprender con IA: qué hace cada una, mis ejemplos y dónde se queda corta.
destacado: sin empezar de cero
secciones: Fluidez, Teach, VibeWise, Grilling, De un vistazo, Cómo se combinan, Instalar, Cierre, Glosario
imagen_social: og-image-aprender-con-ia-sin-empezar-de-cero.png
link_linkedin:
link_x:
---

Antes, cada vez que quería aprender algo con IA, tenía que pasarle todo el contexto de nuevo. Siempre se repetían las cosas.

Hoy aprendo con tres skills de Claude Code, y ya no empiezo de cero.

Te cuento cómo hago para aprender de verdad con IA y no solo sentir que entiendo.

Este artículo es para ingenieros de software que ya programan con IA y quieren aprender de verdad con ella. También es para quien, como yo, quiere pasar a AI Engineering. Asume que conoces Claude Code y RAG a nivel básico.

Cuento cómo uso tres skills: `/teach`, `/grilling` y VibeWise, con mis propios ejemplos. No es una guía de instalación: al final dejo los comandos de sus README. Cuento lo que me ha funcionado a mí y dónde se queda corto. Los términos que uso están en el glosario del final.

## Antes de las herramientas: fluidez y almacenamiento

Sentir que entiendes no es entender. Es la idea que más pesa en cómo aprendo, y viene de la documentación de `/teach`:

> {en} "Fluency can give the user an illusory sense of mastery, but storage strength is the real goal."
>
> Traducción: «La fluidez puede darle al usuario una sensación ilusoria de dominio, pero la meta real es la fuerza de almacenamiento.»
>
> Fuente: [SKILL.md de teach](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/teach/SKILL.md)

A mí me ha pasado con precision y recall, dos métricas de retrieval, la parte de un sistema de IA que busca documentos relevantes. Imagina que le pides libros sobre un tema a una bibliotecaria. Precision responde: de los libros que me trajo, ¿cuántos servían? Recall responde: de todos los libros que servían en la biblioteca, ¿cuántos me trajo?

Se confunden fácilmente. En mi caso, entendía la idea, pero el nombre y la fórmula todavía no los tenía automatizados. Sentir que sabes algo y poder recuperarlo sin ayuda no son lo mismo. Para entender algo de verdad, en mi opinión, hay que entenderlo de forma profunda.

Por eso aplico la técnica de Feynman, que ya usaba mucho antes de la inteligencia artificial. Lo que cambió es que ahora `/teach` me ayuda recordándome cómo entender, y tengo menos carga cognitiva sobre acordarme de aplicarla.

## `/teach`: tres usos distintos

### Qué es y cómo se ve por dentro

Si abro un workspace de `/teach`, veo varias cosas. Veo los learning records, que son registros de aprendizaje y muestran mi progreso como aprendiz. También veo la lista de lecciones, numeradas desde la 0001. Mostré un curso entero por dentro en otro artículo: [Cómo /teach convierte «quiero aprender» en una misión](https://asdrubalivan.com/articulos/teach-convierte-quiero-aprender-en-una-mision).

Algo muy importante para mí es que `/teach` cita fuentes en cada lección. Antes de enseñar, busca recursos de alta confianza y comprueba con ellos que lo que va a decir es verdad. Eso reduce las alucinaciones. Lo dice su documentación:

> {en} "It does not teach from what the model already knows. It treats parametric knowledge as untrusted. Before it teaches, it finds high-trust resources, records them in `RESOURCES.md`, and cites them inside every lesson."
>
> Traducción: «No enseña a partir de lo que el modelo ya sabe. Trata el conocimiento paramétrico como no confiable. Antes de enseñar, busca recursos de alta confianza, los registra en `RESOURCES.md` y los cita dentro de cada lección.»
>
> Fuente: [docs de teach](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/productivity/teach.md)

El conocimiento paramétrico es lo que el modelo «sabe» de su entrenamiento, sin consultar una fuente.

Monté un repo aparte para aprender, con una carpeta por tema. Los tres de este artículo son AI Engineering, ucraniano y LeetCode. Prefiero un solo repo porque voy a tener muchos aprendizajes, y un repo por cada uno me parece impráctico. Entre los tres suman más de 70 lecciones, más de 180 registros de aprendizaje y más de 30 referencias.

### Tres usos

Ahora estoy usando `/teach` con AI Engineering para ir pasando de Backend Engineer a AI Engineer. Ahora bien, ¿qué es lo que me está dando `/teach`? Básicamente un camino ordenado para llegar a trabajar como AI Engineer.

Por ejemplo, `/teach` me empezó a hacer un conjunto de lecciones para aprender RAG. Hay conceptos como recall y precision, y una lección cubre los dos.

Con precision y recall me pasó algo que no esperaba. Cuando me pusieron a prueba con definiciones puras, tipo qué pregunta Precision@K (los primeros K resultados que se traen) o cuál es el denominador de Recall@K, las cuatro respuestas me salieron mal.

Pero cuando me pidieron aplicarlo, con números y con ejemplos, acerté siete de ocho. Siento que entendía la idea, pero todavía no tenía el nombre ni la fórmula automatizados.

Como la definición me parecía muy abstracta, traje un video de clasificación binaria con manzanas y naranjas, y después reconstruí precision y recall con mi propio corpus de dos chunks (dos fragmentos de texto), sin que me dieran la fórmula.

Por otra parte, estoy usando `/teach` con el ucraniano. Primero hice un examen diagnóstico del idioma usando ChatGPT, para que la IA tuviese un conocimiento previo de mi nivel. A partir de ahí empecé a estudiar diferentes lecciones de gramática y de palabras o frases que me estaban costando. A veces `/teach` me armaba una lección sobre una frase, o sobre varias, que me estaban costando.

En el caso de LeetCode, lo estoy usando para aprender patrones y para que no se me oxide el codear a mano. También lo hago porque algunos procesos de selección lo exigen.

### Lo que registra

Cuando abro un learning record, lo primero que veo es en qué fallé. Después veo el análisis: mi intuición, el nombre y la fórmula, todo detallado por separado. En el curso que hago de AI engineering hay un registro de precision y recall donde el skill anotó que mi intuición estaba bien y que lo flojo eran el nombre y la fórmula. Incluso dejó un truco para recordarlas:

> "precision mira **hacia adentro** de lo que recuperó (denominador K), recall mira **hacia afuera**, al universo relevante completo (denominador = total relevantes)."
>
> Fuente: learning record de mi workspace de AI Engineering (privado, sin enlace)

Me sirve que quede escrito lo que corregí, porque así `/teach` no me repite la misma lección. Ese era el gran problema que tenía con los modos de estudio de ChatGPT y de Claude. Normalmente yo no leo mucho los registros, pero `/teach` los usa para decidir qué enseñarme después.

![Ciclo de un workspace de /teach: la misión y las fuentes alimentan una lección, los ejercicios producen un learning record con lo que fallé y lo que ya sé, y ese registro decide la siguiente lección.](03-ciclo-teach.svg)

*El learning record decide la siguiente lección, por eso `/teach` no repite lo que ya corregí.*

### Dónde se queda corto y cómo lo cubro

`/teach` se queda corto en tres cosas, y las tres aparecen en su documentación. La primera es que no evalúa tu nivel inicial:

> {en} "There is no assessment step. `teach` infers your level from the mission and the learning records, and in session one there are no learning records."
>
> Traducción: «No hay un paso de evaluación. `teach` deduce tu nivel a partir de la misión y de los learning records, y en la primera sesión no hay learning records.»
>
> Fuente: [docs de teach](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/productivity/teach.md)

La misión es la meta del tema, que `/teach` guarda en `MISSION.md`. Lo cubro con un examen diagnóstico antes de empezar. En ucraniano lo hice con ChatGPT, por tres razones. Antes ya hacía mucho de mi aprendizaje ahí, con prompts sueltos. Su búsqueda en la web, en mi experiencia, funcionaba bastante bien. Y su modo de pensamiento alto me sale barato con mi suscripción de $20. Le pedí un examen de 50 preguntas, al estilo del Marco Común Europeo de Referencia para las Lenguas, en tandas de cinco frases, para detectar mis errores de gramática. Lo hizo con búsqueda en la web, apoyándose en fuentes de internet.

La segunda es que no agenda repasos ni se conecta con Anki. Para eso uso un skill de Anki propio. En ucraniano, su descripción dice:

> "Revisa las tarjetas de Anki difíciles y fáciles de hoy en el curso de ucraniano, las compara con los últimos días para detectar patrones, y sugiere pasarlo a /teach si amerita."
>
> Fuente: skill `anki-review` de mi workspace de ucraniano (privado, sin enlace)

La tercera es que puede inventar. Cuando eso me preocupa, abro la fuente que cita la lección o ejecuto el código.

Y quiero dejar algo claro: el humano no se reemplaza. Esto es un complemento. Para el ucraniano, además, tengo una profesora en italki.

## VibeWise para decidir

### Qué es

VibeWise es un plugin de Claude Code, creado por Noah Kim, para aprender mientras la IA escribe el código que tú diseñas. Su README lo dice así:

> {en} "A plugin for Claude Code and Codex that puts learning first and keeps you in control while AI writes the code you designed. The AI asks for your approach first, helps you examine tradeoffs, and explains unfamiliar concepts."
>
> Traducción: «Un plugin para Claude Code y Codex que pone el aprendizaje primero y te mantiene en control mientras la IA escribe el código que tú diseñaste. La IA te pide primero tu enfoque, te ayuda a examinar las ventajas y desventajas de cada opción y explica los conceptos que no conoces.»
>
> Fuente: [README de VibeWise](https://github.com/nykooi1/vibe-wise/blob/eefb53df406ab89e31444684ff32c1df205221f8/README.md)

La primera vez que entro a VibeWise, le doy `/vibe-wise:learn` dentro del proyecto. Primero me pregunta qué estoy haciendo, y después mi nivel como programador: principiante, intermedio o avanzado. Por lo general le digo que soy avanzado, pero le describo en detalle dónde tengo gaps. En SupportPilot le dije que soy avanzado en programación y que quería aprender RAG mientras construía. Lo planteé así a propósito, para que el agente me retara y evaluara mejor mis conocimientos de RAG, que quería repasar. También elegí la frecuencia Light, porque quería una entrega ese mismo día.

Después, cada vez que hago una iteración, VibeWise me obliga a construir algo y me guía con tres tipos de checkpoint, que no son paradas obligatorias:

> {en} "Build checkpoint: ask how the learner would approach the problem."
>
> Traducción: «Checkpoint de Build: pregunta cómo abordaría el problema quien está aprendiendo.»
>
> Fuente: [behavior.md de VibeWise](https://github.com/nykooi1/vibe-wise/blob/eefb53df406ab89e31444684ff32c1df205221f8/skills/learn/behavior.md)

En Build me pregunta cómo abordaría el problema. En Design resume la propuesta. Y el código solo se escribe cuando autorizo el checkpoint de Implementation.

La diferencia con pedirle a la IA que escriba el código directamente es que a la implementación llego sabiendo qué voy a hacer.

![Flujo de VibeWise: Build pregunta mi enfoque, Design resume la propuesta y confirmo sin autorizar código, Implementation describe el paso y solo cuando lo autorizo la IA escribe el código; lo demostrado y lo que necesita refuerzo se anota en progress.md.](02-flujo-vibewise.svg)

*El código se escribe solo después de que autorizo ese paso en el checkpoint de Implementation, y lo que quedó demostrado se anota en `progress.md`. Los checkpoints no son paradas obligatorias: según la frecuencia hay más o menos.*

### Las decisiones de SupportPilot

El skill VibeWise, en el proyecto SupportPilot, fue anotando mis sesiones de desarrollo. Así pude ver cómo iba mi aprendizaje y mi proceso de pensamiento al mismo tiempo.

Por ejemplo, con VibeWise yo decidí usar una tool fija para un agente (una función que el agente puede llamar, como consultar un pedido), en lugar de text-to-SQL, es decir, pedirle al modelo que convierta la pregunta en una consulta SQL. VibeWise anotó que la elegí por ser más segura. La razón concreta quedó en el README del proyecto: el `customer_id` queda capturado en la herramienta y nunca es un argumento, así que el modelo no puede pedir los pedidos de otro cliente.

Otra decisión fue dónde viaja la identidad del cliente. En mi documentación de SupportPilot lo dejé escrito así:

> {en} "Identity on the connection, not in tool arguments, chosen after a diagram of both channels."
>
> Traducción: «La identidad va en la conexión, no en los argumentos de la herramienta; se eligió después de un diagrama de ambos canales.»
>
> Fuente: [AI_ASSISTED_DEVELOPMENT.md de SupportPilot](https://github.com/asdrubalivan/supportpilot/blob/e5817127325fe1d2d68c23faecb269ca864e6d99/AI_ASSISTED_DEVELOPMENT.md)

Es decir, que cada vez que el agente llamara a una herramienta, antes habría una validación de la conexión para verificar que estás usando la identidad que se supone que tienes que usar.

También tuve que decidir sobre un conjunto de datos para probar mis resultados. Esto, por cierto, me hizo decidir sobre usar búsqueda por vectores en vez de usar búsquedas híbridas. Curiosamente, la búsqueda por vectores sola me dejó mejores resultados con inglés normal.

Esa decisión también quedó en mi documentación:

> {en} "…a robustness set (English and English with typos) to decide between hybrid and vector; vector chosen from those results."
>
> Traducción: «…un set de robustez (inglés e inglés con typos) para decidir entre híbrida y vectores; se eligió vectores a partir de esos resultados.»
>
> Fuente: [AI_ASSISTED_DEVELOPMENT.md de SupportPilot](https://github.com/asdrubalivan/supportpilot/blob/e5817127325fe1d2d68c23faecb269ca864e6d99/AI_ASSISTED_DEVELOPMENT.md)

Además decidí, por otra parte, no tener atajos de autenticación para los evals, las pruebas automáticas con las que mido qué tan bien responde el agente: un modo en el que se confía en el header permitiría suplantar a cualquier cliente si se quedaba encendido. Los evals generan sus propios tokens y pasan por el mismo verificador.

### Lo que registró

Esto quedó anotado en el `progress.md` de VibeWise sobre mi decisión entre búsqueda híbrida y búsqueda por vectores:

```markdown {en}
## Retrieval mode decision
- Demonstrated: proposed a robustness test set to discriminate methods when golden cases tied; switched to vector citing eval evidence; scoped variants to English for now.
- Needs reinforcement: justification 'the evals said so' without noting small n.
```

> Traducción:
>
> ## Decisión del modo de recuperación
> - Demostrado: propuso un set de robustez para discriminar entre métodos cuando los casos golden empataban; cambió a vectores citando la evidencia de los evals; limitó las variantes a inglés por ahora.
> - Necesita refuerzo: la justificación «los evals lo dijeron», sin señalar que la muestra (n) es pequeña.

El registro dice que yo propuse un set de robustez cuando los casos golden empataron. La IA escribió el primer borrador de las preguntas y yo las revisé. Pedí versiones en inglés normal y en inglés con typos, para verificar si con typos mi sistema funcionaba.

Yo esperaba que ganara la búsqueda híbrida, porque además de la parte semántica tiene un componente léxico y no fue así. En inglés normal, la búsqueda por vectores sacó 1.00 de recall@4 y la híbrida 0.81. Con typos empataron en 0.94. Por eso cambié a búsqueda por vectores.

El registro también anotó que mi justificación fue «los evals lo dijeron», sin decir que la muestra es pequeña: 8 intenciones por cada versión, inglés normal e inglés con typos. En el README quedó escrito que el resultado es orientativo, no concluyente.

### Dónde se queda corto

Un login CSRF es un ataque en el que otra persona hace que tu navegador termine un login que ella inició. En mi documentación de SupportPilot también dejé escrito un límite del modo:

> {en} "It also added one thing beyond what I approved: the `sp_login` cookie, which binds a login to the browser that started it (login CSRF). I understood it only after a walk-through."
>
> Traducción: «También añadió una cosa más allá de lo que aprobé: la cookie `sp_login`, que vincula un login con el navegador que lo inició (login CSRF). Solo la entendí después de un walk-through.»
>
> Fuente: [AI_ASSISTED_DEVELOPMENT.md de SupportPilot](https://github.com/asdrubalivan/supportpilot/blob/e5817127325fe1d2d68c23faecb269ca864e6d99/AI_ASSISTED_DEVELOPMENT.md)

La IA añadió una cookie que yo no había aprobado, y solo la pude entender haciendo un walkthrough. Al final me hizo entender lo que hacía la cookie y, aparte de todo, destapó una laguna de conocimiento sobre el login CSRF. La reforcé con una explicación de la double submit cookie, una defensa en la que el mismo valor viaja en una cookie y en la petición, y el servidor exige que coincidan, y con un video.

## `/grilling`: que me interroguen antes de decidir

`/grilling` es un skill de Matt Pocock que te interroga sin descanso hasta llegar a un entendimiento compartido:

> {en} "Interview the user relentlessly until you reach a shared understanding."
>
> Traducción: «Entrevista al usuario sin descanso hasta llegar a un entendimiento compartido.»
>
> Fuente: [SKILL.md de grilling](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md)

En mi experiencia `/teach` cubre casi todos los casos, pero no siempre. A veces quiero diseñar el contenido de una lección a mi gusto. Ahí me sirve `/grilling`.

Un ejemplo es una lección de LeetCode sobre recorridos en grids. Antes de que `/teach` la construyera, la diseñé con `/grilling` en vez de dejar que la IA asumiera el diseño: dos rondas de preguntas, cada una con su recomendación. Una de mis decisiones fue distinta de lo que me recomendaron: agregué BFS sobre grid, que no estaba en el plan original.

Cuando `/grilling` me interroga sin darme la respuesta, se siente distinto a `/teach` porque el objetivo es distinto. Con `/grilling`, el objetivo es llegar a un acuerdo entre la IA y yo, que soy el orquestador. Con `/teach`, el objetivo es que yo aprenda. Por eso uso `/grilling` seguido en mis proyectos, pero no tanto con `/teach` como tal.

## De un vistazo

| | `/teach` | VibeWise | `/grilling` |
|---|---|---|---|
| Para qué lo uso | Aprender un tema entero | Aprender mientras construyo un proyecto | Llegar a un acuerdo entre la IA y yo |
| Cómo funciona | Divide el tema en lecciones con fuentes citadas y registra mi progreso | Me pregunta mi enfoque en checkpoints (Build, Design, Implementation) antes de escribir código | Me interroga hasta llegar a un entendimiento compartido |
| Qué deja escrito | Learning records en el workspace | `progress.md` en `.vibe-wise/` | Nada propio: las decisiones quedan en el `CURRICULUM.md` (el plan) o el `NOTES.md` (las notas) del workspace donde lo corro |
| Dónde lo uso | AI Engineering, ucraniano y LeetCode | SupportPilot | El diseño de una lección y las decisiones de un proyecto |
| Dónde se queda corto | No evalúa mi nivel inicial, no agenda repasos y puede inventar | Confirmar no demuestra que entendí | Su objetivo es el acuerdo, no que yo aprenda |

![Mapa de las tres herramientas: según lo que necesito, uso VibeWise para entender lo que construyo, /teach para aprender un tema entero o /grilling para acordar un diseño; /grilling diseña las lecciones de /teach y planeo llevar las lagunas de VibeWise a /teach.](01-mapa-tres-herramientas.svg)

*Según lo que necesito: VibeWise para entender lo que construyo, `/teach` para aprender un tema entero y `/grilling` para acordar un diseño. La línea punteada es lo que planeo hacer y todavía no he hecho.*

### Cuándo elegir cada una

Si alguien quiere aprender un tema entero, como RAG, le recomiendo `/teach`. Te lo divide en varias lecciones y cada lección se adapta a tus objetivos de aprendizaje.

Si en cambio estás construyendo una app y no entiendes bien lo que la IA te escribe, te recomiendo VibeWise. Así puedes hacer modificaciones a la app bien pensadas, de forma práctica y según tu nivel de aprendizaje.

Con `/teach` no se me ocurre un caso donde no lo recomendaría. VibeWise, en cambio, solo lo recomiendo para ingeniería de software. Tengo pendiente probarlo con temas que no sean de ingeniería de software, pero por ahora no lo tengo claro.

## Cómo se combinan

Hasta el momento no he pasado nada de VibeWise a `/teach`, pero es algo que planeo hacer en el futuro. ¿Cómo lo haría? Las lagunas que VibeWise anota en SupportPilot, como la diferencia entre HttpOnly y SameSite, que salieron mientras construía el login, me permiten crear un curso separado en `/teach` que me permite trabajarlas con más calma. Son dos atributos de una cookie: HttpOnly impide que el JavaScript de la página la lea, y SameSite controla si el navegador la envía en peticiones que vienen de otros sitios.

¿Qué haría en ese caso? Le diría: «`/teach`, créame un mini taller en el que pueda aprender la diferencia entre HttpOnly y SameSite, de forma que lo aprenda en una hora», por ejemplo.

## Si quieres probarlas

Si quieres instalarlas, estos son los comandos que aparecen en sus README:

```bash
# /teach y /grilling (skills de Matt Pocock)
claude plugin install mattpocock-skills@claude-plugins-official

# VibeWise (de Noah Kim)
/plugin install vibe-wise@anthropic-plugin-directory
```

Fuente: [README de mattpocock/skills](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/README.md) y [README de VibeWise](https://github.com/nykooi1/vibe-wise/blob/eefb53df406ab89e31444684ff32c1df205221f8/README.md)

## Cierre

Si las pruebas, me encantaría saber qué usas tú para aprender. Y si te gustaría un post con más detalle sobre cómo decidí entre búsqueda por vectores y búsqueda híbrida, házmelo saber.

## Glosario rápido

- **Skill:** instrucciones empaquetadas que le dan a Claude Code una forma de trabajar para un tipo de tarea; se invoca con un comando como `/teach`.
- **`/teach`:** skill de Matt Pocock que arma una carpeta por tema y te enseña en lecciones cortas, con fuentes citadas.
- **VibeWise:** plugin de Claude Code, de Noah Kim, para aprender mientras la IA escribe el código que tú diseñas: antes de cada pieza te pide tu enfoque.
- **`/grilling`:** skill de Matt Pocock que te interroga hasta llegar a un entendimiento compartido.
- **Workspace:** la carpeta de `/teach` dedicada a un solo tema, con sus lecciones y sus registros.
- **Learning record:** archivo donde `/teach` anota lo que fallaste, lo que ya sabes y lo que aprendiste, y que usa en las siguientes lecciones.
- **Checkpoint (Build, Design, Implementation):** momento en que VibeWise se detiene a preguntarte antes de seguir. En Build te pregunta cómo abordarías el problema, en Design te resume la propuesta y en Implementation te pide autorizar el código de ese paso.
- **Frecuencia (Light, Normal, Frequent):** cuántas veces te frena VibeWise con checkpoints. Light solo en las decisiones grandes y Frequent también en las pequeñas.
- **`progress.md`:** archivo que VibeWise guarda en la carpeta `.vibe-wise/` del proyecto, con lo que fuiste demostrando, decidiendo y reforzando.
- **SupportPilot:** proyecto mío, público en GitHub: un agente de soporte que responde preguntas sobre las políticas de una empresa ficticia, con citas, y consulta pedidos.
- **Búsqueda por vectores y búsqueda híbrida:** la primera busca por significado, comparando representaciones numéricas del texto; la segunda la combina con una búsqueda por palabras exactas.
- **Caso golden:** pregunta de prueba cuya respuesta o fuentes esperadas ya están definidas.
- **Intención:** lo que quiere saber un cliente en SupportPilot; cada intención de mis pruebas tiene una versión en inglés normal y otra con typos.
- **Técnica de Feynman:** estudiar explicando el tema con palabras sencillas, como si se lo contaras a alguien que no sabe, para encontrar dónde no lo entiendes.
