# Teregon Labs

A responsive static site for Teregon Labs, a broad applied AI and software studio for customer workflows, business operations, and other complex problems. Teregon Water is a focused vertical for water filtration and appliance customer service, plus watershed decision tools. It uses HTML, CSS, a small optional WebGL terrain layer, and no build step or runtime dependencies.

## Pages and discovery

- `/` — studio overview, selected systems, and case studies
- `/pitch-deck.html` — on-page studio presentation with downloadable PDF
- `/water.html` — Teregon Water product offerings for filtration/appliance support, service operations, and watershed systems
- `/work.html` — applied AI, data and decision systems, software engineering, and water systems
- `/approach.html` — the observation-to-action process
- `/about.html` — parent studio, practices, working principles, and team

- `/sitemap.xml` — public page index for search engines
- `/robots.txt` — crawler access and sitemap location
- `/llms.txt` and `/llms-full.txt` — concise and detailed site context for language models

The homepage includes live client websites for ERIA Events and W3 Sourcing, with screenshots from the current deployed sites, project scope, and technology notes. A compact capability strip names grounded retrieval, AI agents, model evaluation, forecasting, watershed context, and production software. The homepage uses one static headline, “Software that flows.” Its terrain mesh is a visual concept, not a live data feed. Teregon Water examples are illustrative watershed concepts, not live monitoring or a client deployment. BrioBot and Briopedia document prior team product experience, not Teregon client engagements. The pitch deck is available as an on-page presentation and downloadable PDF. The homepage and water contact forms open a mail draft without storing submissions; the Teregon Guide answers from first-party site content and is not a model-powered chat. Teregon Water offerings are configurable concepts, not deployed client products or live monitoring. Water and watershed examples are labeled as exploratory concepts. Impact measures are framed as client-verified outcomes; the site does not invent earnings or performance claims. The homepage case stack is limited to wide, mouse-driven, motion-enabled desktop viewports; other devices keep the static column. Team portraits are local, optimized WebP assets.

## Verify

Run the static site contract checks with `python3 -m unittest discover -s tests -v` and the scroll-stack viewport check with `node --test tests/scroll-stack.test.cjs`.

## Deploy

The repository is connected to the `teregonlabs-site` Vercel project on `main`. It serves static files from the repository root; there is no build command.
