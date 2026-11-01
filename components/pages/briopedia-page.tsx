import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const system = [
  {
    id: "bp-source",
    step: "01",
    label: "KNOWLEDGE",
    title: "Git-backed wiki",
    copy: "Support material stays editable with a reviewable version history.",
    tech: "MAINTAINED CONTENT",
    icon: "bp-icon-wiki",
    bars: 3,
  },
  {
    id: "bp-retrieval",
    step: "02",
    label: "RETRIEVAL",
    title: "FAISS index",
    copy: "Relevant passages are retrieved from the knowledge corpus for a question.",
    tech: "SOURCE CONTEXT",
    icon: "bp-icon-index",
    bars: 4,
  },
  {
    id: "bp-response",
    step: "03",
    label: "RESPONSE",
    title: "LLM chat layer",
    copy: "A provider-agnostic layer can use local or cloud models with retrieved context.",
    tech: "LOCAL OR CLOUD",
    icon: "bp-icon-chat",
    bars: 2,
  },
];

export function BriopediaPage() {
  return (
    <div className="briopedia-page">
      <section className="bp-hero">
        <div className="bp-hero-copy">
          <Link className="bp-back" href="/#team-systems">← Back to team systems</Link>
          <p className="bp-kicker">PRIOR BRIO TEAM PRODUCT / KNOWLEDGE SYSTEMS</p>
          <Image className="bp-wordmark" src="/assets/briopedia/briopedia-logo.png" width={658} height={236} alt="Briopedia" priority />
          <h1>Support knowledge,<br /><em>connected to its source.</em></h1>
          <p className="bp-lede">A support library that brings maintained product knowledge and conversational search into one place—so answers can point back to the material behind them.</p>
          <a className="bp-primary" href="#system">Follow the system <span aria-hidden="true">↓</span></a>
        </div>
        <div className="bp-hero-art" aria-label="Briopedia product brand illustration">
          <div className="bp-orbit bp-orbit-a" />
          <div className="bp-orbit bp-orbit-b" />
          <Image src="/assets/briopedia/briopedia_infographic_dark.webp" width={880} height={791} alt="Illustration of a water dispenser, support knowledge book, and connected service symbols" priority />
          <span className="bp-art-caption">PRODUCT BRAND ART / NOT A SCREENSHOT</span>
        </div>
        <span className="bp-hero-index" aria-hidden="true">BRIO / 02</span>
      </section>

      <section className="bp-intro bp-reveal" aria-labelledby="bp-context-title">
        <div><p className="bp-kicker">THE CONTEXT</p><h2 id="bp-context-title">Good support depends on knowledge people can find—and keep current.</h2></div>
        <div className="bp-intro-body">
          <p>Support teams work across manuals, troubleshooting notes, and product guidance. Briopedia was built as an internal knowledge system: a versioned wiki for maintaining material, plus retrieval and chat for bringing relevant sources into a question.</p>
          <p className="bp-attribution">This is prior Brio team product experience. It is not a Teregon client engagement, and no business outcome is attributed here.</p>
        </div>
      </section>

      <section className="bp-path" aria-label="Briopedia knowledge path">
        <div className="bp-path-head"><span>THE KNOWLEDGE PATH</span><span>ONE QUESTION / THREE CONNECTED LAYERS</span></div>
        <svg className="bp-path-line" viewBox="0 0 1200 132" preserveAspectRatio="none" aria-hidden="true">
          <path className="bp-path-track" d="M0 85 C180 85 140 38 330 38 S500 105 630 78 S820 25 930 58 S1080 92 1200 34" />
          <path className="bp-path-glow" d="M0 85 C180 85 140 38 330 38 S500 105 630 78 S820 25 930 58 S1080 92 1200 34" />
        </svg>
        <div className="bp-path-stops">
          <a href="#bp-source"><span>01</span><b>Maintain</b><small>Editable source</small></a>
          <a href="#bp-retrieval"><span>02</span><b>Retrieve</b><small>Relevant passages</small></a>
          <a href="#bp-response"><span>03</span><b>Respond</b><small>Context in view</small></a>
        </div>
      </section>

      <section className="bp-system" id="system" aria-labelledby="bp-system-title">
        <div className="bp-section-head bp-reveal">
          <p className="bp-kicker">01 / THE SYSTEM</p>
          <h2 id="bp-system-title">A maintained source.<br /><em>A grounded answer.</em></h2>
          <p>Each layer has a distinct job: keep knowledge editable, find relevant passages, then use those sources to inform a response.</p>
        </div>
        <div className="bp-flow" aria-label="Briopedia system architecture">
          {system.map((item, index) => (
            <Fragment key={item.id}>
              <article className="bp-flow-card bp-reveal" id={item.id}>
                <span className="bp-step">{item.step}</span>
                <div className={`bp-flow-icon ${item.icon}`} aria-hidden="true">{Array.from({ length: item.bars }, (_, i) => <i key={i} />)}</div>
                <p className="bp-kicker">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span className="bp-flow-tech">{item.tech}</span>
              </article>
              {index < system.length - 1 && <span className="bp-flow-link" aria-hidden="true"><i /></span>}
            </Fragment>
          ))}
        </div>
        <div className="bp-architecture-note bp-reveal">
          <span>IMPLEMENTATION</span>
          <p><b>Next.js</b> interface · <b>FastAPI</b> async backend · <b>FAISS</b> retrieval · <b>Docker Compose</b> deployment</p>
        </div>
      </section>

      <section className="bp-visual-story" aria-labelledby="bp-visual-title">
        <div className="bp-visual-copy bp-reveal">
          <p className="bp-kicker">02 / THE EXPERIENCE</p>
          <h2 id="bp-visual-title">From a question<br />to useful context.</h2>
          <p>The system connects support questions with maintained material. These interface sketches explain the workflow; they are illustrative diagrams, not captures of the signed-in application.</p>
          <div className="bp-visual-legend"><span><i />Illustrative workflow visual</span><span>Not live product UI</span></div>
        </div>
        <div className="bp-ui-stack">
          <figure className="bp-ui-card bp-ui-search bp-reveal">
            <figcaption><span>ILLUSTRATIVE WORKFLOW / 01</span><b>Find a source</b></figcaption>
            <div className="bp-ui-window">
              <div className="bp-ui-topline"><span className="bp-ui-dot" /><span>Knowledge library</span><span className="bp-ui-status">SEARCH CONCEPT</span></div>
              <div className="bp-ui-searchbox"><span aria-hidden="true">⌕</span>Search maintained support knowledge<span className="bp-ui-key">↵</span></div>
              <div className="bp-ui-result"><span className="bp-file-icon">DOC</span><div><b>Product guidance</b><small>Maintained support article · source passage</small></div><span className="bp-result-arrow">↗</span></div>
              <div className="bp-ui-result"><span className="bp-file-icon">WIKI</span><div><b>Service knowledge</b><small>Versioned wiki material · source passage</small></div><span className="bp-result-arrow">↗</span></div>
              <div className="bp-ui-footnote">Example labels only · no customer or product records shown</div>
            </div>
          </figure>
          <figure className="bp-ui-card bp-ui-answer bp-reveal">
            <figcaption><span>ILLUSTRATIVE WORKFLOW / 02</span><b>Answer with context</b></figcaption>
            <div className="bp-ui-window">
              <div className="bp-ui-topline"><span className="bp-ui-avatar">B</span><span>Briopedia / support chat concept</span><span className="bp-ui-status">ILLUSTRATIVE</span></div>
              <div className="bp-chat-question">Where is the current guidance for a filter-change question?</div>
              <div className="bp-chat-answer"><span className="bp-chat-mark">B</span><div><b>Here is the matching support material.</b><p>A response concept grounded in retrieved passages from the maintained knowledge base.</p><span className="bp-source-chip">SOURCE · KNOWLEDGE ARTICLE</span></div></div>
              <div className="bp-chat-compose"><span>Ask about support knowledge…</span><i aria-hidden="true">↑</i></div>
              <div className="bp-ui-footnote">Diagram illustrates the source-grounded interaction pattern</div>
            </div>
          </figure>
        </div>
      </section>

      <section className="bp-guardrails bp-reveal" aria-labelledby="bp-guardrails-title">
        <div><p className="bp-kicker">03 / WHY THE ARCHITECTURE MATTERS</p><h2 id="bp-guardrails-title">Knowledge can change.<br /><em>Its history stays visible.</em></h2></div>
        <div className="bp-guardrail-list">
          <article><span>01</span><div><h3>Maintain the source</h3><p>Support material lives in a wiki that can be edited and reviewed over time.</p></div></article>
          <article><span>02</span><div><h3>Retrieve before responding</h3><p>FAISS search finds relevant corpus material to provide context to the chat layer.</p></div></article>
          <article><span>03</span><div><h3>Choose the model environment</h3><p>The provider-agnostic design supports local or cloud model options behind the backend.</p></div></article>
        </div>
      </section>

      <section className="bp-build bp-reveal" aria-labelledby="bp-build-title">
        <div className="bp-build-art">
          <Image src="/assets/briopedia/briopedia_infographic_light.webp" width={880} height={770} loading="lazy" decoding="async" alt="Briopedia illustration of a product guide, water dispenser, and connected support tools" />
          <span>BRIOPEDIA BRAND ILLUSTRATION</span>
        </div>
        <div className="bp-build-copy">
          <p className="bp-kicker">04 / BUILD NOTES</p>
          <h2 id="bp-build-title">A practical stack for an internal tool.</h2>
          <p>The interface, API, searchable knowledge, and model connection are packaged as a Docker Compose deployment. The architecture keeps the library and answer workflow connected while leaving the model provider replaceable.</p>
          <div className="bp-tech-list"><span>Next.js</span><span>FastAPI</span><span>Git-backed wiki</span><span>FAISS</span><span>Local + cloud LLM</span><span>Docker Compose</span></div>
          <p className="bp-smallprint">Architecture summary from verified project documentation. No performance, revenue, or customer-impact figures are claimed.</p>
        </div>
      </section>

      <section className="bp-next">
        <p className="bp-kicker">TEREGON / APPLIED AI + SOFTWARE</p>
        <h2>Build systems that<br /><em>keep the source close.</em></h2>
        <p>We bring this experience into new conversations about grounded search, support workflows, and software built around real operations.</p>
        <div><Link className="bp-primary" href="/#contact">Talk through a workflow <span aria-hidden="true">↗</span></Link><Link className="bp-secondary" href="/#team-systems">Explore related team systems <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
