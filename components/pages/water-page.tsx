import Link from "next/link";

const offers = [
  {
    id: "water-assistant",
    number: "01",
    label: "TEREGON OASIS / SUPPORT AUTOMATION",
    title: "Support for water products.",
    copy: "A customer or technician asks about installation, filter changes, appliance faults, or service policy. A support assistant searches approved manuals and product guidance, then drafts an answer linked to its source.",
    points: ["Search product and service knowledge", "Show source material and uncertainty", "Escalate when evidence is missing"],
  },
  {
    id: "water-knowledge",
    number: "02",
    label: "TEREGON AQUIFER / GROUNDED KNOWLEDGE",
    title: "Search manuals, policies, and case history.",
    copy: "Connect approved product documents and service records so teams can find relevant material and prepare answers with source context.",
    points: ["Versioned knowledge sources", "Retrieval across product and service content", "Answers grounded in retrieved sources"],
  },
  {
    id: "water-triage",
    number: "03",
    label: "SERVICE + CASE TRIAGE",
    title: "Prepare a service case for review.",
    copy: "Combine the customer’s description with product records and approved service evidence. Classify the issue and draft a next step; deterministic rules and a person review any consequential update.",
    points: ["Issue classification and evidence retrieval", "Parts, warranty, and policy checks when configured", "Human approval before record changes"],
  },
  {
    id: "water-signals",
    number: "04",
    label: "SUPPORT ANALYTICS",
    title: "Group repeat questions and issues.",
    copy: "Bring support cases, service notes, and product feedback into a shared view. Compare recurring questions against the source records.",
    points: ["Recurring issue and contact themes", "Trace paths from pattern to source case", "Agree a baseline before measuring impact"],
  },
  {
    id: "watershed-context",
    number: "05",
    label: "TEREGON TERRA / WATERSHED SYSTEMS",
    title: "Combine watershed observations.",
    copy: "For planning work, bring available rainfall, stream observations, land cover, and community assets into shared watershed context. Use the data and boundaries agreed with the project team; this is not a live sensor network.",
    points: ["Watershed and river context views", "Existing observations in one place", "Scenario exploration for human-led planning"],
  },
];

export function WaterPage() {
  return (
    <div className="w-full">
      <section className="page-hero water-hero">
        <p className="eyebrow">TEREGON AQUA / WATER SYSTEMS</p>
        <h1>AI for water<br /><em>product support.</em></h1>
        <p>Teregon Aqua is the water practice within Teregon Labs. We configure AI and software for filtration and appliance teams, service operations, and watershed planning.</p>
        <div className="page-hero-image water-image"><span>WATER PRODUCTS / SERVICE / WATERSHEDS</span></div>
      </section>

      <section className="service-list section-pad water-offerings" aria-label="Configurable water services">
        <div className="section-head">
          <div><p className="eyebrow">CONFIGURABLE SERVICES</p><h2>Systems for water teams.</h2></div>
          <p className="cases-intro">These are services configured around a team’s data and workflow, not deployed Teregon products or claims of measured impact.</p>
        </div>
        {offers.map((offer) => (
          <article id={offer.id} key={offer.id}>
            <span className="service-number">{offer.number}</span>
            <div><p className="eyebrow">{offer.label}</p><h3>{offer.title}</h3><p>{offer.copy}</p><ul>{offer.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
            <div className="service-art art-water" aria-hidden="true"><span /><span /><span /><span /></div>
          </article>
        ))}
      </section>

      <section className="outcomes section-pad water-example" aria-labelledby="water-example-title">
        <div className="outcomes-heading">
          <p className="eyebrow">ILLUSTRATIVE SERVICE FLOW / NOT A DEPLOYED PRODUCT</p>
          <h2 id="water-example-title">A customer reports<br />low water flow.</h2>
          <p>This hypothetical support scenario shows how an AI assistant could use an approved manual and policy. The actual sources and checks would be configured with the operator.</p>
        </div>
        <div className="outcome-list">
          <article><span>01 / CASE</span><h3>Capture the issue</h3><p>A case includes the appliance model and the customer’s description.</p></article>
          <article><span>02 / SOURCE</span><h3>Find approved guidance</h3><p>Retrieval finds a relevant manual and service policy. The assistant drafts possible checks with source references.</p></article>
          <article><span>03 / REVIEW</span><h3>Approve the next step</h3><p>A technician checks the evidence and approves an action. If sources do not support an answer, the case is escalated.</p></article>
          <div className="outcome-measures"><span>MEASURE A REAL BUILD</span><p>Agree a baseline first. Compare handling time, repeat contacts, and service outcomes only when the client can verify them.</p></div>
        </div>
      </section>

      <section className="brand-architecture section-pad">
        <div className="section-head"><div><p className="eyebrow">PART OF TEREGON LABS</p><h2>Water is one practice<br />in a broader studio.</h2></div></div>
        <div className="brand-architecture-grid">
          <article><span>PARENT STUDIO</span><h3>Teregon</h3><p>The parent studio behind Teregon Labs and Teregon Aqua.</p><Link href="/about.html">About Teregon ↗</Link></article>
          <article><span>APPLIED AI + SOFTWARE</span><h3>Teregon Labs</h3><p>Custom AI and software for customer workflows and complex operations.</p><Link href="/work.html">Explore Teregon Labs ↗</Link></article>
          <article><span>WATER PRACTICE</span><h3>Teregon Aqua</h3><p>AI and software for water-product support, service, and watershed planning.</p><Link href="/water.html">You are here ↗</Link></article>
        </div>
      </section>

      <section id="contact" className="page-callout water-contact">
        <p className="eyebrow">TEREGON AQUA / START WITH THE WORK</p>
        <h2>What does your<br />water workflow need?</h2>
        <p>Tell us about a product manual, service path, or watershed decision your team needs to improve.</p>
        <Link className="button button-light" href="/#contact">Talk with Teregon <span>↗</span></Link>
      </section>
    </div>
  );
}
