(() => {
  const node = (tag, className, text, attrs = {}) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
    return element;
  };

  let opener = document.querySelector('#guide-open');
  let dialog = document.querySelector('#teregon-guide');
  if (!opener) {
    opener = node('button', 'guide-open', 'Teregon Guide ', { id: 'guide-open', type: 'button', 'aria-controls': 'teregon-guide', 'aria-expanded': 'false' });
    opener.append(node('span', '', '⌁', { 'aria-hidden': 'true' }));
    document.body.append(opener);
  }
  if (!dialog) {
    dialog = node('dialog', '', '', { id: 'teregon-guide', 'aria-labelledby': 'teregon-guide-title' });
    const panel = node('div', 'guide-panel');
    const header = node('header', 'guide-header');
    const intro = node('div');
    intro.append(
      node('p', 'eyebrow', 'SITE GUIDE / GROUNDED IN THIS SITE'),
      node('h2', '', 'Teregon Guide', { id: 'teregon-guide-title' }),
      node('p', '', 'Quick answers about the studio, our work, and water systems. This guide uses site content; it is not a generative AI chat.')
    );
    header.append(intro, node('button', '', '×', { id: 'guide-close', type: 'button', 'aria-label': 'Close Teregon Guide' }));
    const messageLog = node('div', 'guide-messages', '', { id: 'guide-messages', role: 'log', 'aria-live': 'polite', 'aria-relevant': 'additions' });
    const prompts = node('div', 'guide-prompts', '', { 'aria-label': 'Suggested questions' });
    for (const prompt of ['What does Teregon Labs build?', 'What is Teregon Water?', 'Tell me about BrioBot and Briopedia', 'How do I start a project?']) {
      prompts.append(node('button', '', prompt, { type: 'button', 'data-guide-prompt': prompt }));
    }
    const form = node('form', 'guide-form', '', { id: 'guide-form' });
    const label = node('label', '', 'Ask about Teregon', { for: 'guide-input' });
    const inputRow = node('div');
    inputRow.append(node('input', '', '', { id: 'guide-input', name: 'question', autocomplete: 'off', required: '' }));
    const ask = node('button', '', 'Ask ↗', { type: 'submit' });
    inputRow.append(ask);
    form.append(label, inputRow);
    panel.append(header, messageLog, prompts, form, node('p', 'guide-answer', 'Answers come from this website. Questions are not sent to an AI service.'));
    dialog.append(panel);
    document.body.append(dialog);
  }

  const closer = dialog.querySelector('#guide-close');
  const messages = dialog.querySelector('#guide-messages');
  const form = dialog.querySelector('#guide-form');
  const input = dialog.querySelector('#guide-input');
  if (!closer || !messages || !form || !input || opener.dataset.guideBound === 'true') return;
  opener.dataset.guideBound = 'true';

  const contactForm = document.querySelector('#teregon-contact');
  const contactSection = contactForm?.closest('section');
  if (contactSection && !contactSection.id) contactSection.id = 'contact';

  const topics = [
    {
      keys: ['what is teregon water', 'water filtration', 'water filter', 'water appliance', 'filter manual', 'water business', 'water support', 'watershed', 'river', 'water systems', 'teregon water', 'flow'],
      answer: 'Teregon Water is our water-focused product direction. We can build support assistants grounded in filter and appliance manuals, service-case triage with deterministic review, and support analytics that surface repeat issues. These are offerings to scope with a water business, not water-sector deployments or proven results yet.',
      links: [['Explore Teregon Water', '/water.html'], ['Start a conversation', '#contact']]
    },
    {
      keys: ['briopedia', 'brio pedia', 'knowledge base', 'wiki', 'faiss'],
      answer: 'Briopedia is prior Brio team experience: a Next.js knowledge interface over a FastAPI service, a git-backed support wiki, FAISS retrieval, and local or cloud LLM chat grounded in retrieved material. It is not a Teregon client engagement.',
      links: [['See the team case studies', '/#team-systems'], ['View the studio deck', '/pitch-deck.html']]
    },
    {
      keys: ['briobot', 'brio bot', 'case triage', 'salesforce support', 'langgraph'],
      answer: 'BrioBot is prior Brio team experience for e-commerce support cases. A LangGraph workflow gathers case context, retrieves policy and product evidence, and drafts a next step; deterministic Python checks gate writable fields, with dry-run and safe-stop paths. It is not a Teregon client engagement.',
      links: [['See the team case studies', '/#team-systems'], ['View the studio deck', '/pitch-deck.html']]
    },
    {
      keys: ['eria', 'events website', 'hospitality website'],
      answer: 'ERIA Events is a live client website build for Bay Area venues and experiences, with venue discovery, event stories, and private or corporate inquiry paths. The build uses Next.js and Sanity CMS.',
      links: [['Visit ERIA', 'https://www.eria.co/'], ['See the project', '/#selected-work']]
    },
    {
      keys: ['w3 sourcing', 'w3sourcing', 'executive search'],
      answer: 'W3 Sourcing is a live client website build for a principal-led executive search firm. The site connects its practices, methodology, results, leadership, and inquiry path.',
      links: [['Visit W3 Sourcing', 'https://www.w3sourcing.com/'], ['See the project', '/#selected-work']]
    },
    {
      keys: ['what does teregon labs do', 'what does labs do', 'what does teregon build', 'what do you build', 'services', 'applied ai', 'ai agent', 'software studio'],
      answer: 'Teregon is the parent studio. Teregon Labs builds applied AI and software: grounded search, bounded support agents, forecasting and decision tools, and production web apps. Teregon Water focuses that systems work on water filtration, appliance support, and watershed questions.',
      links: [['Explore what we build', '/work.html'], ['Explore Teregon Water', '/water.html']]
    },
    {
      keys: ['how do you work', 'approach', 'start a project', 'engagement', 'process'],
      answer: 'We start with the decision and current workflow, map the relevant sources and constraints, build the smallest useful system, then compare it with an agreed baseline. A first conversation can help scope a focused project.',
      links: [['Our approach', '/approach.html'], ['Start a conversation', '#contact']]
    },
    {
      keys: ['price', 'pricing', 'cost', 'revenue', 'earnings', 'how much'],
      answer: 'The company context shared for this work is roughly $240K ARR during the BrioBot work and about $2M ARR now for Briopedia’s company. Those are company-level figures, not revenue attributed to BrioBot, Briopedia, or Teregon. No system-specific outcome figures or rate card have been verified for publication. Project scope and cost depend on the workflow, data sources, and deployment needs; contact Teregon to discuss a specific problem.',
      links: [['Start a conversation', '#contact']]
    },
    {
      keys: ['pitch deck', 'pdf', 'presentation', 'deck'],
      answer: 'The studio presentation covers Teregon, Teregon Labs, Teregon Water, live website builds, prior Brio team systems, and how we measure outcomes.',
      links: [['Preview the deck', '/pitch-deck.html'], ['Download the PDF', '/assets/teregon-labs-pitch-deck.pdf']]
    },
    {
      keys: ['contact', 'email', 'talk', 'reach you', 'get in touch'],
      answer: 'Use the contact form at the bottom of this page. It opens a prefilled email draft in your mail app; this site does not store or send your message.',
      links: [['Go to the contact form', '#contact'], ['Email Teregon', 'mailto:hello@teregonlabs.com']]
    }
  ];

  const normalize = (value) => value.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const answerFor = (question) => {
    const query = normalize(question);
    const words = new Set(query.split(' ').filter((word) => word.length > 2));
    let best = null;
    let bestScore = 0;
    for (const topic of topics) {
      let score = 0;
      for (const key of topic.keys) {
        const phrase = normalize(key);
        if (phrase && (` ${query} `).includes(` ${phrase} `)) score += 4 + phrase.split(' ').length;
        else {
          const matches = phrase.split(' ').filter((word) => words.has(word)).length;
          if (matches) score += matches / phrase.split(' ').length;
        }
      }
      if (score > bestScore) { best = topic; bestScore = score; }
    }
    return bestScore >= 1.5 ? best : {
      answer: 'I can answer from the information on this site about Teregon Labs, Teregon Water, our project examples, and how to start. I do not have an answer for that yet; send the question through the contact form and the team can follow up.',
      links: [['Explore the work', '/work.html'], ['Contact Teregon', '#contact']]
    };
  };

  const addMessage = (text, role, links = []) => {
    const item = document.createElement('div');
    item.className = role === 'user' ? 'guide-user' : 'guide-assistant';
    item.dataset.role = role;
    item.textContent = text;
    if (links.length) {
      const list = document.createElement('div');
      list.className = 'guide-links';
      for (const [label, href] of links) {
        const link = document.createElement('a');
        link.href = href === '#contact' && !document.querySelector('#contact') ? '/#contact' : href;
        link.textContent = label;
        if (href.startsWith('https://')) { link.target = '_blank'; link.rel = 'noreferrer'; }
        list.append(link);
      }
      item.append(list);
    }
    messages.append(item);
    messages.scrollTop = messages.scrollHeight;
  };

  const ask = (question) => {
    const clean = question.trim().slice(0, 500);
    if (!clean) return;
    addMessage(clean, 'user');
    const result = answerFor(clean);
    addMessage(result.answer, 'assistant', result.links);
  };

  opener.addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
    opener.setAttribute('aria-expanded', 'true');
    input.focus();
  });
  closer.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    opener.setAttribute('aria-expanded', 'false');
    opener.focus();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
    input.value = '';
    input.focus();
  });
  document.querySelectorAll('[data-guide-prompt]').forEach((button) => {
    button.addEventListener('click', () => ask(button.dataset.guidePrompt || ''));
  });

  addMessage('Hi. I can help you explore Teregon, our software work, water-focused offerings, and project examples. My answers are grounded in this site.', 'assistant', [['Explore the work', '/work.html']]);
})();
