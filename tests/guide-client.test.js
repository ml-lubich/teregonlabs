const { describe, expect, test } = require('bun:test');
const { parseGuideStream, safeGuideLinks } = require('../site-guide.js');

function streamOf(chunks, hooks = {}) {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      if (!hooks.keepOpen) controller.close();
    },
    cancel(reason) { hooks.cancelled?.(reason); }
  });
}

describe('Teregon Guide stream client', () => {
  test('parses SSE frames split across arbitrary network chunks and accumulates deltas', async () => {
    const wire = 'data: {"choices":[{"delta":{"content":"A grounded "}}]}\n\ndata: {"choices":[{"delta":{"content":"answer."}}]}\n\ndata: [DONE]\n\n';
    const chunks = [wire.slice(0, 8), wire.slice(8, 37), wire.slice(37, 69), wire.slice(69)];
    const deltas = [];
    let done = 0;
    const result = await parseGuideStream(streamOf(chunks), {
      onDelta: (text) => deltas.push(text),
      onDone: () => { done += 1; },
      onError: () => {}
    });
    expect(deltas).toEqual(['A grounded ', 'answer.']);
    expect(result).toBe('A grounded answer.');
    expect(done).toBe(1);
  });

  test('reports a provider error frame and rejects the stream', async () => {
    let seenError;
    await expect(parseGuideStream(streamOf([
      'data: {"error":{"message":"provider unavailable"}}\n\n'
    ]), {
      onDelta: () => {}, onDone: () => {}, onError: (error) => { seenError = error; }
    })).rejects.toThrow();
    expect(seenError).toBeTruthy();
  });

  test('aborts and cancels a reader when the caller cancels', async () => {
    let markCancelled;
    const readerCancelled = new Promise((resolve) => { markCancelled = resolve; });
    const controller = new AbortController();
    const stream = new ReadableStream({
      start() {},
      cancel: markCancelled
    });
    const pending = parseGuideStream(stream, { onDelta: () => {}, onDone: () => {}, onError: () => {}, signal: controller.signal });
    controller.abort();
    await expect(pending).rejects.toThrow();
    await readerCancelled;
  });

  test('links only same-site destinations and approved external sites', () => {
    const segments = safeGuideLinks('Work at /work.html; [contact](#contact); https://www.eria.co/; https://evil.example/x; javascript:alert(1)');
    const hrefs = segments.filter((part) => part.href).map((part) => part.href);
    expect(hrefs).toContain('/work.html');
    expect(hrefs).toContain('#contact');
    expect(hrefs).toContain('https://www.eria.co/');
    expect(hrefs).not.toContain('https://evil.example/x');
    expect(hrefs.some((href) => href.startsWith('javascript:'))).toBe(false);
  });
});
