# Teregon Labs AI story and pitch deck spec

Baseline: deployed commit `ab2d59f`. Current static site is HTML/CSS with small optional WebGL terrain layer and no runtime/build dependencies. Keep the forest/terrain palette, SEO, current live ERIA and W3 screenshots, and existing mobile/reduced-motion behavior.

## Goal

Make Teregon feel like a polished AI/software studio: change the hero phrase through real use cases, describe BrioBot and Briopedia as substantive prior team work, add more purposeful 3D mesh/motion, and give visitors a Teregon-branded presentation they can preview on-site and download as a PDF.

## Grounded project evidence

- Portfolio source: `/Users/mlubich/dev/portfolio/data/projects.ts` entries `briopedia` (lines 567–600) and `brio-bot` (lines 603–635).
- Briopedia: internal support knowledge base; Next.js UI, FastAPI async backend, git-backed wiki corpus, FAISS retrieval, provider-agnostic local/cloud LLM chat, Docker Compose. Content is maintained in version history; chat uses retrieved source context.
- BrioBot / Case Triage Agent: e-commerce Salesforce support case triage; LangGraph gather/retrieve/image-read/plan/tools/extract flow; deterministic Python evidence gates decide writable fields; optional Salesforce write with dry-run/safe-stop path; Langfuse traces. Do not expose the portfolio's test-count metric as product impact.
- Both Brio examples are prior team product experience, not Teregon client engagements. Keep that label adjacent to the cards and in the PDF.
- ERIA and W3 Sourcing are live website builds already documented on Teregon; do not relabel them as AI deployments. Nature concepts stay explicitly illustrative.

## Guardrails

- No invented revenue, conversion, customer, speed, or accuracy outcomes. The site can explain how outcomes will be measured against an agreed baseline.
- Do not publish internal secrets, customer records, or unnecessary private details. Keep personal websites linked only where already intended; no GitHub links.
- No new runtime dependencies. Preserve the static site path and accessibility, metadata, canonical/OG/Twitter cards, keyboard access, reduced motion, and mobile layout.
- Do not change ERIA or W3 external sites.

## Design and implementation

1. Hero: concise brand line around “software that flows” or “AI for a world in motion,” with a restrained text cycle across concrete system contexts (e.g. grounded search, support workflows, forecasts, living landscapes). Keep a static accessible phrase for assistive tech; pause/settle under reduced motion. Avoid implying the concept mesh is live data.
2. Case studies: add detailed Briopedia and BrioBot cards with problem/context, system design, workflow, guardrails, and the decision each supports. Use labels/tags and concise architecture diagrams; accurately mark these as prior Brio team experience. Avoid unsourced impact metrics.
3. Motion/mesh: carry a clear terrain-to-data-to-model-to-human-decision visual through the page. Add depth using inline SVG/CSS/WebGL already in repo, not a library. Animate transform/opacity where feasible; stop under reduced motion and keep mobile GPU cost low.
4. Presentation: create an accessible Teregon-themed slide deck source (`pitch-deck.html`) covering studio, services, verified client website builds, Brio team experience, illustrative nature concepts, approach/engagement, and how outcomes are measured. Include an on-page deck preview entry point and a direct PDF download. Render a real PDF at `assets/teregon-labs-pitch-deck.pdf`, using self-contained print CSS and local assets; 16:9 landscape slides with explicit page breaks. Do not rely on downloading a JavaScript slide framework at runtime.
5. Keep the deck content aligned with the website but do not duplicate unsupported claims. Add the deck route/link to navigation or a compact homepage callout; do not create a long embedded viewer that makes the homepage feel sparse or bloated.

## Disjoint work packages

- Package A — `index.html`, `README.md`: animated hero copy markup, BrioBot/Briopedia case studies and pitch-deck entry point; preserve metadata and truthful attribution.
- Package B — `styles.css`, `terrain.js` only if necessary: refined motion/mesh and responsive/reduced-motion states. Do not edit content markup files.
- Package C — new `pitch-deck.html` and generated `assets/teregon-labs-pitch-deck.pdf` (plus temporary rendering files outside repo): branded presentation source and PDF preview/download. Use verified evidence above and existing local screenshots only.
- Reviewer — fresh-context check of accuracy, PDF page count/readability, desktop/mobile, motion/reduced-motion, SEO, and clean deployment. No overlapping edits.

