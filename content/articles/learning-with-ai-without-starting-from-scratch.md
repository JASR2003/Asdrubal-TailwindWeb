---
titulo: One teaches me, another makes me build, and another grills me: how I learn with AI without starting from scratch
titulo_seo: Learn with AI Without Starting Over: /teach, VibeWise, /grilling
fecha: 2026-11-05
descripcion: How I use /teach, VibeWise and /grilling to learn with AI: what each one does, my examples and where it falls short.
destacado: without starting from scratch
secciones: Fluency, Teach, VibeWise, Grilling, At a glance, How they combine, Install, Closing, Glossary
imagen_social: og-image-learning-with-ai-without-starting-from-scratch.png
link_linkedin:
link_x:
traduccion_de: aprender-con-ia-sin-empezar-de-cero
---

Before, every time I wanted to learn something with AI, I had to hand it all the context again. I kept repeating the same things.

Today I learn with three Claude Code skills, and I no longer start from scratch.

Let me tell you how I actually learn with AI, and not just feel like I understand.

This article is for software engineers who already code with AI and want to really learn with it. It's also for anyone who, like me, wants to move into AI Engineering. It assumes you know Claude Code and RAG at a basic level.

I describe how I use three skills: `/teach`, `/grilling` and VibeWise, with my own examples. It's not an installation guide: at the end I leave the commands from their READMEs. I tell you what has worked for me and where they fall short. The terms I use are in the glossary at the end.

## Before the tools: fluency and storage

Feeling like you understand is not understanding. It's the idea that carries the most weight in how I learn, and it comes from the `/teach` documentation:

> "Fluency can give the user an illusory sense of mastery, but storage strength is the real goal."
>
> Source: [teach SKILL.md](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/teach/SKILL.md)

It has happened to me with precision and recall, two retrieval metrics, retrieval being the part of an AI system that looks for relevant documents. Imagine you ask a librarian for books on a topic. Precision answers: of the books she brought me, how many were useful? Recall answers: of all the useful books in the library, how many did she bring me?

They're easy to mix up. In my case, I understood the idea, but I didn't yet have the name and the formula automated. Feeling that you know something and being able to pull it from memory without help are not the same thing. To really understand something, in my opinion, you have to understand it deeply.

That's why I apply the Feynman technique, which I was already using long before artificial intelligence. What changed is that now `/teach` helps me by reminding me how to understand, so I spend less cognitive load remembering to apply it.

## `/teach`: three different uses

### What it is and what it looks like inside

If I open a `/teach` workspace, I see several things. I see the learning records, which track my progress as a learner. I also see the list of lessons, numbered from 0001.

Something very important to me is that `/teach` cites sources in every lesson. Before teaching, it looks for high-trust resources and uses them to check that what it's about to say is true. That reduces hallucinations. Its documentation says so:

> "It does not teach from what the model already knows. It treats parametric knowledge as untrusted. Before it teaches, it finds high-trust resources, records them in `RESOURCES.md`, and cites them inside every lesson."
>
> Source: [teach docs](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/productivity/teach.md)

Parametric knowledge is what the model "knows" from its training, without consulting a source.

I set up a separate repo for learning, with one folder per topic. The three in this article are AI Engineering, Ukrainian and LeetCode. I prefer a single repo because I'm going to have many things to learn, and a repo for each one seems impractical to me. Together, the three add up to more than 70 lessons, more than 180 learning records and more than 30 references.

### Three uses

Right now I'm using `/teach` with AI Engineering to move from Backend Engineer to AI Engineer. So what is `/teach` giving me? Basically, an ordered path toward working as an AI Engineer.

For example, `/teach` started building me a set of lessons to learn RAG. There are concepts like recall and precision, and one lesson covers both.

Something I didn't expect happened with precision and recall. When they tested me with pure definitions, like which question Precision@K answers (it looks at the first K results retrieved) or what the denominator of Recall@K is, I got all four answers wrong.

But when they asked me to apply it, with numbers and examples, I got seven out of eight right. I feel like I understood the idea, but I didn't yet have the name or the formula automated.

Since the definition felt too abstract to me, I brought in a video on binary classification with apples and oranges, and then I rebuilt precision and recall with my own corpus of two chunks (two fragments of text), without anyone giving me the formula.

On the other hand, I'm using `/teach` with Ukrainian. First I took a diagnostic exam of the language using ChatGPT, so that the AI would have prior knowledge of my level. From there I started studying different lessons on grammar and on words or phrases I was struggling with. Sometimes `/teach` built me a lesson around one phrase, or several, that I was struggling with.

In the case of LeetCode, I'm using it to learn patterns and to keep my hand-coding from getting rusty. I also do it because some hiring processes require it.

