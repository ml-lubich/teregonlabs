# Teregon site design contract

## Positioning

Teregon Labs is a general applied AI and custom software consultancy. Teregon Aqua is its focused water practice. Oasis, Aquifer, Zephyr, Equinox, and Terra are named services configured with each team, not standalone software products. Public copy must say what a system does, what data it uses, and where human review or operational ownership sits. Do not invent client deployments, measured outcomes, testimonials, or product capabilities.

## Visual direction

Use confident editorial hierarchy, strong project proof, composed photography or original rendered artwork, clear section transitions, and restrained motion. Public design references may inform general interaction patterns and pacing; Teregon keeps its own name, palette, writing, assets, and compositions. The visual system uses deep forest green, pale mineral green, and restrained water blue. Avoid generic AI slogans, repeated “signal” metaphors, empty gradient placeholders, and excessive blank space.

## Page and content requirements

- The homepage identifies applied AI and software work in direct language, gives concrete examples, and distinguishes live client builds from prior team experience and illustrative concepts.
- The six service offerings explain their use cases and typical deliverables. Each card has its own accessible, simple SVG mark and restrained hover/reveal motion.
- `/work.html` capability panels use actual local visual assets with descriptive alt text and an explicit illustrative label when artwork is conceptual. Never leave pale blank art panels.
- Do not reuse the same image between homepage capability cards and case-study cards; give each story its own visual asset.
- Scenario and service-flow sections use a deliberate desktop content grid, readable step copy, and a stacked mobile layout; their active Next stylesheet must own the styles.
- The homepage hero headline is fully visible at desktop widths from 1024px through ultrawide and at mobile widths; no line is clipped by its container or the hero art. Keep the final word static for a clear first read. Pointer parallax runs only on desktop fine pointers with motion enabled.
- Navigation remains compact, keyboard accessible, and touch friendly. Content order and legibility take priority over decorative composition on small screens.
- On the homepage, use a full-bleed hero, put navigation over the image, and keep a forest-green canvas behind it so no paper-white gutters frame the header. Keep the mobile menu simple and its links touch-sized. Other pages retain their own surface colors and navigation treatment.
- Give the homepage hero a compact proof stack on desktop and a horizontal, touch-scrollable proof row on mobile. Use verified project names and keep live client builds distinct from prior team product work; do not use unsupported performance metrics.
- Small labels and footer text on pale backgrounds must retain readable text contrast.
- Use motion on opacity and transforms, preserve reduced-motion preferences, and avoid layout shifts. No new animation dependency without measured need.

## Verification

Use the existing `bun run ci` gate. Add regression tests for service copy, actual work-panel images, hero wrapping/cadence, and responsive/reduced-motion contracts. Measure service-rendering line coverage with `bun test --coverage tests/service-offerings.test.js`; require at least 90% and report the measured percentage.

## Products and project stories

- `/products.html` lists Teregon Aqua, Oasis, Aquifer, Zephyr, Equinox, and Terra. Describe each as a configurable service, with its intended use, likely inputs, deliverables, and human review or operating boundary. State that these are not standalone off-the-shelf products.
- Link Products from the shared desktop and mobile navigation. The disclosure must work with keyboard and touch, expose its state accessibly, preserve visible focus, and fit narrow viewports without clipping.
- ERIA, W3 Sourcing, BrioBot, and Briopedia project stories may use ordered timeline steps to explain the verified sequence from need through implementation and use. Do not invent dates; label undated sequences as steps or phases.
- Keep live client website work distinct from prior Brio team experience. Do not imply BrioBot or Briopedia were Teregon client engagements.
- Do not attribute company ARR, revenue, ROI, savings, or other business results to a project without project-specific evidence. If company-level figures appear, identify them as reported context and explicitly state that the project did not cause or earn that figure.
- Timelines must remain readable without animation, avoid horizontal overflow, and stack naturally on mobile. Reveals may use opacity and transform only; honor `prefers-reduced-motion` with an immediate static presentation and keep mobile motion low-compute.
- Add focused regression tests for the Products route and metadata, all six offering descriptions, navigation accessibility, project-story timeline coverage, and revenue-attribution wording. Keep `bun run ci` as the repository verification gate.

## Case-study presentations and ERIA

- BrioBot and Briopedia each have a dedicated, Teregon-styled presentation route with an editable HTML source and a downloadable PDF generated from that source. Keep the presentations useful on screen and cleanly paginated in print.
- Use a clear story arc: operating context, workflow, architecture and controls, known limits, and what the experience informs at Teregon. Use verified implementation details; avoid unsupported customer, performance, or financial outcomes.
- Label BrioBot and Briopedia as prior Brio team product experience, not Teregon client work. Do not attribute company revenue figures to either product.
- Briopedia visuals must remain original illustrations or public, authorized captures. Never expose authenticated product UI, private portal URLs, customer records, or internal-only screenshots.
- ERIA is a live client website case study linked to its public production site. Public screenshots may illustrate the venue and event experience. Describe content management, private workflows, or automation only when supported by project records; do not publish portal URLs or private screens.
- Keep ERIA and W3 Sourcing clearly distinct from prior Brio team projects. Company-level financial context must remain explicitly sourced and must not imply project causation or return.
- Flock Safety may inform general hierarchy, clarity, and interaction pacing. Teregon must keep its own compositions, wording, assets, and visual identity.
- Case-study motion should support the story rather than delay reading. PDFs must remain understandable without animation, and print styles must honor reduced-motion and accessibility requirements.

## Guide model fallback

- Configure exactly three approved OpenRouter free model IDs in the server-only `OPENROUTER_FREE_MODELS` environment variable, in failover order. The IDs must select free routes; do not add a paid fallback or expose this setting to browser code.
- Retry the next model only when OpenRouter returns HTTP 429 before any stream headers or content reach the visitor. Never retry on the app's own visitor/IP limiter 429, other provider errors, or after a stream has begun.
- Preserve the existing visitor/IP/burst/concurrency/daily limiter, safe public error shape, and retry-after handling across a fallback chain. One visitor request consumes one app-side reservation.
- Add regression cases for 429→429→success, all-three-429 exhaustion, no retry for non-429 provider errors, no provider call for app-side 429, and env/model validation. Document preview and production configuration in `docs/DEPLOYMENT.md` without storing secret values.
