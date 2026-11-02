# Teregon Labs: human-curated work and case-study decks

## Goal

Refine the live Teregon site into a more human-curated, polished AI/software studio presence: specific proof and workflow detail first, with restrained green/blue depth and motion. Reduce generic AI language and unused vertical space. Produce Teregon-themed HTML presentations and downloadable PDFs for BrioBot and Briopedia, while presenting ERIA as a real, live client website build.

The visual reference is Flock Safety’s clarity and confidence. Teregon must retain its own nature-and-water identity, copy, layout, palette, and assets; do not reproduce Flock branding or composition.

## Source of truth

- Production is Next.js App Router. Update the route components below, not legacy root HTML (`index.html`, `briobot.html`, `briopedia.html`, `pitch-deck.html`) unless the implementation proves those files are actively served.
- Homepage and current selected-work cards: `components/pages/home-page.tsx`.
- BrioBot case study: `components/pages/briobot-page.tsx`.
- Briopedia case study: `components/pages/briopedia-page.tsx` and `briopedia.css`.
- Studio presentation: `components/pages/pitch-deck-page.tsx`; generated PDF currently served from `public/assets/teregon-labs-pitch-deck.pdf`.
- Shared visual system/motion: `app/globals.css`, `app/theme-subpages.css`.
- Current assets: `public/assets/mesh/{briobot,briopedia,brioscope,ai-workflow}.webp`, `public/assets/briopedia/*`, and `public/assets/project-eria.jpg`.
- ERIA is already a live-site case in the homepage and studio deck. Its published site is `https://www.eria.co/`; current copy describes a responsive venue/event site, inquiry paths, and Next.js/React/Sanity. Preserve its actual-site screenshot and link.
- W3 Sourcing is also an existing live client site. Preserve its card and attribution.
- BrioBot and Briopedia are prior Brio team product experience, not Teregon client engagements. The case pages document their architecture and safeguards. Do not state product revenue, customer, or performance outcomes. Existing ARR copy is explicitly company-level and separated from product attribution; do not amplify or misattribute it.
- BrioBot source presentation: `~/Downloads/Organized/PDFs/brio-bot-presentation.pdf`, 3.8 MB / 43 pages, rendered slide deck with little/no extractable text. Use it as visual/content reference and verify slide claims against the repo case page or source materials; do not copy its original identity into Teregon collateral.
- Briopedia currently has branded illustrations and explicitly illustrative workflow diagrams, not signed-in product screenshots. Own-Chrome CDP check failed at port 9222. Do not alter browser settings or capture confidential/authenticated UI. Use existing approved assets unless a public, authorized screenshot becomes available.
- T-001 is marked blocked only on confirming a successful production Guide response after two rate-limited attempts; the rest of the rebuild, CI, push, deployment, and route checks are recorded complete. Do not weaken limits or add paid fallback as part of visual work.

## Non-goals / constraints

- No changes to ERIA or W3 external sites.
- No invented metrics, outcomes, customer evidence, or claims that Brio products were Teregon projects.
- No confidential application screenshots; no Chrome/CDP configuration changes.
- No copying Flock Safety’s brand, layout, or text. No new animation/library dependency unless required by measured need.
- Keep reduced-motion behavior, keyboard accessibility, responsive presentation, SEO metadata, canonical URLs, sitemap, and current Guide privacy/rate-limit contract.

## Current follow-up scope (canonical details: `docs/DESIGN.md`)

- Expand all six named service offerings with grounded use cases and typical deliverables, using accessible original SVG marks and restrained motion. Preserve the distinction between a general AI/software consultancy, Teregon Aqua as the water practice, and configurable services rather than standalone products.
- Replace blank `/work.html` service-art panels with existing local visual assets, descriptive alternatives, and concept labels.
- Fix desktop hero headline clipping, slow the rotating word cycle, and remove the visible seam at the visual boundary without causing mobile overflow.
- Add regression coverage; measure at least 90% line coverage for new service-rendering logic with installed tooling. The repository verification gate remains `bun run ci`.
- Treat the public Flock Safety site only as inspiration for general hierarchy, rhythm, and interaction. Keep Teregon's own copy, visual compositions, identity, and local artwork.

## Work packages (one writer per package)