### What it records

When I open a learning record, the first thing I see is where I went wrong. Then I see the analysis: my intuition, the name and the formula, each detailed separately. In the AI engineering course I'm taking, there's a precision and recall record where the skill noted that my intuition was right and that the weak points were the name and the formula. It even left a trick to remember them:

> "precision looks **inward** at what it retrieved (denominator K), recall looks **outward** at the whole relevant universe (denominator = total relevant)."
>
> Source: learning record from my AI Engineering workspace (private, no link; translated from Spanish)

It helps me that what I corrected stays written down, because that way `/teach` doesn't repeat the same lesson to me. That was the big problem I had with the study modes of ChatGPT and Claude. I normally don't read the records much, but `/teach` uses them to decide what to teach me next.

![Cycle of a /teach workspace: the mission and the sources feed a lesson, the exercises produce a learning record with what I got wrong and what I already know, and that record decides the next lesson.](03-teach-cycle.svg)

*The learning record decides the next lesson, which is why `/teach` doesn't repeat what I've already corrected.*

### Where it falls short and how I cover it

`/teach` falls short in three ways, and all three appear in its documentation. The first is that it doesn't assess your starting level:

> "There is no assessment step. `teach` infers your level from the mission and the learning records, and in session one there are no learning records."
>
> Source: [teach docs](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/docs/productivity/teach.md)

The mission is the goal of the topic, which `/teach` keeps in `MISSION.md`. I cover it with a diagnostic exam before starting. For Ukrainian I did it with ChatGPT, for three reasons. I was already doing a lot of my learning there, with loose prompts. Its web search, in my experience, worked quite well. And its high thinking mode is cheap for me with my $20 subscription. I asked for a 50-question exam, in the style of the Common European Framework of Reference for Languages, in batches of five sentences, to detect my grammar mistakes. It did it with web search, relying on internet sources.

The second is that it doesn't schedule reviews or connect to Anki. For that I use an Anki skill of my own. For Ukrainian, its description says:

> "Reviews today's hard and easy Anki cards in the Ukrainian course, compares them with the last few days to detect patterns, and suggests passing it to /teach if warranted."
>
> Source: `anki-review` skill from my Ukrainian workspace (private, no link; translated from Spanish)

The third is that it can make things up. When that worries me, I open the source the lesson cites or I run the code.

And I want to make one thing clear: the human is not replaced. This is a complement. For Ukrainian, on top of that, I have a teacher on italki.

## VibeWise for deciding

### What it is

VibeWise is a Claude Code plugin, created by Noah Kim, for learning while the AI writes the code you design. Its README puts it like this:

