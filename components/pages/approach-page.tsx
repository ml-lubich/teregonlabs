import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Understand the work",
    copy: "Map the current workflow, data sources, constraints, and decision owners. Make gaps and assumptions visible before selecting a model or interface.",
    symbol: "⌁",
  },
  {
    number: "02",
    title: "Build the smallest useful system",
    copy: "Connect the right sources, retrieval, models, and checks. Keep outputs tied to evidence and make uncertainty clear.",
    symbol: "∿",
  },
  {
    number: "03",
    title: "Measure and improve",
    copy: "Ship into the real workflow, review with the people using it, and compare results against an agreed baseline.",
    symbol: "↗",
  },
];

export function ApproachPage() {
  return (
    <div className="w-full">
      <section className="page-hero approach-hero">
        <p className="eyebrow">HOW WE WORK / 02</p>
        <h1>From workflow<br />to a <em>working system.</em></h1>
        <p>We start with the business workflow and decision, trace the available data, then scope and build the custom AI or software system that fits.</p>
        <div className="page-hero-image approach-image"><span>WORKFLOW → DATA → SOFTWARE</span></div>
      </section>

      <section className="process section-pad" aria-labelledby="approach-process-title">
        <div className="section-head">
          <div><p className="eyebrow">AI CONSULTING / SOFTWARE DELIVERY</p><h2 id="approach-process-title">Build around the work.</h2></div>
        </div>
        <div className="process-list">
          {steps.map((step) => (
            <article key={step.number}>
              <span className="process-no">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              <span className="process-symbol" aria-hidden="true">{step.symbol}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="principle-band">
        <span className="quote-mark" aria-hidden="true">“</span>
        <p>Useful AI follows the evidence—and leaves the decision with people.</p>
        <span>OUR BUILDING PRINCIPLE</span>
      </section>

      <section className="page-callout">
        <p className="eyebrow">START WITH THE WORKFLOW</p>
        <h2>Let’s make the<br />next step easier.</h2>
        <Link className="button button-light" href="/#contact">Talk with Teregon <span>↗</span></Link>
      </section>
    </div>
  );
}
