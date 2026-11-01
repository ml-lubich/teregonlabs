# Teregon Labs

A responsive site for Teregon Labs, a broad applied AI and custom software consultancy building custom AI solutions for business workflows and complex operations. Teregon Aqua is the focused water practice for product support, service operations, and watershed planning. The site uses the Next.js App Router, React, Tailwind CSS, and a Vercel Node route for the site guide.

## Pages and discovery

- `/` — studio overview, selected systems, and case studies
- `/pitch-deck.html` — on-page studio presentation with downloadable PDF
- `/briopedia.html` — prior Brio team knowledge-system case study
- `/briobot.html` — prior Brio team support automation case study
- `/water.html` — Teregon Aqua services for filtration/appliance support, service operations, and watershed systems
- `/work.html` — applied AI, data and decision systems, software engineering, and water systems
- `/approach.html` — the observation-to-action process
- `/about.html` — parent studio, practices, working principles, and team

- `/sitemap.xml` — public page index for search engines
- `/robots.txt` — crawler access and sitemap location
- `/llms.txt` and `/llms-full.txt` — concise and detailed site context for language models

Teregon Labs is a broad applied AI and custom software consultancy. Teregon Aqua is its focused water practice for filtration and appliance support, service operations, and watershed systems. Five configurable services organize its product and workflow work: Teregon Oasis for water and product support automation; Teregon Aquifer for grounded search across manuals, policies, and case history; Teregon Zephyr for workflow agents; Teregon Equinox for forecasting and planning; and Teregon Terra for land and watershed systems. These are services configured around each team, not standalone off-the-shelf products. Selected work includes live website builds for ERIA Events and W3 Sourcing, plus prior Brio team work on BrioBot and Briopedia. Those Brio products are not Teregon client engagements, and company-level revenue context shown on their case studies is not attributed to either product. The water photography and watershed studies are illustrative, not live monitoring or deployed Teregon products. The About page introduces the team and links to each member’s public website. The studio deck is available on-page and as a downloadable PDF. Contact links open a mail draft without storing submissions. The Guide sends prompts to OpenRouter and does not store chat history. Desktop pointer motion is disabled on touch-first devices and reduced for visitors who request it.

## Teregon Guide

The bottom-right Guide answers only questions about Teregon Labs, published work, Teregon Aqua, and starting a project. It sends the visitor's question and recent conversation context to OpenRouter for generation using the fixed `nvidia/nemotron-3.5-super-vl:free` route. Teregon does not store chat history or log prompts. OpenRouter processes the request; review its [privacy policy](https://openrouter.ai/privacy) for provider-side handling. The site makes no promise about provider retention.

The endpoint is `/api/guide`, handled by the Next.js Pages API route at `pages/api/guide.js`. Enable it by configuring `OPENROUTER_API_KEY` and an independent `GUIDE_RATE_SECRET` (at least 32 characters) in the Vercel project environment. Do not put either value in source control or browser code. Requests fail closed if either value is missing. The model route is fixed to `nvidia/nemotron-3.5-super-vl:free`, with no paid fallback. The application applies per-visitor, per-IP, burst, concurrency, and 25-request daily limits in process memory. For per-IP limits it prefers Vercel's `x-real-ip`; if unavailable, it uses the left-most valid address in `x-forwarded-for`, assuming the hosting edge appends trusted proxy addresses. IP values are HMAC-hashed before they enter limiter state. These limits are best-effort across serverless instances and restarts; OpenRouter may apply its own shared free-tier limits. Provider outages or quota exhaustion return a retryable error.

## Verify

Run the production build with `bun run build`. Run the full local CI suite with `bun run ci`; this runs Guide API/client/widget tests, site contract checks, the scroll-stack viewport check, TypeScript validation, and the Next.js production build. Tests use provider stubs and need no secrets.

## Deploy

The repository is connected to the `teregonlabs-site` Vercel project on `main`. `vercel.json` pins the deployment framework to Next.js so Vercel serves the generated application routes; static media is served from `public/`. After configuring the two server environment variables above, deploy to the production Vercel project and check both the home page and `/api/guide` from a browser. Without those variables, the site remains available and the Guide responds with a generic unavailable state.