1. **Studio homepage / selected work** — `components/pages/home-page.tsx` only. Replace generic studio statements with curated, specific service explanations and concrete work context; reduce oversized gaps; strengthen ERIA as the real live-site case while keeping W3 and Brio status distinctions clear. Any homepage wording changes that affect crawl text must be reflected by the metadata owner.
2. **Case-study presentations** — new BrioBot/Briopedia presentation route components and their unique route files; add print styles in a new presentation-specific stylesheet and downloadable PDFs under `public/assets/case-studies/`. HTML presentation is the editable source; PDF is generated from that source. Each deck should have a purposeful narrative (problem/context → system/workflow → architecture and controls → limits/what is known → Teregon relevance), responsive on screen and cleanly paginated in print. Do not rewrite the existing detail pages unless the deck and page need a shared factual correction; coordinate if so.
3. **Shared visual language / motion** — `app/globals.css` and `app/theme-subpages.css` only. Introduce a deliberate green/blue range, higher contrast/depth, and restrained compositional motion on transform/opacity; consolidate or replace whitespace-heavy reveal/pointer behavior where it currently harms content pacing. Ensure motion pauses or resolves under reduced motion and mobile remains legible.
4. **Discovery docs and deck links** — `components/pages/pitch-deck-page.tsx`, `README.md`, `public/llms.txt`, `public/llms-full.txt`, `public/sitemap.xml` only. Link the Brio PDFs and live ERIA case appropriately; keep descriptions and route inventory aligned. Do not duplicate long narrative across pages.
5. **ERIA case study** — new `components/pages/eria-case-study.tsx`, `app/eria.html/page.tsx`, `app/eria-case-study.css`, plus new local assets only. Use real public `https://www.eria.co/` screenshots; cover the live marketing site, private admin/content system, and workflow automation without exposing private portal URLs or screens. The user reports about $10M ARR; if used, mark it as company context and say it is not attributed to the website or automation. Do not imply causal impact.
6. **Fresh-context reviewer** — inspect diffs and rendered desktop/mobile/print output against criteria; no overlapping implementation edits unless assigned a concrete fix.

## Acceptance criteria

- Homepage quickly communicates what Teregon builds and who benefits, in concrete language; no generic AI filler or unsupported promises.
- Strong, obvious project proof: ERIA is identified as live client website work and links to the working public site; W3 remains a live client build; BrioBot/Briopedia remain prior-team experience; nature visuals are identified as concepts where applicable.
- ERIA has a separate, responsive case-study page showing the public site and describing admin/content tooling and automation without private URLs or captured portal content; company-scale context is not presented as an outcome.
- Separate, polished HTML presentations exist for BrioBot and Briopedia; each has a working PDF download generated from the HTML source. PDFs have no clipping, broken fonts/images, awkward page splits, or blank pages. HTML remains accessible and readable on mobile.
- Decks explain technical architecture at the level supported by current source: BrioBot Salesforce case context, LangGraph retrieval/proposal, deterministic Python write checks, dry-run/safe-stop, human review and Langfuse traces; Briopedia git-backed wiki, FAISS retrieval, local/cloud LLM layer, Next.js/FastAPI/Docker Compose. Do not imply every answer is complete/correct or that the flow has verified impact metrics.
- Visual system is distinctly Teregon: polished green/blue/nature signal language, purposeful depth and restrained animation; not a Flock Safety clone.
- Remove avoidable blank runway while preserving enough breathing room around the hero, project proof, and narrative sections. Check phone layouts at narrow and standard widths.
- Reduced-motion, keyboard focus, contrast, alt text, and document reading order remain sound; no horizontal overflow.
- Existing routes, SEO metadata, ERIA/W3 external links, and Guide disclosure/rate limits are preserved.
- Run the repo’s documented `bun run ci`, inspect generated PDFs and rendered desktop/mobile pages, deploy to production, and check live routes/PDF responses. Update T-001 only with fresh deployment and Guide evidence.

## Risks

- The BrioBot source PDF has no useful text extraction; claims must be cross-checked against source repo/docs, not inferred from slide artwork.
- ARR language may suggest a product result if layout/captions are careless; omit it from new decks unless source-verified and prominently labeled as company context.
- Root HTML and Next route files may diverge; deploy edits to the active Next route implementation only.
- HTML-to-PDF export can introduce print-specific scaling and page-break defects; treat both output formats as first-class deliverables.
- Guide 429s are unresolved provider/deployment evidence, not a reason to alter API limits or claim verified working chat.

