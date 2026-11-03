const { describe, expect, test } = require('bun:test');
const { readFileSync } = require('node:fs');

const home = readFileSync(require.resolve('../components/pages/home-page.tsx'), 'utf8');
const water = readFileSync(require.resolve('../components/pages/water-page.tsx'), 'utf8');
const styles = readFileSync(require.resolve('../app/globals.css'), 'utf8');
const theme = readFileSync(require.resolve('../app/theme-subpages.css'), 'utf8');
const guide = readFileSync(require.resolve('../components/site-guide.tsx'), 'utf8');

describe('active Next.js homepage motion and controls', () => {
  test('floating homepage navigation sits on the forest canvas instead of white gutters', () => {
    expect(styles).toMatch(/body:has\(\.hero-home\)\s*\{[^}]*background:\s*var\(--forest\)/);
    expect(styles).toMatch(/body:has\(\.hero-home\) \.site-header\s*\{[^}]*position:\s*absolute;[^}]*width:\s*100%;[^}]*border-radius:\s*0/);
    expect(styles).toMatch(/body:has\(\.hero-home\) \.hero-visual\s*\{[^}]*inset:\s*0;[^}]*border-radius:\s*0/);
    expect(styles).toMatch(/@media \(max-width: 760px\)\s*\{[\s\S]*?body:has\(\.hero-home\) \.site-header-inner\s*\{[^}]*min-height:\s*72px/);
  });

  test('hero proof links distinguish live client builds, prior team work, and the water practice', () => {
    expect(home).toContain('className="hero-proof"');
    expect(home).toContain('LIVE CLIENT BUILDS');
    expect(home).toContain('ERIA Events');
    expect(home).toContain('W3 Sourcing');
    expect(home).toContain('PRIOR TEAM EXPERIENCE');
    expect(home).toContain('BrioBot + Briopedia');
    expect(home).toContain('TEREGON AQUA');
    expect(styles).toMatch(/body:has\(\.hero-home\) \.hero-proof-card\s*\{[^}]*backdrop-filter:/);
    expect(styles).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*?body:has\(\.hero-home\) \.hero-proof\s*\{[^}]*overflow-x:\s*auto/);
  });

  test('water service-flow scenario owns responsive layout in the active stylesheet', () => {
    expect(water).toContain('className="outcomes section-pad water-example"');
    expect(theme).toMatch(/\.outcomes\.water-example\s*\{[^}]*display:\s*grid/);
    expect(theme).toMatch(/\.water-example \.outcomes-heading\s*\{[^}]*position:\s*sticky/);
    expect(theme).toMatch(/\.water-example \.outcome-list article\s*\{[^}]*border-bottom:/);
    expect(theme).toMatch(/\.water-example \.outcome-list article p\s*\{[^}]*font-size:\s*(1[4-9]|[2-9]\d)px/);
    expect(theme).toMatch(/@media\s*\(max-width:\s*860px\)[\s\S]*?\.outcomes\.water-example\s*\{[^}]*grid-template-columns:\s*1fr/);
  });

  test('hero pointer parallax is gated to wide fine-pointer, hover-capable, motion-enabled devices', () => {
    expect(home).toContain('window.matchMedia("(min-width: 801px) and (hover: hover) and (pointer: fine)")');
    expect(home).toMatch(/const reducedMotion = window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)\.matches;[\s\S]*?if \(reducedMotion \|\| !desktopPointer\.matches\) return/);
    expect(home).toContain('hero.addEventListener("pointermove", handleMove, { passive: true })');
    expect(home).toContain('hero.addEventListener("pointerleave", reset, { passive: true })');
    expect(home).toContain('hero.removeEventListener("pointermove", handleMove)');
    expect(home).toContain('hero.removeEventListener("pointerleave", reset)');
  });

  test('parallax is centered on the hero and resets both layers on pointer leave', () => {
    expect(home).toContain('const x = (event.clientX - bounds.left) / bounds.width - 0.5');
    expect(home).toContain('const y = (event.clientY - bounds.top) / bounds.height - 0.5');
    expect(home).toContain('visual.style.translate = `${x * -7}px ${y * -6}px`');
    expect(home).toContain('mesh.style.translate = `${x * 13}px ${y * 10}px`');
    expect(home).toContain('visual.style.translate = "0 0"');
    expect(home).toContain('mesh.style.translate = "0 0"');
  });

  test('hero headline is static and fully accessible', () => {
    expect(home).toContain('aria-label="Software that flows."');
    expect(home).toContain('className="hero-word-static" aria-hidden="true">flows.</span>');
    expect(theme).toContain('.hero-word-static { display: block;');
    expect(home).not.toContain('hero-word-cycle');
  });

  test('hero headline can wrap within the viewport on narrow screens', () => {
    expect(theme).toMatch(/\.hero-copy h1 \.hero-prefix\s*\{[^}]*white-space:\s*normal/);
    expect(theme).not.toMatch(/\.hero-copy h1 \.hero-prefix\s*\{[^}]*white-space:\s*nowrap/);
    expect(home).toContain('max-w-[16ch] text-[clamp(2.75rem,6vw,6.5rem)]');
    expect(styles).toMatch(/@media \(min-width: 900px\)\s*\{[^}]*\.hero-copy\s*\{[^}]*width:\s*min\(980px, 92%\)/);
    expect(styles).toMatch(/@media \(min-width: 900px\)\s*\{[^}]*\.hero-copy\s*\{[^}]*padding-right:\s*clamp\(16px, 1vw, 24px\)/);
  });

  test('scroll reveals begin as soon as the section peeks into view', () => {
    expect(home).toMatch(/threshold: 0\.02, rootMargin: "0px"/);
  });

  test('Guide and contact controls retain legible, touch-sized targets', () => {
    expect(styles).toMatch(/\.guide-trigger\s*\{[^}]*min-height:\s*48px/);
    expect(styles).toMatch(/\.guide-composer input\s*\{[^}]*min-height:\s*48px;[^}]*font-size:\s*16px/);
    expect(styles).toMatch(/\.guide-composer button\s*\{[^}]*min-height:\s*48px/);
    expect(styles).toMatch(/@media \(max-width: 760px\) \{[\s\S]*?\.guide-close \{[^}]*width:\s*44px; height:\s*44px/);
    expect(styles).toMatch(/\.guide-prompts button\s*\{[^}]*min-height:\s*44px/);
    expect(guide).toContain('aria-label="Close Teregon Guide"');
    expect(home).toMatch(/href="mailto:hello@teregonlabs\.com\?subject=Talk%20with%20Teregon"/);
    expect(home).toContain('min-h-14 items-center justify-between');
    expect(home).toContain('min-h-12 items-center');
  });
});
