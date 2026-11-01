(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.TeregonGuide = api;
  if (root && root.document) api.mount(root.document);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const APPROVED_EXTERNAL = new Set([
    'https://teregonlabs.com',
    'https://www.teregonlabs.com',
    'https://www.eria.co',
    'https://eria.co',
    'https://www.w3sourcing.com',
    'https://w3sourcing.com',
    'https://openrouter.ai'
  ]);
  const MAX_HISTORY = 8;

  function safeHref(raw) {
    if (!raw || /[\\\u0000-\u001f]/.test(raw)) return null;
    if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
    if (raw.startsWith('#')) return raw;
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:') return null;
      if (url.origin === 'https://openrouter.ai' && url.pathname === '/privacy') return url.href;
      if (APPROVED_EXTERNAL.has(url.origin)) return url.href;
    } catch (_) { return null; }
    return null;
  }

  // Parse only simple Markdown links; untrusted HTML and unapproved URLs remain text.
  function safeGuideLinks(text) {
    const source = String(text || '');
    const parts = [];
    const pattern = /\[([^\]\n]{1,160})\]\(([^\s)]+)\)|(https:\/\/[^\s<>()]+|\/(?!\/)[A-Za-z0-9._~!$&'()*+,;=:@%/?#-]*|#[A-Za-z0-9_-]+)/g;
    let cursor = 0;
    let match;
    while ((match = pattern.exec(source))) {
      if (match.index > cursor) parts.push({ text: source.slice(cursor, match.index) });
      const markdown = Boolean(match[1]);
      const raw = markdown ? match[2] : match[3];
      const trailing = raw.match(/[.,!?;:]+$/)?.[0] || '';
      const candidate = trailing ? raw.slice(0, -trailing.length) : raw;
      const href = safeHref(candidate);
      if (href) parts.push({ text: markdown ? match[1] : candidate, href });
      else parts.push({ text: markdown ? match[0] : candidate });
      if (trailing) parts.push({ text: trailing });
      cursor = pattern.lastIndex;
    }
    if (cursor < source.length) parts.push({ text: source.slice(cursor) });
    return parts;
  }

  async function parseGuideStream(stream, options = {}) {
    const { onDelta = () => {}, onDone = () => {}, onError = () => {}, signal } = options;
    const reader = stream && typeof stream.getReader === 'function' ? stream.getReader() : stream;
    if (!reader || typeof reader.read !== 'function') throw new TypeError('Expected a readable SSE stream');
    const decoder = new TextDecoder();
    let buffer = '';
    let text = '';
    let complete = false;
    const abortReader = () => { void reader.cancel?.(new DOMException('The operation was aborted.', 'AbortError')); };
    signal?.addEventListener('abort', abortReader, { once: true });
    const processFrame = (frame) => {
      const data = frame.split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => line.slice(5).replace(/^ /, '')).join('\n');
      if (!data) return;
      if (data.trim() === '[DONE]') {
        complete = true;
        onDone(text);
        return;
      }
      let payload;
      try { payload = JSON.parse(data); }
      catch (_) { return; }
      if (payload && payload.error) {
        const error = new Error('The guide could not complete that response. Please try again.');
        error.code = typeof payload.error === 'string' ? payload.error : 'unavailable';
        throw error;
      }
      const delta = payload?.choices?.[0]?.delta?.content;
      if (typeof delta === 'string' && delta) {
        text += delta;
        onDelta(delta, text);
      }
    };
    try {
      if (signal?.aborted) throw new DOMException('The operation was aborted.', 'AbortError');
      while (!complete) {
        const { value, done } = await reader.read();
        if (signal?.aborted) throw new DOMException('The operation was aborted.', 'AbortError');
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let boundary;
        while ((boundary = buffer.search(/\r?\n\r?\n/)) !== -1) {
          const frame = buffer.slice(0, boundary);
          const separator = buffer.slice(boundary).match(/^\r?\n\r?\n/)[0];
          buffer = buffer.slice(boundary + separator.length);
          processFrame(frame);
          if (complete) break;
        }
      }
      buffer += decoder.decode();
      if (!complete && buffer.trim()) processFrame(buffer);
      if (!complete) {
        throw new Error('The guide response ended before completion.');
      }
      return text;
    } catch (error) {
      if (error?.name !== 'AbortError') onError(error);
      throw error;
    } finally {
      try { reader.releaseLock?.(); } catch (_) { /* reader already released */ }
      signal?.removeEventListener('abort', abortReader);
    }
  }

  const makeNode = (doc, tag, className, text, attrs = {}) => {
    const el = doc.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
    return el;
  };

  function mount(doc) {
    if (!doc || doc.documentElement.dataset.guideMounted === 'true') return;
    let opener = doc.querySelector('#guide-open');
    let dialog = doc.querySelector('#teregon-guide');
    if (!opener) {
      opener = makeNode(doc, 'button', 'guide-open', 'Teregon Guide ', { id: 'guide-open', type: 'button', 'aria-controls': 'teregon-guide', 'aria-expanded': 'false' });
      opener.append(makeNode(doc, 'span', '', '⌁', { 'aria-hidden': 'true' }));
      doc.body.append(opener);
    }
    if (!dialog) {
      dialog = makeNode(doc, 'dialog', '', '', { id: 'teregon-guide', 'aria-labelledby': 'teregon-guide-title' });
      const panel = makeNode(doc, 'div', 'guide-panel');
      const header = makeNode(doc, 'header', 'guide-header');
      const intro = makeNode(doc, 'div');
      intro.append(
        makeNode(doc, 'p', 'eyebrow', 'SITE GUIDE / GROUNDED IN THIS SITE'),
        makeNode(doc, 'h2', '', 'Teregon Guide', { id: 'teregon-guide-title' }),
        makeNode(doc, 'p', '', 'Ask about Teregon Labs, our work, or Teregon Water. Answers use this site’s information; the guide may not know every detail.')
      );
      header.append(intro, makeNode(doc, 'button', '', '×', { id: 'guide-close', type: 'button', 'aria-label': 'Close Teregon Guide' }));
      const messageLog = makeNode(doc, 'div', 'guide-messages', '', { id: 'guide-messages', role: 'log', 'aria-live': 'polite', 'aria-relevant': 'additions' });
      const prompts = makeNode(doc, 'div', 'guide-prompts', '', { 'aria-label': 'Suggested questions' });
      for (const prompt of ['What does Teregon Labs build?', 'What is Teregon Water?', 'Tell me about BrioBot and Briopedia', 'How do I start a project?']) {
        prompts.append(makeNode(doc, 'button', '', prompt, { type: 'button', 'data-guide-prompt': prompt }));
      }
      const form = makeNode(doc, 'form', 'guide-form', '', { id: 'guide-form' });
      form.noValidate = true;
      form.append(makeNode(doc, 'label', '', 'Ask about Teregon', { for: 'guide-input' }));
      const inputRow = makeNode(doc, 'div');
      inputRow.append(makeNode(doc, 'input', '', '', { id: 'guide-input', name: 'question', autocomplete: 'off', maxlength: '1200', 'aria-label': 'Ask a question about Teregon' }));
      inputRow.append(makeNode(doc, 'button', '', 'Ask ↗', { type: 'submit' }));
      form.append(inputRow);
      panel.append(header, messageLog, prompts, form, makeNode(doc, 'p', 'guide-answer', 'Messages and conversation context are sent to OpenRouter to generate answers. Teregon does not store chat history. See the OpenRouter privacy policy.', { id: 'guide-disclosure' }));
      dialog.append(panel);
      doc.body.append(dialog);
    }

    const closer = dialog.querySelector('#guide-close');
    const messages = dialog.querySelector('#guide-messages');
    const form = dialog.querySelector('#guide-form');
    const input = dialog.querySelector('#guide-input');
    const submit = form?.querySelector('button[type="submit"]');
    if (!closer || !messages || !form || !input || !submit || opener.dataset.guideBound === 'true') return;
    doc.documentElement.dataset.guideMounted = 'true';
    opener.dataset.guideBound = 'true';

    // Ensure disclosure is present for both server-rendered and fallback markup.
    const disclosure = dialog.querySelector('#guide-disclosure') || dialog.querySelector('.guide-answer');
    if (disclosure) {
      disclosure.replaceChildren(doc.createTextNode('Messages and conversation context are sent to OpenRouter to generate answers. Teregon does not store chat history. '));
      const privacy = makeNode(doc, 'a', '', 'OpenRouter privacy policy', { href: 'https://openrouter.ai/privacy', target: '_blank', rel: 'noopener noreferrer' });
      disclosure.append(privacy, doc.createTextNode('.'));
      disclosure.setAttribute('aria-label', 'Privacy disclosure');
    }

    const contactForm = doc.querySelector('#teregon-contact');
    const contactSection = contactForm?.closest('section');
    if (contactSection && !contactSection.id) contactSection.id = 'contact';
    const conversation = [];
    let activeController = null;
    let activeBubble = null;

    const scrollLog = () => { messages.scrollTop = messages.scrollHeight; };
    const addBubble = (text, role) => {
      const bubble = makeNode(doc, 'div', role === 'user' ? 'guide-user' : 'guide-assistant', text, { 'data-role': role });
      messages.append(bubble);
      scrollLog();
      return bubble;
    };
    const renderAnswer = (bubble, text) => {
      bubble.classList.remove('guide-thinking', 'guide-streaming');
      bubble.replaceChildren();
      for (const segment of safeGuideLinks(text)) {
        if (segment.href) {
          const a = makeNode(doc, 'a', '', segment.text, { href: segment.href });
          if (segment.href.startsWith('https://') && !segment.href.startsWith('https://teregonlabs.com')) {
            a.target = '_blank'; a.rel = 'noopener noreferrer';
          }
          bubble.append(a);
        } else bubble.append(doc.createTextNode(segment.text));
      }
      scrollLog();
    };
    const showNotice = (bubble, text) => {
      if (!bubble) return;
      bubble.classList.remove('guide-thinking', 'guide-streaming');
      bubble.textContent = text;
    };
    const messageText = (kind, fallback) => {
      if (kind === 'rate_limited') return `${fallback} Please wait a little and try again.`;
      if (kind === 'invalid_request') return 'Please shorten that question and try again.';
      return fallback;
    };
    const resetPending = () => {
      activeController = null;
      activeBubble = null;
      input.disabled = false;
      submit.disabled = false;
      submit.textContent = 'Ask ↗';
      form.removeAttribute('aria-busy');
    };
    const cancel = () => {
      if (activeController) activeController.abort();
    };
    const ask = async (question) => {
      const clean = String(question || '').trim().slice(0, 1200);
      if (!clean) return;
      if (activeController) { cancel(); return; }
      addBubble(clean, 'user');
      activeBubble = addBubble('', 'assistant');
      activeBubble.classList.add('guide-thinking');
      const typing = makeNode(doc, 'span', 'guide-typing', '', { role: 'status', 'aria-label': 'Teregon Guide is thinking' });
      typing.append(makeNode(doc, 'span', 'guide-typing-label', 'Thinking'));
      for (let index = 0; index < 3; index += 1) typing.append(makeNode(doc, 'i', '', '•', { 'aria-hidden': 'true' }));
      activeBubble.append(typing);
      activeController = new AbortController();
      const controller = activeController;
      input.disabled = true;
      submit.disabled = false;
      submit.textContent = 'Stop';
      form.setAttribute('aria-busy', 'true');
      try {
        const messagesToSend = [...conversation, { role: 'user', content: clean }].slice(-MAX_HISTORY);
        const response = await fetch('/api/guide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
          body: JSON.stringify({ messages: messagesToSend }),
          signal: controller.signal
        });
        if (!response.ok) {
          let payload = {};
          try { payload = await response.json(); } catch (_) { /* use generic status */ }
          const retry = response.headers.get('Retry-After');
          let notice = messageText(payload.error, 'I can’t answer just now. Please try again shortly.');
          if (response.status === 429 && retry && /^\d+$/.test(retry)) notice += ` Retry in about ${retry} seconds.`;
          showNotice(activeBubble, notice);
          input.value = clean;
          return;
        }
        if (!response.body) throw new Error('stream unavailable');
        const answer = await parseGuideStream(response.body, {
          signal: controller.signal,
          onDelta: (_delta, accumulated) => {
            if (activeBubble) {
              activeBubble.classList.remove('guide-thinking');
              activeBubble.classList.add('guide-streaming');
              activeBubble.textContent = accumulated;
            }
            scrollLog();
          }
        });
        if (answer.trim()) {
          renderAnswer(activeBubble, answer);
          conversation.push({ role: 'user', content: clean }, { role: 'assistant', content: answer });
          conversation.splice(0, Math.max(0, conversation.length - MAX_HISTORY));
          input.value = '';
        } else {
          showNotice(activeBubble, 'I could not form an answer from the available site information. Please try a more specific question or contact the team.');
          input.value = clean;
        }
      } catch (error) {
        if (error?.name === 'AbortError') {
          if (activeBubble) showNotice(activeBubble, 'Response stopped.');
          else addBubble('Response stopped.', 'assistant');
          input.value = clean;
        } else {
          if (activeBubble) showNotice(activeBubble, 'The guide is temporarily unavailable. Please try again in a moment.');
          input.value = clean;
        }
      } finally {
        if (activeController === controller) resetPending();
        activeBubble = null;
        scrollLog();
      }
    };

    opener.addEventListener('click', () => {
      if (!dialog.open) dialog.showModal();
      opener.setAttribute('aria-expanded', 'true');
      input.focus();
    });
    closer.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      cancel();
      opener.setAttribute('aria-expanded', 'false');
      opener.focus();
    });
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (activeController) { cancel(); return; }
      const question = input.value;
      if (!question.trim()) { input.focus(); return; }
      void ask(question);
    });
    doc.querySelectorAll('[data-guide-prompt]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!dialog.open) dialog.showModal();
        input.value = button.dataset.guidePrompt || '';
        void ask(input.value);
      });
    });
    addBubble('Hi. I can help you explore Teregon Labs, our software work, Teregon Water, and project examples. Ask me about what we build or how to start.', 'assistant');
  }

  return { mount, parseGuideStream, safeGuideLinks };
});