## Follow-up: restore water scenario layout

### Bug and cause

The `/water.html` illustrative service-flow section renders as plain stacked text. `WaterPage` uses `.outcomes`, `.outcomes-heading`, `.outcome-list`, and `.outcome-measures`; their layout rules exist only in legacy root `styles.css`. The active Next app imports `app/globals.css` and `app/theme-subpages.css`, and neither currently supplies those selectors. The green text blocks in the user screenshot are native text selection, not a page highlight state; the Products menu is simply open/hovered.

### Work split

- CSS implementation: `app/theme-subpages.css` — add responsive editorial two-column layout for `.outcomes.water-example`, stacked mobile layout, readable scenario copy, spacing, separators, and sticky heading only on desktop. Reuse the existing palette, type, and spacing conventions; do not import legacy global styles.
- Regression test: `tests/hero-motion.test.js` — assert the active theme stylesheet owns the outcomes layout and mobile breakpoint, so the section cannot silently lose styling again.
- Spec owner: this file; design intent remains in `docs/DESIGN.md`.

### Acceptance criteria

- At desktop widths the heading and three scenario steps render in a balanced two-column section, with the measures note clearly separated.
- At widths ≤860px the section becomes one column, the heading is not sticky, and all copy remains legible without horizontal overflow.
- The live stylesheet is the active Next stylesheet; no dependency or legacy stylesheet import is added.
- The regression test fails against the current missing selectors and passes after the fix; `bun run ci` passes before deployment.

# Product and project-story refresh (2026-11-01)

## Goal
Create a standalone Products page for the six configurable Teregon offerings, expand project proof into readable execution stories with restrained scroll-linked milestones, and make the shared responsive navigation feel quieter and more deliberate. Preserve Teregon's own palette, type, words, assets, and layouts; public Apple/Vercel/Anthropic/Codex references inform interaction quality only, never literal copying.

## Scope and non-goals
- Add `/products.html`, linked from desktop and mobile navigation; explain Aqua, Oasis, Aquifer, Zephyr, Equinox, and Terra as configured services, with practical fit, typical inputs, deliverables, and review boundaries.
- Give each project story a concise sequence from problem/context through build choices to shipped/use state. Use dated milestones only when source-backed; otherwise show an explicitly undated sequence of verified implementation steps.
- Add a calm responsive navigation treatment and restrained timeline reveals. Keep mobile low-compute, keyboard/touch accessible, and `prefers-reduced-motion` safe. No new motion dependency.
- Do not promise project revenue return, ROI, savings, or causal business impact without project-specific, attributable evidence.

## Claims and attribution guardrails
- Verified repo copy: BrioBot's Brio-company ARR context was reported at about $240K at the time, and is explicitly not attributed to BrioBot.
- `public/llms.txt` reports Briopedia-era/current company ARR context around $2M; treat as team-reported and not caused by Briopedia. Verify the date/source before tightening wording.
- User previously reported ERIA company ARR around $10M; the current case page has no supporting record or attribution. Do not present this as project return. Include only if separately labeled as user/team-reported company context with a clear not-attributed note; otherwise omit.
- Real project proof may describe live launches, architecture, integrations, approval controls, and private workflow tooling at the level already documented. Do not imply confidential admin/customer UI is public.

## Disjoint work packages (one writer per file)
1. Products page: new `components/pages/products-page.tsx`, `components/pages/products-page.module.css`, and `app/products.html/page.tsx`; reuse current offering facts, avoid duplicating homepage markup. Do not edit shared nav.
2. Project stories: one owner for `components/pages/work-page.tsx`, `components/pages/eria-case-study.tsx`, `components/pages/briobot-page.tsx`, and `components/pages/briopedia-page.tsx`, plus a new reusable timeline component/module if useful. Add W3 project flow only from current verified live-build facts. Do not invent BrioScope as a deployed Teregon product.
3. Navigation: one owner for `components/site-shell.tsx` and `app/globals.css`; add Products link and calm glass-like surface with accessible open/close, focus, touch, mobile, and reduced-motion behavior.
4. Regression tests/docs: separate owner for new/updated tests and `docs/DESIGN.md`; keep test files disjoint from implementation. Assert route/menu links, six configured offerings, project attribution guardrails, timeline content, responsive layout, and reduced-motion behavior.
5. Fresh-context reviewer: review page screenshots at desktop and mobile, keyboard/ARIA behavior, copy attribution, and spec acceptance without overlapping implementation edits.

