import Link from "next/link";
import { offerings } from "@/components/service-offerings";
import styles from "./products-page.module.css";

const serviceDetails = [
  {
    name: "Teregon Aqua",
    id: "aqua",
    fit: "Water filtration and appliance teams",
    inputs: "Product manuals, service policies, support cases, field observations, and the decisions a water team needs to make.",
    outputs: "Configured troubleshooting and warranty workflows, service views, or watershed planning tools.",
    boundary: "Watershed work uses agreed datasets and boundaries; it is not a live sensor network unless one is built for the project.",
  },
  {
    name: "Teregon Oasis",
    id: "oasis",
    fit: "Customer support and product service teams",
    inputs: "Approved manuals and policies, product details, and the customer’s case or question.",
    outputs: "A grounded draft, relevant source references, and a clear route for cases that need a person.",
    boundary: "A person handles exceptions and approves service actions. The sources and escalation rules are set with the team.",
  },
  {
    name: "Teregon Aquifer",
    id: "aquifer",
    fit: "Teams working across many product documents and service records",
    inputs: "Versioned manuals, policies, product documents, and approved case history.",
    outputs: "Search or chat that returns relevant passages and links answers to their source material.",
    boundary: "The team owns source approval, updates, access rules, and review of answers that affect customers or operations.",
  },
  {
    name: "Teregon Zephyr",
    id: "zephyr",
    fit: "Operations with repeatable work spread across business tools",
    inputs: "CRM, support, or product records; the workflow rules; and the fields an action may change.",
    outputs: "An agent that gathers context, summarizes a case, and prepares a structured next step.",
    boundary: "Deterministic checks constrain writes. A designated person approves consequential actions.",
  },
  {
    name: "Teregon Equinox",
    id: "equinox",
    fit: "Planning teams deciding what demand or workload may look like next",
    inputs: "Historical CRM, product, and service data, plus the assumptions the team wants to test.",
    outputs: "Forecasts, scenario views, and decision tools with source data and assumptions visible.",
    boundary: "Forecasts support planning; a team reviews assumptions and owns the decision.",
  },
  {
    name: "Teregon Terra",
    id: "terra",
    fit: "Land and watershed planning teams",
    inputs: "Available field records, land cover, rainfall, stream observations, and nearby assets.",
    outputs: "A shared place-based view for exploring connected conditions and planning scenarios.",
    boundary: "The project team agrees the data and geographic boundaries. The view does not imply new monitoring or field verification.",
  },
];

export function ProductsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="products-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>TEREGON LABS / SERVICES</p>
          <h1 id="products-title">Configured for the work <em>your team already does.</em></h1>
          <p className={styles.heroDescription}>We build applied AI and software around your team’s data, tools, and workflows. These services are configured with your team, not standalone products.</p>
          <a className={styles.heroLink} href="#offerings">Explore the services <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <svg viewBox="0 0 620 390" fill="none">
            <path className={styles.mapLine} d="M310 195C216 195 206 88 111 88M310 195C216 195 206 302 111 302M310 195C404 195 414 88 509 88M310 195C404 195 414 302 509 302" />
            <circle className={styles.mapOrbit} cx="310" cy="195" r="117" />
            <circle className={styles.mapOrbit} cx="310" cy="195" r="83" />
            <circle className={styles.mapCore} cx="310" cy="195" r="47" />
            <path d="M310 173v44m-22-22h44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <g className={styles.mapNode}><circle cx="111" cy="88" r="34" /><text x="111" y="92">AQUA</text></g>
            <g className={styles.mapNode}><circle cx="111" cy="302" r="34" /><text x="111" y="306">OASIS</text></g>
            <g className={styles.mapNode}><circle cx="509" cy="88" r="34" /><text x="509" y="92">ZEPHYR</text></g>
            <g className={styles.mapNode}><circle cx="509" cy="302" r="34" /><text x="509" y="306">TERRA</text></g>
            <text className={styles.mapCaption} x="310" y="374" textAnchor="middle">SIX SERVICES / BUILT AROUND YOUR WORK</text>
          </svg>
        </div>
      </section>

      <nav className={styles.index} aria-label="Service offerings" id="offerings">
        {offerings.map((offer, index) => (
          <a key={offer.name} href={`#${serviceDetails[index].id}`}><span>0{index + 1}</span>{offer.name.replace("Teregon ", "")}</a>
        ))}
      </nav>

      <section className={styles.services} aria-label="Configurable Teregon services">
        {offerings.map((offer, index) => {
          const detail = serviceDetails[index];
          return (
            <article className={styles.service} id={detail.id} key={offer.name} aria-labelledby={`${detail.id}-title`}>
              <div className={styles.serviceTop}>
                <p className={styles.eyebrow}>0{index + 1} / {offer.category}</p>
                <span className={styles.mark} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.serviceHeading}>
                <h2 id={`${detail.id}-title`}>{offer.name}</h2>
                <p>{offer.summary}</p>
              </div>
              <div className={styles.serviceBody}>
                <p className={styles.description}>{offer.detail}</p>
                <p className={styles.fit}><span>GOOD FIT</span>{detail.fit}</p>
                <div className={styles.specs}>
                  <section><h3>Typical inputs</h3><p>{detail.inputs}</p></section>
                  <section><h3>Possible deliverables</h3><p>{detail.outputs}</p></section>
                  <section><h3>Human review and ownership</h3><p>{detail.boundary}</p></section>
                </div>
              </div>
              <div className={styles.serviceFoot}><span>CONFIGURED WITH YOUR TEAM</span><Link href="/#contact">Discuss this service <span aria-hidden="true">↗</span></Link></div>
            </article>
          );
        })}
      </section>

      <section className={styles.waterPractice} aria-labelledby="aqua-practice-title">
        <div><p className={styles.eyebrow}>FOCUSED PRACTICE / WATER</p><h2 id="aqua-practice-title">Aqua brings the work<br />closer to water.</h2></div>
        <div><p>Teregon Aqua applies these services to water filtration and appliances, support operations, and watershed planning. Teregon Labs also builds custom AI and software for other industries.</p><Link href="/water.html">Explore Teregon Aqua <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
