import Image from "next/image";
import Link from "next/link";

const team = [
  {
    number: "01 / FOUNDING TEAM",
    name: "Misha Lubich",
    href: "https://www.mishalubich.com/",
    image: "/assets/team-misha.webp",
    width: 640,
    height: 800,
    alt: "Misha Lubich",
    bio: "CEO of Teregon Labs. His background includes machine-learning research using USGS stream data, ML pipeline work at Lawrence Berkeley National Laboratory (LBNL), and six research publications in machine learning for hydrology and environmental science.",
  },
  {
    number: "02 / FOUNDING TEAM",
    name: "Joseph Heupler",
    href: "https://www.josephheupler.com/",
    image: "/assets/team-joseph.webp",
    width: 480,
    height: 584,
    alt: "Joseph Heupler",
    bio: "Builds production agentic systems, retrieval pipelines, and evaluation workflows for business operations.",
  },
  {
    number: "03 / FOUNDING TEAM",
    name: "Yuvaraj Tankala",
    href: "https://yuvarajt.com/",
    image: "/assets/team-yuvaraj.webp",
    width: 640,
    height: 640,
    alt: "Yuvaraj Tankala",
    bio: "AI and machine-learning engineer, published researcher, and builder of venture AI and production systems.",
  },
];

const experience = ["EchoStar", "Apple", "Walmart", "Lawrence Berkeley Lab", "Honda Innovations", "UC Berkeley", "LUPFR", "Brio Water"];

export function AboutPage() {
  return (
    <div className="w-full">
      <section className="page-hero about-hero">
        <p className="eyebrow">ABOUT TEREGON / THE PARENT STUDIO</p>
        <h1>AI and software<br /><em>built for real work.</em></h1>
        <p>Teregon is the parent studio behind Teregon Labs and Teregon Aqua. The team builds custom AI and software for business workflows, with a focused practice for water-product support and watershed systems.</p>
        <div className="page-hero-image about-image"><span>TEREGON LABS / TEAM AND PRACTICES</span></div>
      </section>

      <section className="about-statement section-pad">
        <p className="eyebrow">THE STUDIO</p>
        <div>
          <h2>Applied AI and software consulting.</h2>
          <p>Teregon Labs builds custom assistants, workflow automation, data tools, integrations, and production software. Teregon Aqua is the focused water practice for filtration and appliance service operations, with land and watershed systems where relevant.</p>
          <p>We ground AI in approved sources, make system limits clear, and keep people in control of important decisions.</p>
          <Link className="arrow-link" href="/work.html">See what we build <span>↗</span></Link>
        </div>
      </section>

      <section className="brand-architecture section-pad" id="divisions" aria-labelledby="about-divisions-title">
        <div className="section-head">
          <div><p className="eyebrow">HOW THE STUDIO IS ORGANIZED</p><h2 id="about-divisions-title">One studio.<br />Two practices.</h2></div>
          <p className="cases-intro">Teregon is the parent studio. Teregon Labs builds across industries; Teregon Aqua focuses on water systems.</p>
        </div>
        <div className="brand-architecture-grid">
          <article><span>01 / PARENT STUDIO</span><h3>Teregon</h3><p>The shared studio behind Teregon Labs and Teregon Aqua.</p><Link href="/">Explore Teregon ↗</Link></article>
          <article><span>02 / AI + SOFTWARE</span><h3>Teregon Labs</h3><p>Custom AI solutions, decision tools, integrations, and production software for business workflows.</p><Link href="/work.html">Explore Teregon Labs ↗</Link></article>
          <article><span>03 / WATER PRACTICE</span><h3>Teregon Aqua</h3><p>AI support for water-product teams, service operations, and land or watershed systems.</p><Link href="/water.html">Explore Teregon Aqua ↗</Link></article>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 border-y border-[var(--line)] px-6 py-6 text-sm text-[var(--muted)] md:px-10" aria-label="Selected team experience and projects">
        <p className="eyebrow shrink-0">TEAM EXPERIENCE + PROJECTS</p>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2" aria-label="Organizations represented in prior team roles, research, and product work">
          {experience.map((organization) => <li className="font-medium" key={organization}>{organization}</li>)}
        </ul>
        <p className="basis-full text-xs leading-5 text-[var(--muted)]">Prior team roles, research, and product work. This is not a Teregon client or partner list.</p>
      </section>

      <section className="about-values" aria-label="How we work">
        <article><span>01</span><h3>Start with the real work</h3><p>Software must fit the workflow and the decision it supports.</p></article>
        <article><span>02</span><h3>Keep evidence close</h3><p>AI answers should point to their sources and make limits visible.</p></article>
        <article><span>03</span><h3>Build for the wider context</h3><p>Water, infrastructure, and communities connect across systems.</p></article>
      </section>

      <section className="team section-pad" id="team" aria-labelledby="team-title">
        <div className="section-head">
          <div><p className="eyebrow">THE TEREGON LABS TEAM</p><h2 id="team-title">People who build<br />and ship the work.</h2></div>
          <p className="cases-intro">Applied AI, software engineering, research, and operations experience across the team.</p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name}>
              <span className="team-number">{person.number}</span>
              <Image className="team-photo" src={person.image} alt={person.alt} width={person.width} height={person.height} sizes="(max-width: 700px) 85vw, 28vw" />
              <h3><a href={person.href} target="_blank" rel="noreferrer">{person.name} <span aria-hidden="true">↗</span></a></h3>
              <p>{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-callout">
        <p className="eyebrow">START WITH A REAL WORKFLOW</p>
        <h2>Have a project<br />in mind?</h2>
        <Link className="button button-light" href="/#contact">Start a conversation <span>↗</span></Link>
      </section>
    </div>
  );
}
