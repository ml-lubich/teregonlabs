const test = require('node:test');
const assert = require('node:assert/strict');
const { shouldUseCompactScrollStackViewport } = require('../scroll-stack.js');

const desktop = { innerWidth: 1600, pointerCoarse: false, hoverNone: false, maxTouchPoints: 0, prefersReducedMotion: false, hardwareConcurrency: 8 };

test('stack is limited to capable, wide, motion-enabled desktop viewports', () => {
  assert.equal(shouldUseCompactScrollStackViewport(desktop), false);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, innerWidth: 1366 }), true);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, prefersReducedMotion: true }), true);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, pointerCoarse: true }), true);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, maxTouchPoints: 5, innerWidth: 1800 }), true);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, maxTouchPoints: 5, innerWidth: 2000 }), false);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, maxTouchPoints: 1, hoverNone: true, innerWidth: 2000 }), true);
  assert.equal(shouldUseCompactScrollStackViewport({ ...desktop, hardwareConcurrency: 4 }), true);
});