> "A plugin for Claude Code and Codex that puts learning first and keeps you in control while AI writes the code you designed. The AI asks for your approach first, helps you examine tradeoffs, and explains unfamiliar concepts."
>
> Source: [VibeWise README](https://github.com/nykooi1/vibe-wise/blob/eefb53df406ab89e31444684ff32c1df205221f8/README.md)

The first time I get into VibeWise, I run `/vibe-wise:learn` inside the project. First it asks me what I'm working on, and then my level as a programmer: beginner, intermediate or advanced. I usually tell it I'm advanced, but I describe in detail where I have gaps. In SupportPilot I told it I was advanced at programming and that I wanted to learn RAG while building. I framed it that way on purpose, so the agent would challenge me and better assess my RAG knowledge, which I wanted to review. I also chose the Light frequency, because I wanted to deliver that same day.

Then, every time I do an iteration, VibeWise makes me build something and guides me with three kinds of checkpoint, which are not mandatory stops:

> "Build checkpoint: ask how the learner would approach the problem."
>
> Source: [VibeWise behavior.md](https://github.com/nykooi1/vibe-wise/blob/eefb53df406ab89e31444684ff32c1df205221f8/skills/learn/behavior.md)

At Build it asks me how I would approach the problem. At Design it summarizes the proposal. And the code is only written when I authorize the Implementation checkpoint.

The difference from asking the AI to just write the code is that I reach the implementation knowing what I'm going to do.

![VibeWise flow: Build asks for my approach, Design summarizes the proposal and I confirm without authorizing code, Implementation describes the step and only when I authorize it does the AI write the code; what I demonstrated and what needs reinforcement is noted in progress.md.](02-vibewise-flow.svg)

*The code is written only after I authorize that step at the Implementation checkpoint, and what I've demonstrated is noted in `progress.md`. Checkpoints are not mandatory stops: depending on the frequency there are more or fewer.*

### The SupportPilot decisions

The VibeWise skill, in the SupportPilot project, kept notes on my development sessions. That way I could see how my learning and my thought process were going at the same time.

For example, with VibeWise I decided to use a fixed tool for an agent (a function the agent can call, like looking up an order) instead of text-to-SQL, that is, asking the model to turn the question into a SQL query. VibeWise noted that I chose it because it's safer. The concrete reason ended up in the project's README: the `customer_id` is captured inside the tool and is never an argument, so the model can't ask for another customer's orders.

Another decision was where the customer's identity travels. In my SupportPilot documentation I wrote it down like this:

> "Identity on the connection, not in tool arguments, chosen after a diagram of both channels."
>
> Source: [SupportPilot AI_ASSISTED_DEVELOPMENT.md](https://github.com/asdrubalivan/supportpilot/blob/e5817127325fe1d2d68c23faecb269ca864e6d99/AI_ASSISTED_DEVELOPMENT.md)

In other words, every time the agent called a tool, a connection check would run first, to verify that you're using the identity you're supposed to use.

I also had to decide on a dataset to test my results. That, by the way, led me to choose vector search over hybrid search. Curiously, vector search alone gave me better results with normal English.

That decision also ended up in my documentation:

> "…a robustness set (English and English with typos) to decide between hybrid and vector; vector chosen from those results."
>
> Source: [SupportPilot AI_ASSISTED_DEVELOPMENT.md](https://github.com/asdrubalivan/supportpilot/blob/e5817127325fe1d2d68c23faecb269ca864e6d99/AI_ASSISTED_DEVELOPMENT.md)

I also decided, on another front, not to have authentication shortcuts for the evals, the automated tests I use to measure how well the agent answers: a mode that trusts the header would allow impersonating any customer if it were left on. The evals generate their own tokens and go through the same verifier.

### What it recorded

This is what VibeWise's `progress.md` noted about my decision between hybrid search and vector search:

```markdown
## Retrieval mode decision
- Demonstrated: proposed a robustness test set to discriminate methods when golden cases tied; switched to vector citing eval evidence; scoped variants to English for now.
- Needs reinforcement: justification 'the evals said so' without noting small n.
```

The record says I proposed a robustness set when the golden cases tied. The AI wrote the first draft of the questions and I reviewed them. I asked for versions in normal English and in English with typos, to check whether my system held up with typos.

I expected hybrid search to win, because besides the semantic part it has a lexical component, and it didn't. In normal English, vector search got 1.00 recall@4 and hybrid got 0.81. With typos they tied at 0.94. That's why I switched to vector search.

The record also noted that my justification was "the evals said so," without saying that the sample is small: 8 intents for each version, normal English and English with typos. In the README it's written that the result is indicative, not conclusive.

### Where it falls short

A login CSRF is an attack in which someone else makes your browser complete a login that they started. In my SupportPilot documentation I also wrote down one of the mode's limits:

> "It also added one thing beyond what I approved: the `sp_login` cookie, which binds a login to the browser that started it (login CSRF). I understood it only after a walk-through."
>
> Source: [SupportPilot AI_ASSISTED_DEVELOPMENT.md](https://github.com/asdrubalivan/supportpilot/blob/e5817127325fe1d2d68c23faecb269ca864e6d99/AI_ASSISTED_DEVELOPMENT.md)

The AI added a cookie I hadn't approved, and I could only understand it by doing a walkthrough. In the end it made me understand what the cookie did and, on top of that, it exposed a gap in my knowledge about login CSRF. I reinforced it with an explanation of the double submit cookie, a defense in which the same value travels in a cookie and in the request, and the server requires them to match, and with a video.

## `/grilling`: getting grilled before deciding

`/grilling` is a skill by Matt Pocock that grills you relentlessly until you reach a shared understanding:

> "Interview the user relentlessly until you reach a shared understanding."
>
> Source: [grilling SKILL.md](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md)

In my experience `/teach` covers almost every case, but not always. Sometimes I want to design the content of a lesson my own way. That's where `/grilling` helps me.

One example is a LeetCode lesson on grid traversals. Before `/teach` built it, I designed it with `/grilling` instead of letting the AI assume the design: two rounds of questions, each with its recommendation. One of my decisions differed from what they recommended: I added BFS on grids, which wasn't in the original plan.

When `/grilling` grills me without giving me the answer, it feels different from `/teach` because the goal is different. With `/grilling`, the goal is to reach an agreement between the AI and me, the orchestrator. With `/teach`, the goal is for me to learn. That's why I use `/grilling` often in my projects, but not so much with `/teach` itself.

## At a glance

| | `/teach` | VibeWise | `/grilling` |
|---|---|---|---|
| What I use it for | Learning an entire topic | Learning while I build a project | Reaching an agreement between the AI and me |
| How it works | Splits the topic into lessons with cited sources and records my progress | Asks for my approach at checkpoints (Build, Design, Implementation) before writing code | Grills me until we reach a shared understanding |
| What it leaves written | Learning records in the workspace | `progress.md` in `.vibe-wise/` | Nothing of its own: decisions end up in the `CURRICULUM.md` (the plan) or the `NOTES.md` (the notes) of the workspace where I run it |
| Where I use it | AI Engineering, Ukrainian and LeetCode | SupportPilot | Designing a lesson and a project's decisions |
| Where it falls short | Doesn't assess my starting level, doesn't schedule reviews and can make things up | Confirming doesn't prove I understood | Its goal is agreement, not my learning |

![Map of the three tools: depending on what I need, I use VibeWise to understand what I build, /teach to learn an entire topic or /grilling to agree on a design; /grilling designs the lessons of /teach and I plan to take VibeWise's gaps to /teach.](01-three-tools-map.svg)

*Depending on what I need: VibeWise to understand what I build, `/teach` to learn an entire topic and `/grilling` to agree on a design. The dashed line is what I plan to do and haven't done yet.*

### When to pick each one

If someone wants to learn an entire topic, like RAG, I recommend `/teach`. It splits the topic into several lessons, and each lesson adapts to your learning goals.

If instead you're building an app and you don't fully understand what the AI writes for you, I recommend VibeWise. That way you can make well-thought-out changes to the app, in a practical way and according to your learning level.

With `/teach` I can't think of a case where I wouldn't recommend it. VibeWise, on the other hand, I only recommend for software engineering. I still have to try it with topics outside software engineering, but for now I'm not sure.

## How they combine

So far I haven't passed anything from VibeWise to `/teach`, but it's something I plan to do in the future. How would I do it? The gaps VibeWise notes in SupportPilot, like the difference between HttpOnly and SameSite, which came up while I was building the login, let me create a separate course in `/teach` where I can work through them more calmly. They are two attributes of a cookie: HttpOnly stops the page's JavaScript from reading it, and SameSite controls whether the browser sends it on requests coming from other sites.

What would I do in that case? I'd tell it: "`/teach`, create me a mini workshop where I can learn the difference between HttpOnly and SameSite, so that I learn it in an hour," for example.

## If you want to try them

If you want to install them, these are the commands that appear in their READMEs:

```bash
# /teach and /grilling (Matt Pocock's skills)
claude plugin install mattpocock-skills@claude-plugins-official

# VibeWise (by Noah Kim)
/plugin install vibe-wise@anthropic-plugin-directory
```

Source: [mattpocock/skills README](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/README.md) and [VibeWise README](https://github.com/nykooi1/vibe-wise/blob/eefb53df406ab89e31444684ff32c1df205221f8/README.md)

## Closing

If you try them, I'd love to know what you use to learn. And if you'd like a post with more detail on how I decided between vector search and hybrid search, let me know.

## Quick glossary

- **Skill:** packaged instructions that give Claude Code a way of working for a type of task; it's invoked with a command like `/teach`.
- **`/teach`:** Matt Pocock's skill that sets up a folder per topic and teaches you in short lessons, with cited sources.
- **VibeWise:** Claude Code plugin, by Noah Kim, for learning while the AI writes the code you design: before each piece it asks for your approach.
- **`/grilling`:** Matt Pocock's skill that grills you until you reach a shared understanding.
- **Workspace:** the `/teach` folder dedicated to a single topic, with its lessons and its records.
- **Learning record:** file where `/teach` notes what you got wrong, what you already know and what you learned, and which it uses in later lessons.
- **Checkpoint (Build, Design, Implementation):** a moment when VibeWise stops to ask you before going on. At Build it asks how you would approach the problem, at Design it summarizes the proposal and at Implementation it asks you to authorize the code for that step.
- **Frequency (Light, Normal, Frequent):** how often VibeWise stops you with checkpoints. Light only at the big decisions and Frequent at the small ones too.
- **`progress.md`:** file VibeWise saves in the project's `.vibe-wise/` folder, with what you've been demonstrating, deciding and reinforcing.
- **SupportPilot:** a project of mine, public on GitHub: a support agent that answers questions about a fictional company's policies, with citations, and looks up orders.
- **Vector search and hybrid search:** the first searches by meaning, comparing numeric representations of the text; the second combines it with an exact-word search.
- **Golden case:** a test question whose expected answer or sources are already defined.
- **Intent:** what a customer wants to know in SupportPilot; each intent in my tests has a version in normal English and one with typos.
- **Feynman technique:** studying by explaining the topic in plain words, as if you were telling someone who doesn't know it, to find where you don't understand it.