## Acceptance and verification
- Products route renders all six offerings with practical inputs/output/fit; links and canonical metadata work.
- Work stories cover ERIA and W3 live client website builds plus BrioBot and Briopedia prior Brio team projects; no invented revenue ROI or deployment status.
- Timeline nodes reveal calmly as they enter view on desktop; static/low-compute mobile, no horizontal overflow, and immediate readable fallback with reduced motion.
- Header has one obvious primary contact action, working Products disclosure, visible focus, touch-sized mobile control, and no menu overlap/clipping at 320px through desktop.
- Add a failing regression before implementation; run existing `bun run ci`, browser screenshots/accessibility checks, plus existing service-offerings coverage command (must remain >=90%).
- Before commit/push, scan public changes for private identifiers/claims; deploy and verify the new route and modified case pages.

## Implementation-ready package assignments (current tree, 2026-11-02)

Earlier packages above describe the full requested scope. Current repository already contains the Products page, project timelines, ERIA detail route, Brio case-study routes, and both downloadable case-study decks (per `tasks/T-002` and `tasks/T-004`). Do not recreate them. Review for gaps first, then assign only remaining fixes:

1. **Homepage and metadata** — `components/pages/home-page.tsx`, `app/page.tsx`. One writer owns the homepage story, project-card wording, and metadata. Reuse current public ERIA screenshot; do not edit shared CSS or case-study source here.
2. **Brio presentations** — `components/pages/case-study-decks.tsx`, `components/pages/case-study-decks.module.css`, `app/brio-bot-deck.html/page.tsx`, `app/briopedia-deck.html/page.tsx`, and the two case-study PDFs under `public/assets/case-studies/`. One writer owns both decks and print exports so the shared presentation system and claims stay aligned.
3. **ERIA case study** — `components/pages/eria-case-study.tsx`, `app/eria.html/page.tsx`, `app/eria-case-study.css`, and ERIA-only assets. Keep screenshots public and scope descriptions to verified launch/build evidence; avoid private admin screens and portal URLs.
4. **Shared identity and navigation** — `app/globals.css`, `app/theme-subpages.css`, `components/site-shell.tsx`. One writer owns palette, global interaction, and shared navigation. Do not edit page-specific deck or ERIA styles.
5. **Discovery copy and regression coverage** — `components/pages/pitch-deck-page.tsx`, `README.md`, `public/llms.txt`, `public/llms-full.txt`, `public/sitemap.xml`, and tests. Keep route inventory/metadata aligned, add/adjust focused coverage, and do not edit page implementations.
6. **Independent review** — fresh context checks desktop, phone, print/PDF output, accessibility/reduced motion, truth of case attribution, route links, and current design criteria. Reviewer does not edit implementation files.

Canonical design requirements for this work are appended under “Case-study presentations and ERIA” in `docs/DESIGN.md`. Avoid overlapping ownership; if a shared claim needs a cross-page correction, let the case-story owner make the single source change and have page owners consume it.

## Additional follow-up (2026-11-02)

### Teregon homepage hero

The desktop hero heading currently clips. Fix the active Next implementation and prove full visibility at standard and wide desktop widths as well as phone widths. Do not treat horizontal overflow clipping as a fix. Add regression coverage for actual heading/container fit and inspect screenshots at 1024, 1280, 1440, 1920, and 2560 CSS pixels.

### Teregon Guide: server-side free-model fallback

- Replace the single hard-coded OpenRouter route with `OPENROUTER_FREE_MODELS`, a server-only, ordered, comma-separated list of exactly three approved free model IDs. Reject missing/invalid configuration safely; never expose it under `NEXT_PUBLIC_*` or add paid routes.
- Try the next configured model only for an upstream HTTP 429 before streaming starts. Do not retry application visitor/IP limiter 429s, auth/other provider errors, network errors, or a stream that has already emitted content.
- The whole attempt chain remains one app-side rate-limit reservation/concurrency slot; preserve existing safe public errors and bounded `Retry-After` behavior. Test first→second→third success paths, all-model exhaustion, non-429 stop, and local 429 no-provider-call.
- Own the route logic/tests separately from deployment documentation. Add `docs/DEPLOYMENT.md` for Preview and Production variable setup/validation/verification; update `README.md` so it no longer describes a fixed single model. Do not record credential values.

