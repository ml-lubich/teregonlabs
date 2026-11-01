# Teregon Labs

A responsive site for Teregon Labs, a broad applied AI and custom software consultancy building custom AI solutions for business workflows and complex operations. Teregon Water is a focused water-industry specialization for product support, service operations, and watershed planning. The site uses HTML, CSS, a small optional WebGL terrain layer, and a dependency-free Vercel Node function for the site guide; it has no frontend build step.

## Pages and discovery

- `/` — studio overview, selected systems, and case studies
- `/pitch-deck.html` — on-page studio presentation with downloadable PDF
- `/briopedia.html` — prior Brio team knowledge-system case study
- `/water.html` — Teregon Water product offerings for filtration/appliance support, service operations, and watershed systems
- `/work.html` — applied AI, data and decision systems, software engineering, and water systems
- `/approach.html` — the observation-to-action process
- `/about.html` — parent studio, practices, working principles, and team

- `/sitemap.xml` — public page index for search engines
- `/robots.txt` — crawler access and sitemap location
- `/llms.txt` and `/llms-full.txt` — concise and detailed site context for language models

Teregon Labs is positioned as a broad applied AI and custom software consultancy; water filtration, appliance service, and watershed planning sit within the focused Teregon Water specialization. The homepage includes live client websites for ERIA Events and W3 Sourcing, with screenshots from the current deployed sites, project scope, and technology notes. A compact capability strip names grounded retrieval, AI agents, model evaluation, forecasting, workflow automation, and production software. The homepage keeps “Software that” fixed while cycling the verb below it. A photographic pond scene with a falling droplet and ripple loop anchors the water story; the scene is illustrative, not a live data feed. Teregon Water examples are illustrative watershed concepts, not live monitoring or a client deployment. BrioBot and Briopedia document prior team product experience, not Teregon client engagements; the Briopedia page uses brand art and labeled workflow diagrams rather than captured application screens. The pitch deck is available as an on-page presentation and downloadable PDF. The homepage and water contact forms open a mail draft without storing submissions. Impact measures are framed as client-verified outcomes; the site does not invent earnings or performance claims. The site uses scroll-linked reveals and terrain motion where supported, with reduced-motion support. The homepage case stack is limited to wide, mouse-driven, motion-enabled desktop viewports; other devices keep the static column. Team portraits are local, optimized WebP assets.

## Teregon Guide

The bottom-right Guide answers only questions about Teregon Labs, published work, Teregon Water, and starting a project. It sends the visitor's question and recent conversation context to OpenRouter for generation using the fixed `nvidia/nemotron-3.5-super-vl:free` route. Teregon does not store chat history or log prompts. OpenRouter processes the request; review its [privacy policy](https://openrouter.ai/privacy) for provider-side handling. The site makes no promise about provider retention.

The endpoint is `/api/guide`, discovered by Vercel from `api/guide.js`. Enable it by configuring `OPENROUTER_API_KEY` and an independent `GUIDE_RATE_SECRET` (at least 32 characters) in the Vercel project environment. Do not put either value in source control or browser code. Requests fail closed if either value is missing. The model route is fixed to a free endpoint, with no paid fallback. The application applies per-visitor, per-IP, burst, concurrency, and 25-request daily limits in process memory. For per-IP limits it prefers Vercel's `x-real-ip`; if unavailable, it uses the left-most valid address in `x-forwarded-for`, assuming the hosting edge appends trusted proxy addresses. IP values are HMAC-hashed before they enter limiter state. These limits are best-effort across serverless instances and restarts; OpenRouter may apply its own shared free-tier limits. Provider outages or quota exhaustion return a retryable error.

## Verify

Run the full local CI suite with `bun run ci`. This runs the Guide API/client tests, the static site contract checks (`python3 -m unittest discover -s tests -v`), and the scroll-stack viewport check (`node --test tests/scroll-stack.test.cjs`). The GitHub Actions workflow runs this same suite for pushes to `main` and pull requests; tests use provider stubs and need no secrets.

## Deploy

The repository is connected to the `teregonlabs-site` Vercel project on `main`. Static files are served from the repository root; no frontend build command is needed. Vercel discovers the serverless Guide function at `api/guide.js`. After configuring the two server environment variables above, deploy to the production Vercel project and check both the home page and `/api/guide` from a browser. Without those variables, the static site remains available and the Guide responds with a generic unavailable state.
