const { describe, expect, test } = require('bun:test');
const { readFileSync } = require('node:fs');
const { normalizeHeroPointer, shouldEnableHeroPointer } = require('../terrain.js');
const styles = readFileSync(require.resolve('../styles.css'), 'utf8');

describe('desktop hero pointer motion', () => {
  test('normalizes pointer position around the hero center and clamps the edges', () => {
    const rect = { left: 100, top: 50, width: 800, height: 400 };
    expect(normalizeHeroPointer(500, 250, rect)).toEqual({ x: 0, y: 0 });
    expect(normalizeHeroPointer(100, 50, rect)).toEqual({ x: -1, y: -1 });
    expect(normalizeHeroPointer(900, 450, rect)).toEqual({ x: 1, y: 1 });
    expect(normalizeHeroPointer(2000, -100, rect)).toEqual({ x: 1, y: -1 });
  });

  test('enables pointer tracking only for desktop fine-pointer motion users', () => {
    const desktop = { innerWidth: 1440, finePointer: true, hover: true, reducedMotion: false };
    expect(shouldEnableHeroPointer(desktop)).toBe(true);
    expect(shouldEnableHeroPointer({ ...desktop, innerWidth: 800 })).toBe(false);
    expect(shouldEnableHeroPointer({ ...desktop, finePointer: false })).toBe(false);
    expect(shouldEnableHeroPointer({ ...desktop, hover: false })).toBe(false);
    expect(shouldEnableHeroPointer({ ...desktop, reducedMotion: true })).toBe(false);
  });

  test('rotating hero verbs overlap so the cycle stays legible', () => {
    expect(styles).toContain('.hero-word-cycle>span:nth-child(2){animation-delay:2.92s}');
    expect(styles).toContain('.hero-word-cycle>span:nth-child(3){animation-delay:5.84s}');
    expect(styles).toContain('.hero-word-cycle>span:nth-child(4){animation-delay:8.76s}');
    expect(styles).toMatch(/@keyframes hero-word-turn\{0%\{opacity:0;[\s\S]*?1%,23\.5%\{opacity:1;[\s\S]*?27%,100%\{opacity:0;/);
    expect(styles).toContain('@media(prefers-reduced-motion:reduce){.hero-word-cycle>span');
  });

  test('Guide and contact controls keep readable text and touch sizes', () => {
    expect(styles).toContain('.contact-form label,.guide-form label{font:12px/1.4 var(--sans)');
    expect(styles).toContain('.contact-form input,.contact-form textarea,.guide-form input{font-size:16px}');
    expect(styles).toContain('.guide-prompts button{font-size:13px;min-height:40px}');
    expect(styles).toContain('.guide-form small,.guide-answer{font:13px/1.55 var(--sans)');
  });
});
