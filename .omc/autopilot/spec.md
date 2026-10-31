# Teregon home refinement spec

Baseline: deployed commit `b127665`. Keep the current restrained forest palette, real client-site screenshots, truthful Brio attribution, and nature-led visual language. The request is to make the site feel more like a technical AI/software studio, with more useful detail and memorable motion while reducing dead scroll space.

## Goal

Make the homepage quickly explain the systems Teregon builds, show grounded technical capability and real delivery examples, and carry a distinctive animated terrain/signal visual through the story. Improve mobile density and retain performance, accessibility, and reduced-motion behavior.

## Non-goals / guardrails

- Do not invent client results, revenue, customer counts, or production metrics.
- Keep ERIA and W3 Sourcing scoped to their verified website launches. Keep Brio examples labeled as prior team experience; nature scenarios remain illustrative concepts.
- Do not change external ERIA/W3 sites, add libraries, or turn static visual concepts into claims of live data.
- Preserve SEO, social preview metadata, canonical URLs, contact route, keyboard access, and responsive behavior.

## Design / implementation

- Make the hero copy and first service summaries explicit about applied AI workflows, evidence-grounded retrieval, decision systems, forecasting, and custom software, while retaining the landscape metaphor.
- Add a compact, restrained animated capabilities signal (e.g. retrieval, AI agents, evaluation, forecasting, geospatial context, production software) to add technical detail without adding another large spacer section.
- Improve the transition between landscape mesh and AI pipeline: use transform/opacity motion, accurate concept/field-study labeling, clear data-to-human-decision stages, and reduced-motion fallback.
- Reduce excessive scroll length in the four-card desktop case stack; keep its progressive/pinned quality on eligible desktop while making transitions closer and the compact/mobile column unchanged.
- Where useful, clarify project deliverables and technical stack in existing cards; keep outcome statements evidence-bound.

## Disjoint work packages

1. `index.html`, `README.md`: hero/service/capability and case-study information architecture/copy; ensure the hero animation is not labeled “LIVE” unless it is truly live. Update README only if behavior or described page content changes.
2. `styles.css`: capability motion, stronger AI/mesh treatment, tightened desktop case-stack pacing, responsive layout, reduced-motion and contrast support. Animate composite properties only where feasible.
3. Reviewer: inspect resulting desktop/mobile presentation, semantic/SEO/content claims, reduced-motion state, and whitespace pacing. Do not edit overlapping files unless asked to fix a concrete issue.

## Acceptance criteria

- First screen clearly identifies Teregon as an applied AI/software studio and states concrete problems it solves.
- Visitor can scan real ERIA and W3 launches, prior Brio systems, and illustrative nature studies without confusing their status.
- AI workflow names sources, retrieval/evidence, model task, deterministic checks, and human decision; mesh and copy tell one coherent story.
- Scroll pacing is visibly denser around the Brio stack without breaking the desktop pin/scale behavior; mobile remains a readable single-column layout without horizontal overflow.
- Motion stays subtle, uses transform/opacity where practical, and stops/settles under reduced motion; no false “live” signal claims.
- No unsupported impact metrics or unsupported Teregon-client AI claims are added.
- Production publish is followed by a live-domain check and a clean working tree.
