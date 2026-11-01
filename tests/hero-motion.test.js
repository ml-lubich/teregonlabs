const { describe, expect, test } = require('bun:test');
const { readFileSync } = require('node:fs');

const home = readFileSync(require.resolve('../components/pages/home-page.tsx'), 'utf8');
const styles = readFileSync(require.resolve('../app/globals.css'), 'utf8');
const theme = readFileSync(require.resolve('../app/theme-subpages.css'), 'utf8');
const guide = readFileSync(require.resolve('../components/site-guide.tsx'), 'utf8');

describe('active Next.js homepage motion and controls', () => {
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

  test('hero headline has rotating shifting verb cycle with accessible label', () => {
    expect(home).toContain('aria-label="Software that flows."');
    expect(home).toContain('hero-word-cycle');
    expect(home).toContain('<span>flows.</span>');
    expect(home).toContain('<span>connects.</span>');
    expect(home).toContain('<span>adapts.</span>');
    expect(home).toContain('<span>works.</span>');
    expect(theme).toMatch(/animation-delay: -1\.5s/);
    expect(theme).toMatch(/nth-child\(2\) \{ animation-delay: -10\.5s/);
    expect(theme).toMatch(/nth-child\(3\) \{ animation-delay: -7\.5s/);
    expect(theme).toMatch(/nth-child\(4\) \{ animation-delay: -4\.5s/);
    expect(theme).toMatch(/0%, 1% \{ opacity: 0;[\s\S]*?2%, 27% \{ opacity: 1;[\s\S]*?28%, 100% \{ opacity: 0;/);
  });

  test('hero headline can wrap within the viewport on narrow screens', () => {
    expect(theme).toMatch(/\.hero-copy h1 \.hero-prefix\s*\{[^}]*white-space:\s*normal/);
    expect(theme).toMatch(/@media \(min-width: 640px\)\s*\{[^}]*\.hero-copy h1 \.hero-prefix\s*\{[^}]*white-space:\s*nowrap/);
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
