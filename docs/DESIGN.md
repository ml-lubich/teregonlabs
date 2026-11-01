# Teregon site design contract

## Positioning

Teregon Labs is a general applied AI and custom software consultancy. Teregon Aqua is its focused water practice. Oasis, Aquifer, Zephyr, Equinox, and Terra are named services configured with each team, not standalone software products. Public copy must say what a system does, what data it uses, and where human review or operational ownership sits. Do not invent client deployments, measured outcomes, testimonials, or product capabilities.

## Visual direction

Use confident editorial hierarchy, strong project proof, composed photography or original rendered artwork, clear section transitions, and restrained motion. Public design references may inform general interaction patterns and pacing; Teregon keeps its own name, palette, writing, assets, and compositions. The visual system uses deep forest green, pale mineral green, and restrained water blue. Avoid generic AI slogans, repeated “signal” metaphors, empty gradient placeholders, and excessive blank space.

## Page and content requirements

- The homepage identifies applied AI and software work in direct language, gives concrete examples, and distinguishes live client builds from prior team experience and illustrative concepts.
- The six service offerings explain their use cases and typical deliverables. Each card has its own accessible, simple SVG mark and restrained hover/reveal motion.
- `/work.html` capability panels use actual local visual assets with descriptive alt text and an explicit illustrative label when artwork is conceptual. Never leave pale blank art panels.
- Scenario and service-flow sections use a deliberate desktop content grid, readable step copy, and a stacked mobile layout; their active Next stylesheet must own the styles.
- The homepage hero headline wraps inside the viewport at desktop and mobile sizes. Its rotating final word has a calm cadence and a stable reduced-motion fallback. Pointer parallax runs only on desktop fine pointers with motion enabled.
- Navigation remains compact, keyboard accessible, and touch friendly. Content order and legibility take priority over decorative composition on small screens.
- Small labels and footer text on pale backgrounds must retain readable text contrast.
- Use motion on opacity and transforms, preserve reduced-motion preferences, and avoid layout shifts. No new animation dependency without measured need.

## Verification

Use the existing `bun run ci` gate. Add regression tests for service copy, actual work-panel images, hero wrapping/cadence, and responsive/reduced-motion contracts. Measure service-rendering line coverage with `bun test --coverage tests/service-offerings.test.js`; require at least 90% and report the measured percentage.
