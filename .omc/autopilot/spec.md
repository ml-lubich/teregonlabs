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