### Portfolio Brio case studies

In `~/dev/.worktrees/teregon-portfolio` only (never touch the dirty original checkout), expand the public BrioBot, Briopedia, and BrioScope entries with verified story/architecture detail and reviewed visual sources. Portfolio items are prior Brio team product experience, not Teregon client work. No private customer records, authenticated product UI, production case screenshots, or unsupported outcomes/ROI. Exclude `sf-case-*` and Briopedia signed-in screenshot assets unless explicitly confirmed public and sanitized. Candidate technical diagrams and marks from the project repos require visual content review before copying; existing Teregon-published abstract mesh art is an approved fallback.

## Exact disjoint packages for the new follow-up

1. **Teregon hero + browser fit** — `components/pages/home-page.tsx`, `app/globals.css`, `app/theme-subpages.css`, `tests/hero-motion.test.js`.
2. **Guide failover logic + regression** — `lib/guide/handler.js` and `tests/guide-api.test.js`. Keep `pages/api/guide.js` as the existing thin wrapper unless the API contract itself must change.
3. **Guide deployment contract** — `README.md`, new `docs/DEPLOYMENT.md`; keep the docs factual about required env vars and preview/production setup, never values.
4. **Portfolio case-study content** — `~/dev/.worktrees/teregon-portfolio/data/projects.ts`; update BrioBot/Briopedia and add BrioScope using verified, public-safe claims only.
5. **Portfolio visual source assets** — new `~/dev/.worktrees/teregon-portfolio/public/images/projects/brio-bot-caseflow.webp`, `briopedia-knowledge-path.webp`, and `brioscope-support-signals.webp`; candidate source diagrams are `~/dev/briobot-presentation/assets/infographics/` and (brand mark only, if already public) `~/dev/brioscope/static/images/`. For Briopedia, retain the already-public illustrative art unless a public-safe dev-project illustration is found. Copy only after visual/source-content review clears each asset; exclude raw `sf-case-*`, Briopedia UI screenshots, and wiki/product-catalogue imagery.
6. **Portfolio project rendering/tests** — `~/dev/.worktrees/teregon-portfolio/components/sections/projects.tsx`, `__tests__/featured-projects.test.ts`, `__tests__/project-thumbnails.test.ts`, and `__tests__/projects-showcase-integration.test.ts`. Add BrioScope visibility/attribution coverage here. Keep data files and docs out of this package.
7. **Owning docs, portfolio** — `~/dev/.worktrees/teregon-portfolio/docs/DESIGN.md` and `docs/REQUIREMENTS.md`; specify public case-story presentation, attribution, and asset-release rules. No code edits in this package.
8. **Independent reviewer** — verify portfolio worktree remains isolated from the dirty original, claim/source attribution, no private imagery, desktop/mobile case visuals, Teregon hero fit, Guide 429 matrix, and docs/tests. Reviewer does not edit implementation files.

## Completion status (2026-11-02)

- Teregon Guide fallback and desktop hero fit are implemented in local commit `461e571`. `bun run ci` passes; Guide handler line coverage is 94.37%; service-offering line coverage is 100%.
- Portfolio BrioBot, Briopedia, and BrioScope entries and original illustrative 3D covers are pushed in `00e6980` to the personal portfolio repository. Portfolio `bun run ci` passes (2,162 tests, 2 skipped, production build); Playwright passes (255 passed, 24 skipped). The personal Vercel check is successful and the live site shows all three entries after the projects section loads.
- Teregon Guide is pushed at `461e571` and deployed to the personal Vercel project. `OPENROUTER_API_KEY` was verified against OpenRouter and set as a Vercel Secret for Preview and Production; `GUIDE_RATE_SECRET` is present in both; the three approved free model IDs are configured as a server-side Vercel Config value in both. Production `/api/guide` returned a streamed answer with HTTP 200. The stale key was replaced without exposing its value. GitHub CI passed; the production deployment is READY and aliases `teregonlabs.com`.
