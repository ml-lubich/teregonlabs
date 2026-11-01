const { describe, expect, test } = require('bun:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { ServiceOfferings, offerings } = require('../components/service-offerings.tsx');

describe('Teregon service offerings', () => {
  test('renders six named, concrete offerings with distinct decorative marks', () => {
    const html = renderToStaticMarkup(React.createElement(ServiceOfferings));
    expect(offerings).toHaveLength(6);
    for (const phrase of [
      'Teregon Aqua', 'Teregon Oasis', 'Teregon Aquifer', 'Teregon Zephyr', 'Teregon Equinox', 'Teregon Terra',
      'manual-grounded troubleshooting', 'warranty workflows',
      'drafts replies from approved product and policy material', 'versioned knowledge base',
      'deterministic checks', 'service demand', 'field records',
    ]) expect(html.toLowerCase()).toContain(phrase.toLowerCase());
    expect((html.match(/<svg /g) || []).length).toBe(6);
    expect((html.match(/aria-hidden="true"/g) || []).length).toBe(6);
    expect(new Set(offerings.map((offer) => offer.name)).size).toBe(6);
  });
});