## Acceptance

- Hero cycles through recognizable AI/software/nature contexts and retains a static accessible description; motion settles when reduced motion is requested.
- Briopedia and BrioBot each have clear, technically specific problem → system → decision narratives and are not described as Teregon client deployments.
- Mesh motion looks intentional, retains the nature theme, and supports the AI workflow without false “live” telemetry.
- A Teregon-branded PDF opens in standard readers, has correct slide breaks and no clipped content; visitors can preview it on-site and download it directly.
- Mobile case cards and pitch preview work without horizontal overflow; no new runtime dependency or unsupported outcome claim.
- Commit is pushed, Vercel production deployment is Ready, `teregonlabs.com` serves the revision and PDF, and working tree is clean.

## User steering added during implementation (2026-10-31)

Retain the current hero/cases/deck work, and expand the public positioning into three clear layers:

1. **Teregon** — parent point of view: systems that connect people, software, and the living world.
2. **Teregon Labs** — applied AI and software delivery.
3. **Teregon Water** (recommended descriptive division name; use “water intelligence” and “watershed systems” in headings/body for SEO) — water, flow, watershed observations, and practical decision tools. Avoid the standalone names FlowAI/H2OAI: web search found many existing unrelated FlowAI products and an established FlowAI agent platform, making those names crowded and hard to own in search.

Replace generic “environmental/geospatial intelligence” positioning in prominent copy with water, watershed, water systems, river, flow, and landscape signals. Keep watershed/climate product scenarios honestly labeled illustrative unless backed by an actual water client deployment. Do not imply sensors or live monitoring exist.

Add a compact, accessible contact form that works without a backend: collect only name, email, and project summary, then open a `mailto:hello@teregonlabs.com` draft with the values encoded. Label the action as opening an email draft; do not imply the form submits/stores data server-side. A real submission endpoint would need a configured, privacy-reviewed service.

Add a bottom-right “Teregon Guide” chat panel for factual questions about services, case studies, water work, and contact. Vercel production currently has **no environment variables**, so there is no configured model API key. Implement the immediate version as a first-party, content-grounded site guide with a small curated answer corpus / topic matching, suggested prompts, and relevant links; do not call it model-powered AI or imply open-ended capability. Keep it local and do not send visitor prompts to a third party. If a model-backed assistant is later enabled, use a server-side function and configured secret only—never expose an API key in browser code. (The user called this an AI chat; communicate the current limitation directly and avoid claiming generation in the UI.)

## Added packages (disjoint from the initial site/deck packages)

- Package D — contact + guide runtime: new `contact.js` / `site-guide.js` and required lightweight markup in `index.html` owned by the content worker only after coordinating with Package A. Do not edit `styles.css`; motion worker owns it. If adding server functions, stop: no model/provider credentials are configured, so keep this release first-party and local.
- Package E — brand architecture / SEO: revise `index.html`, `work.html`, `about.html`, `llms.txt`, `llms-full.txt`, `sitemap.xml`, and `README.md` to name Teregon / Teregon Labs / Teregon Water consistently and emphasize water/watersheds/flow. Keep metadata, links, and sitemap accurate. One writer owns these content/discovery files.

## Additional acceptance

- A visitor can distinguish parent Teregon, Teregon Labs, and Teregon Water at a glance; water language is prominent and searchable.
- The contact form opens a correctly populated mail draft and does not claim submission or storage.
- The floating guide opens/closes accessibly, answers only from curated current site facts, links to relevant pages/contact, handles unknown questions honestly, and sends no prompts to an external service.
- The guide is accurately described as a site guide, not generative AI, until server-side model credentials are configured.

## User-provided company context figures (2026-10-31)

The user supplied approximate figures for public copy: BrioBot work took place when Brio was around $240K ARR; Briopedia's company is now around $2M ARR. Treat these as company-level context reported by the user, never as revenue generated by either system or as Teregon client results. The figures are not independently verified in repository evidence.
