# Teregon Labs

A responsive static site for Teregon Labs, an applied AI and software studio working across operations and nature-led intelligence. It uses HTML, CSS, a small optional WebGL terrain layer, and no build step or runtime dependencies.

## Pages and discovery

- `/` — studio overview, selected systems, and case studies
- `/work.html` — applied AI, data and decision systems, software engineering, and nature-led intelligence
- `/approach.html` — the observation-to-action process
- `/about.html` — mission, working principles, and team

- `/sitemap.xml` — public page index for search engines
- `/robots.txt` — crawler access and sitemap location
- `/llms.txt` and `/llms-full.txt` — concise and detailed site context for language models

The Brio examples describe prior team product experience, not Teregon client engagements. Watershed and climate examples are labeled as exploratory concepts. Impact measures are framed as client-verified outcomes; the site does not invent earnings or performance claims. The homepage case stack is limited to wide, mouse-driven, motion-enabled desktop viewports; other devices keep the static column. Team portraits are local, optimized WebP assets.

## Verify

Run the static site contract checks with `python3 -m unittest discover -s tests -v` and the scroll-stack viewport check with `node --test tests/scroll-stack.test.cjs`.

## Deploy

The repository is connected to the `teregonlabs-site` Vercel project on `main`. It serves static files from the repository root; there is no build command.
