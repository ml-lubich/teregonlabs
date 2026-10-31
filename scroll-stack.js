(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) api.init(root);
})(typeof window === 'undefined' ? null : window, function () {
  function shouldUseCompactScrollStackViewport(signals) {
    return signals.innerWidth <= 1366 || signals.prefersReducedMotion || signals.pointerCoarse || (signals.maxTouchPoints > 0 && (signals.hoverNone || signals.innerWidth <= 1920)) || (signals.hardwareConcurrency > 0 && signals.hardwareConcurrency <= 4);
  }

  function init(win) {
    const stack = win.document.querySelector('[data-scroll-stack="cases"]');
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll('[data-scroll-stack-card]'));
    const media = {
      reduced: win.matchMedia('(prefers-reduced-motion: reduce)'),
      coarse: win.matchMedia('(pointer: coarse)'),
      noHover: win.matchMedia('(hover: none)')
    };
    const compact = () => shouldUseCompactScrollStackViewport({
      innerWidth: win.innerWidth,
      prefersReducedMotion: media.reduced.matches,
      pointerCoarse: media.coarse.matches,
      hoverNone: media.noHover.matches,
      maxTouchPoints: win.navigator.maxTouchPoints || 0,
      hardwareConcurrency: win.navigator.hardwareConcurrency
    });
    let frame = 0;
    let tops = [];
    const clear = () => {
      stack.dataset.variant = 'compact';
      cards.forEach((card) => {
        card.style.removeProperty('--stack-index');
        card.style.removeProperty('--stack-scale');
        card.style.removeProperty('--stack-opacity');
      });
    };
    const measure = () => {
      const stackTop = stack.getBoundingClientRect().top + win.scrollY;
      tops = cards.map((card) => stackTop + card.offsetTop);
    };
    const paint = () => {
      frame = 0;
      if (compact()) return clear();
      const y = win.scrollY;
      cards.forEach((card, index) => {
        const span = win.innerHeight * 0.82;
        const progress = index === cards.length - 1 ? 0 : Math.max(0, Math.min(1, (y + win.innerHeight * 0.82 - tops[index + 1]) / span));
        card.style.setProperty('--stack-index', index);
        card.style.setProperty('--stack-scale', (1 - progress * 0.06).toFixed(3));
        card.style.setProperty('--stack-opacity', (1 - progress * 0.28).toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = win.requestAnimationFrame(paint);
    };
    const update = () => {
      if (compact()) return clear();
      stack.dataset.variant = 'stack';
      measure();
      schedule();
    };
    win.addEventListener('scroll', schedule, { passive: true });
    win.addEventListener('resize', update, { passive: true });
    Object.values(media).forEach((query) => query.addEventListener('change', update));
    win.addEventListener('load', update, { once: true });
    update();
  }

  return { shouldUseCompactScrollStackViewport, init };
});
