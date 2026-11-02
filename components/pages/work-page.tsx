import Link from "next/link";
import Image from "next/image";
import { ProjectTimeline } from "../project-timeline";

const capabilities = [
  {
    id: "ai",
    number: "01",
    label: "APPLIED AI",
    title: "Build assistants and agents for business workflows.",
    copy: "We design and build grounded knowledge search, bounded agents, case triage, and summarization. Each system is fitted to its sources, decision owners, and review requirements.",
    points: ["Grounded knowledge search", "Support and operations automation", "Human review and evidence gates"],
    image: "/assets/mesh/ai-workflow.webp",
    alt: "Illustrative three-dimensional mesh showing source records feeding a reviewed AI workflow",
    visualLabel: "ILLUSTRATIVE / GROUNDED AI WORKFLOW",
  },
  {
    id: "data",
    number: "02",
    label: "DATA + DECISION SYSTEMS",
    title: "Connect business data.",
    copy: "Connect CRM, product, support, and operational data into dependable views, forecasts, and decision tools shaped around a business question.",
    points: ["Data integration and modeling", "Forecasts from customer and product data", "Decision dashboards and tools"],
    image: "/assets/mesh/brioscope.webp",
    alt: "Illustrative three-dimensional mesh grouping customer events into recurring service patterns",
    visualLabel: "ILLUSTRATIVE / SERVICE DATA",
  },
  {
    id: "build",
    number: "03",
    label: "SOFTWARE ENGINEERING",
    title: "Build and ship custom software.",
    copy: "Build applications, internal tools, and integrations around existing workflows, with reliable data paths and AI features bounded by clear checks.",
    points: ["Product prototyping and delivery", "Integrations and internal tools", "Evaluation, observability, and iteration"],
    image: "/assets/project-w3sourcing.jpg",
    alt: "Screenshot of the live W3 Sourcing website built for a client",
    visualLabel: "LIVE CLIENT BUILD / W3 SOURCING",
  },
  {
    id: "nature",
    number: "04",
    label: "TEREGON AQUA / WATER SYSTEMS",
    title: "Apply software to water operations.",
    copy: "Teregon Aqua is our focused water practice. We configure tools for filtration and appliance businesses, service teams, and watershed planning using the records and observations available.",
    points: ["Product support and knowledge search", "Evidence-gated service triage", "Watershed context and planning views"],
    image: "/assets/water-droplet-pond.webp",
    alt: "Illustrative water droplet striking a forest pool and sending out ripples",
    visualLabel: "ILLUSTRATIVE / WATER SYSTEMS",
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
            <div className="service-art">
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 860px) 100vw, 34vw" className="service-art-image" />
              <span className="service-art-label">{item.visualLabel}</span>
            </div>
          </article>
        ))}
      </section>

      <ProjectTimeline
        eyebrow="SELECTED WORK / PROJECT SEQUENCES"
        title="From the first workflow to a live build."
        steps={[
          { title: "ERIA · shape the journey", detail: "Organize venues, experiences, events, press, and inquiry paths for public discovery." },
          { title: "ERIA · build and launch", detail: "Build a live responsive Next.js and React website with Sanity content operations." },
          { title: "W3 Sourcing · structure the story", detail: "Connect practices, methodology, results, and leadership context for a principal-led search firm." },
          { title: "W3 Sourcing · publish", detail: "Build and launch a responsive client website with a direct inquiry path." },
          { title: "BrioBot · support operations", detail: "Prior Brio team work: retrieve case evidence, draft updates, validate fields, and retain human review." },
          { title: "Briopedia · support knowledge", detail: "Prior Brio team work: maintain a versioned wiki, retrieve source passages, and connect them to chat." },
        ]}
      />

      <section className="page-callout">
        <p className="eyebrow">CUSTOM AI / BUILT AROUND BUSINESS WORK</p>
        <h2>Understand the workflow.<br />Build the right system.</h2>
        <Link className="arrow-link" href="/#contact">Talk through a project <span>↗</span></Link>
      </section>
    </div>
  );
}
