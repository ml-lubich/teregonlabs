const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const home = readFileSync(require.resolve('../components/pages/home-page.tsx'), 'utf8');
const styles = readFileSync(require.resolve('../app/globals.css'), 'utf8');
const shell = readFileSync(require.resolve('../components/site-shell.tsx'), 'utf8');

test('active homepage reveals content progressively, with mobile and reduced-motion fallbacks', () => {
  assert.match(home, /data-scroll-reveal/);
  assert.match(home, /translate-y-5 opacity-0 transition[\s\S]*?data-\[revealed=true\]:translate-y-0 data-\[revealed=true\]:opacity-100/);
  assert.match(home, /motion-reduce:translate-y-0 motion-reduce:opacity-100/);
  assert.match(home, /const targets = document\.querySelectorAll<HTMLElement>\("\[data-scroll-reveal\]"\)/);
  assert.match(home, /if \(reducedMotion \|\| !desktopPointer\.matches \|\| !\("IntersectionObserver" in window\)\)\s*\{\s*targets\.forEach\(\(target\) => \{ target\.dataset\.revealed = "true"; \}\)/);
  assert.match(home, /new IntersectionObserver\([\s\S]*?threshold: 0\.02, rootMargin: "0px"/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test('homepage does not depend on the retired scroll-stack implementation', () => {
  assert.doesNotMatch(home, /data-scroll-stack-card|scroll-stack\.js|shouldUseCompactScrollStackViewport/);
  assert.doesNotMatch(shell, /data-scroll-stack-card|scroll-stack\.js/);
});

test('water drop visibly falls into expanding ripples on its own repeating animation', () => {
  const dropStart = home.indexOf('function WaterDropMotion()');
  const pageStart = home.indexOf('export function HomePage()');
  assert.ok(dropStart >= 0 && pageStart > dropStart, 'WaterDropMotion stays part of the active homepage');
  const waterMotion = home.slice(dropStart, pageStart);

  assert.match(waterMotion, /const duration = 3600/);
  assert.match(waterMotion, /const fall = Math\.round\(Math\.min\(stage\.clientHeight \* 0\.43, 180\)\)/);
  assert.match(waterMotion, /drop\.animate\(\[[\s\S]*?translateY\(-12px\)[\s\S]*?translateY\(\$\{fall\}px\)[\s\S]*?translateY\(\$\{fall \+ 12\}px\)/);
  assert.match(waterMotion, /rings\.forEach\([\s\S]*?ring\.animate\(\[[\s\S]*?scale\(\.12, \.12\)[\s\S]*?scale\(\.72, \.42\)[\s\S]*?scale\(1\.42, \.78\)/);
  assert.equal((waterMotion.match(/iterations: Infinity/g) || []).length, 2, 'drop and ripples each repeat independently');
  assert.doesNotMatch(waterMotion, /addEventListener\(["']scroll|animation-timeline|scroll-drop|scroll-ripple/);
});

test('water scene settles visibly when motion is reduced or WAAPI is unavailable', () => {
  const dropStart = home.indexOf('function WaterDropMotion()');
  const pageStart = home.indexOf('export function HomePage()');
  const waterMotion = home.slice(dropStart, pageStart);
  assert.match(waterMotion, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(waterMotion, /reducedMotion\.matches \|\| !\("animate" in drop\)/);
  assert.match(waterMotion, /const setRestingState = \(\) => \{[\s\S]*?drop\.style\.opacity = "1"[\s\S]*?rings\.forEach/);
  assert.match(waterMotion, /if \(!reducedMotion\.matches\) return;\s*animations\.forEach\(\(animation\) => animation\.cancel\(\)\);\s*setRestingState\(\)/);
  assert.match(waterMotion, /removeEventListener\("change", onMotionChange\)/);
});
