# Teregon Labs

A responsive, static site for Teregon Labs. It uses HTML, CSS, a small optional WebGL terrain layer, and no build step or runtime dependencies.

## Pages and discovery

- `/` — studio overview, selected systems, and case studies
- `/work.html` — landscape intelligence, watershed systems, and climate resilience
- `/approach.html` — the observation-to-action process
- `/about.html` — mission, working principles, and team

- `/sitemap.xml` — public page index for search engines
- `/robots.txt` — crawler access and sitemap location
- `/llms.txt` and `/llms-full.txt` — concise and detailed site context for language models

The Brio case studies describe documented support triage, knowledge, analytics, and forecasting systems. Watershed and climate examples are labeled as illustrative concepts. Impact measures are framed as client-verified outcomes; the site does not invent earnings or performance claims. Team portraits are local, optimized WebP assets.

## Verify

Run the static site contract checks with `python3 -m unittest discover -s tests -v`.

## Deploy

The repository is connected to the `teregonlabs-site` Vercel project on `main`. It serves static files from the repository root; there is no build command.
