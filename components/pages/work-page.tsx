import Link from "next/link";

const capabilities = [
  {
    id: "ai",
    number: "01",
    label: "APPLIED AI",
    title: "Build assistants and agents for business workflows.",
    copy: "We design and build grounded knowledge search, bounded agents, case triage, and summarization. Each system is fitted to its sources, decision owners, and review requirements.",
    points: ["Grounded knowledge search", "Support and operations automation", "Human review and evidence gates"],
  },
  {
    id: "data",
    number: "02",
    label: "DATA + DECISION SYSTEMS",
    title: "Connect business data.",
    copy: "Connect CRM, product, support, and operational data into dependable views, forecasts, and decision tools shaped around a business question.",
    points: ["Data integration and modeling", "Forecasts from customer and product data", "Decision dashboards and tools"],
  },
  {
    id: "build",
    number: "03",
    label: "SOFTWARE ENGINEERING",
    title: "Build and ship custom software.",
    copy: "Build applications, internal tools, and integrations around existing workflows, with reliable data paths and AI features bounded by clear checks.",
    points: ["Product prototyping and delivery", "Integrations and internal tools", "Evaluation, observability, and iteration"],
  },
  {
    id: "nature",
    number: "04",
    label: "TEREGON AQUA / WATER SYSTEMS",
    title: "Apply software to water operations.",
    copy: "Teregon Aqua is our focused water practice. We configure tools for filtration and appliance businesses, service teams, and watershed planning using the records and observations available.",
    points: ["Product support and knowledge search", "Evidence-gated service triage", "Watershed context and planning views"],
  },
];

export function WorkPage() {
  return (
    <div className="w-full">
      <section className="page-hero">
        <p className="eyebrow">WHAT TEREGON LABS BUILDS / 01</p>
        <h1>Applied AI<br /><em>and custom software.</em></h1>
        <p>
          Teregon Labs designs and builds AI for business workflows: grounded
          search, agents, case triage, summarization, data tools, and decision
          support. Teregon Aqua focuses that work on water-product support,
          service operations, and watershed planning.
        </p>
        <div className="page-hero-image work-image"><span>FIELD STUDY / NORTH FORK</span></div>
      </section>

      <section className="service-list section-pad" aria-label="Teregon Labs capabilities">
        {capabilities.map((item) => (
          <article id={item.id} key={item.id}>
            <span className="service-number">{item.number}</span>
            <div>
              <p className="eyebrow">{item.label}</p>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              {item.id === "nature" && <Link className="arrow-link" href="/water.html">Explore Teregon Aqua <span>↗</span></Link>}
            </div>
            {item.id === "ai" && <div className="service-art art-land" aria-hidden="true"><span className="mini-contour" /><span className="mini-contour" /><span className="mini-contour" /></div>}
            {item.id === "data" && <div className="service-art art-water" aria-hidden="true"><span /><span /><span /><span /></div>}
            {item.id === "build" && <div className="service-art art-change" aria-hidden="true"><span /><span /><span /></div>}
            {item.id === "nature" && <div className="service-art art-land" aria-hidden="true"><span className="mini-contour" /><span className="mini-contour" /><span className="mini-contour" /></div>}
          </article>
        ))}
      </section>

      <section className="page-callout">
        <p className="eyebrow">CUSTOM AI / BUILT AROUND BUSINESS WORK</p>
        <h2>Understand the workflow.<br />Build the right system.</h2>
        <Link className="arrow-link" href="/#contact">Talk through a project <span>↗</span></Link>
      </section>
    </div>
  );
}
