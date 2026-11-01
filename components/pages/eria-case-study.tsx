import Image from "next/image";
import Link from "next/link";

const buildFacts = [
  ["01", "Public website", "A responsive destination for ERIA’s venues, experiences, events, and press."],
  ["02", "Content operations", "A private admin and content system gives the team a place to manage the public experience."],
  ["03", "Workflow automation", "Automations support repeatable work behind the site and help move inquiries through the team’s process."],
];

export function EriaCaseStudy() {
  return (
    <article className="eria-study">
      <section className="eria-study-hero" aria-labelledby="eria-title">
        <div className="eria-study-hero-copy">
          <p className="eria-kicker"><span>LIVE CLIENT BUILD</span><span>HOSPITALITY / EVENTS</span></p>
          <h1 id="eria-title">A digital front door<br /><em>for ERIA.</em></h1>
          <p className="eria-lede">We built ERIA’s public website and the tools behind it: a clear path through venues and experiences, supported by a private content system and workflow automation.</p>
          <div className="eria-hero-actions">
            <a className="eria-button" href="https://www.eria.co/" target="_blank" rel="noreferrer">Visit ERIA.co <span aria-hidden="true">↗</span></a>
            <a className="eria-text-link" href="#the-build">Explore the build <span aria-hidden="true">↓</span></a>
          </div>
          <p className="eria-stack">NEXT.JS <i>·</i> REACT <i>·</i> SANITY CMS <i>·</i> AUTOMATION</p>
        </div>
        <div className="eria-hero-art" aria-hidden="true">
          <div className="eria-orbit eria-orbit-one" />
          <div className="eria-orbit eria-orbit-two" />
          <div className="eria-orbit eria-orbit-three" />
          <div className="eria-signal"><span>E</span></div>
          <div className="eria-art-caption"><span>PUBLIC EXPERIENCE</span><span>LIVE / ERIA.CO</span></div>
          <div className="eria-gridline" />
        </div>
        <div className="eria-hero-index" aria-hidden="true">01 <span>/</span> 03</div>
      </section>

      <section className="eria-live-section" aria-labelledby="eria-live-title">
        <div className="eria-section-intro">
          <p className="eria-kicker">THE LIVE SITE / ERIA.CO</p>
          <h2 id="eria-live-title">A considered way<br />to find the occasion.</h2>
          <p>Venue discovery, event stories, and press context lead visitors toward tickets, private events, and corporate inquiries.</p>
          <a className="eria-text-link" href="https://www.eria.co/" target="_blank" rel="noreferrer">Explore the live site <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="eria-site-shot">
          <div className="eria-shot-frame">
            <Image src="/assets/case-studies/eria-live-site.jpg" alt="Public ERIA Events website homepage, captured from ERIA.co" width={1440} height={1000} sizes="(max-width: 760px) 100vw, 66vw" priority />
            <a className="eria-shot-link" href="https://www.eria.co/" target="_blank" rel="noreferrer">LIVE SITE <span aria-hidden="true">↗</span></a>
          </div>
          <figcaption><span>PUBLIC WEBSITE</span><span>Screenshot of ERIA.co · captured November 2026</span></figcaption>
        </figure>
      </section>

      <section className="eria-build-section" id="the-build" aria-labelledby="eria-build-title">
        <div className="eria-build-heading">
          <p className="eria-kicker">WHAT WE BUILT / 01—03</p>
          <h2 id="eria-build-title">The guest experience<br /><em>and the work behind it.</em></h2>
        </div>
        <div className="eria-build-grid">
          {buildFacts.map(([number, title, copy]) => (
            <article key={number} className="eria-build-card">
              <span className="eria-build-number">{number}</span>
              <div className="eria-build-mark" aria-hidden="true"><span /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="eria-ops-section" aria-labelledby="eria-ops-title">
        <div className="eria-ops-visual" aria-label="Illustrative view of content moving from an editorial system into a live venue page and team workflow">
          <div className="eria-ops-node eria-ops-source"><small>CONTENT</small><strong>Venue<br />stories</strong><span>EDIT + REVIEW</span></div>
          <div className="eria-ops-flow" aria-hidden="true"><i /><i /><i /></div>
          <div className="eria-ops-node eria-ops-site"><small>PUBLIC SITE</small><strong>ERIA.co</strong><span>PUBLISHED</span></div>
          <div className="eria-ops-flow eria-ops-flow-lower" aria-hidden="true"><i /><i /><i /></div>
          <div className="eria-ops-node eria-ops-team"><small>TEAM WORK</small><strong>Inquiry<br />follow-through</strong><span>AUTOMATED STEPS</span></div>
          <span className="eria-ops-caption">ILLUSTRATIVE WORKFLOW / NO PRIVATE SYSTEM SCREENSHOTS</span>
        </div>
        <div className="eria-ops-copy">
          <p className="eria-kicker">BEHIND THE PUBLIC EXPERIENCE</p>
          <h2 id="eria-ops-title">A site is only<br />one part of the build.</h2>
          <p>The public site is supported by a private admin and content workflow. We also built automation around repeatable team tasks. Those internal tools are not shown here; this diagram is an illustrative overview, not a screenshot of ERIA’s systems.</p>
          <p>That combination connects the way a guest discovers an experience with the work the ERIA team does to keep information current and inquiries moving.</p>
          <div className="eria-tags"><span>PUBLIC WEBSITE</span><span>PRIVATE CONTENT TOOLS</span><span>WORKFLOW AUTOMATION</span></div>
        </div>
      </section>

      <section className="eria-result-section" aria-label="Project summary">
        <p className="eria-kicker">A LIVE BUILD / IN USE</p>
        <div><h2>One connected<br /><em>digital experience.</em></h2><p>Designed and built for ERIA’s Bay Area venues and experiences. The public site is live; private operational details remain private.</p></div>
        <a className="eria-button eria-button-light" href="https://www.eria.co/" target="_blank" rel="noreferrer">See ERIA.co <span aria-hidden="true">↗</span></a>
      </section>

      <section className="eria-next-section">
        <p className="eria-kicker">BUILT BY TEREGON LABS</p>
        <h2>Have a workflow<br />that needs its own system?</h2>
        <div className="eria-next-actions"><Link className="eria-button" href="/#contact">Talk through a build <span aria-hidden="true">↗</span></Link><Link className="eria-text-link" href="/work.html">More studio work <span aria-hidden="true">↗</span></Link></div>
      </section>
    </article>
  );
}
