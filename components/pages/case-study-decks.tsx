import Image from "next/image";
import Link from "next/link";
import styles from "./case-study-decks.module.css";

type DeckTone = "aqua" | "blue";

function DeckShell({
  product,
  label,
  tone,
  pdf,
  children,
}: {
  product: string;
  label: string;
  tone: DeckTone;
  pdf: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.deck} ${styles[tone]}`}>
      <nav className={styles.toolbar} aria-label={`${product} presentation tools`}>
        <span className={styles.toolbarLabel}>{product} / case study</span>
        <a className={styles.download} href={pdf} download>
          Download presentation <span aria-hidden="true">↓</span>
        </a>
      </nav>
      <nav className={styles.slideIndex} aria-label={`${product} presentation slides`}>
        {Array.from({ length: 6 }, (_, index) => (
          <a key={index} href={`#${product.toLowerCase()}-slide-${index + 1}`} aria-label={`Go to slide ${index + 1}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </nav>
      <main className={styles.slides} aria-label={`${product} presentation`}>
        <p className={styles.deckLabel}>{label}</p>
        {children}
      </main>
    </div>
  );
}

function Slide({
  product,
  index,
  eyebrow,
  title,
  children,
  cover = false,
  dark = false,
}: {
  product: string;
  index: number;
  eyebrow: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  cover?: boolean;
  dark?: boolean;
}) {
  const id = `${product.toLowerCase()}-slide-${index}`;
  return (
    <section id={id} className={`${styles.slide} ${cover ? styles.cover : ""} ${dark ? styles.darkSlide : ""}`} aria-labelledby={`${id}-title`}>
      <div className={styles.slideTop}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <span className={styles.pageNumber}>{String(index).padStart(2, "0")} / 06</span>
      </div>
      {title && <h1 id={`${id}-title`} className={styles.slideTitle}>{title}</h1>}
      {children}
      <footer className={styles.slideFooter}>
        <span>TEREGON LABS · PRIOR BRIO TEAM EXPERIENCE</span>
        <span>{product} / {String(index).padStart(2, "0")}</span>
      </footer>
    </section>
  );
}

function Workflow({ steps }: { steps: Array<[string, string, string]> }) {
  return (
    <ol className={styles.workflow}>
      {steps.map(([name, description, kind], index) => (
        <li className={styles.workflowStep} key={name}>
          <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.stepKind}>{kind}</span>
          <strong>{name}</strong>
          <span className={styles.stepDescription}>{description}</span>
        </li>
      ))}
    </ol>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className={styles.scopeNote}>{children}</p>;
}

export function BrioBotDeck() {
  return (
    <DeckShell product="BrioBot" label="Salesforce support / case triage" tone="aqua" pdf="/assets/case-studies/teregon-brio-bot-case-study.pdf">
      <Slide product="briobot" index={1} eyebrow="SUPPORT OPERATIONS / CASE TRIAGE" cover dark title={<>BrioBot<span>Case triage with evidence and checks.</span></>}>
        <div className={styles.coverBody}>
          <div>
            <p className={styles.coverCopy}>A Salesforce support workflow built to gather context, find product evidence, and prepare a review-ready case update.</p>
            <p className={styles.attribution}>Prior Brio team product experience. Not a Teregon client engagement.</p>
          </div>
          <figure className={styles.coverVisual}>
            <Image src="/assets/mesh/briobot.webp" width={1448} height={1086} alt="Illustrative three-dimensional flow showing a support request passing through evidence and review gates" priority />
            <figcaption>ILLUSTRATIVE WORKFLOW VISUAL</figcaption>
          </figure>
        </div>
      </Slide>

      <Slide product="briobot" index={2} eyebrow="THE WORK / A CASE ARRIVES INCOMPLETE" title={<>Support cases carry<br />more than a question.</>}>
        <div className={styles.problemLayout}>
          <div className={styles.caseSheet} aria-label="Illustrative Salesforce case fields">
            <div className={styles.caseBar}><span>SUPPORT CASE</span><span>Illustrative record</span></div>
            <div className={styles.caseRow}><span>Customer issue</span><b>Water dispenser needs troubleshooting</b></div>
            <div className={styles.caseRow}><span>Product</span><b>Needs verification</b></div>
            <div className={styles.caseRow}><span>Reason / source</span><b>Not yet classified</b></div>
            <div className={styles.caseRow}><span>Next action</span><b>Awaiting review</b></div>
          </div>
          <div className={styles.problemCopy}>
            <p>For e-commerce support, a person may need to connect the case, product details, policy, and attached images before the right action is clear.</p>
            <p>The system was designed to prepare structured fields for a representative to inspect, while keeping the source material and checks close to the proposed update.</p>
            <Note>Illustrative case details. No customer record or product screenshot is shown.</Note>
          </div>
        </div>
      </Slide>

      <Slide product="briobot" index={3} eyebrow="THE WORKFLOW / FROM CASE TO PROPOSAL" title={<>Gather first.<br />Propose second.</>}>
        <p className={styles.intro}>The model works inside a pipeline that gathers context, retrieves supporting material, and validates a draft before a person acts.</p>
        <Workflow steps={[
          ["Case context", "Salesforce fields and conversation history", "INPUT"],
          ["Evidence", "Product and policy material; attached images", "RETRIEVE"],
          ["Proposed fields", "A model extracts and drafts a structured update", "DRAFT"],
          ["Validation", "Python checks formats, allowed values, and records", "CHECK"],
          ["Human review", "A representative reviews before any write", "DECIDE"],
        ]} />
        <p className={styles.smallCaption}>Workflow summarized from prior Brio team implementation notes.</p>
      </Slide>

      <Slide product="briobot" index={4} eyebrow="CONTROL / BOUNDED AUTOMATION" title={<>The model proposes.<br />Rules protect the record.</>}>
        <div className={styles.controlLayout}>
          <figure className={styles.controlImage}>
            <Image src="/assets/mesh/briobot.webp" width={1448} height={1086} alt="Illustrative case workflow surrounded by verification rings" />
          </figure>
          <ul className={styles.controlList}>
            <li><b>Evidence required</b><span>Unsupported values are cleared instead of guessed.</span></li>
            <li><b>Existing work preserved</b><span>Fields already completed by a person are not overwritten.</span></li>
            <li><b>Explicit write boundary</b><span>The model does not write to Salesforce; deterministic checks validate proposed fields.</span></li>
            <li><b>Safe stop</b><span>Uncertain or invalid cases stop for human review; dry-run is the default.</span></li>
          </ul>
        </div>
        <Note>Langfuse traces supported review of the workflow. This deck does not claim a production outcome or measured business impact.</Note>
      </Slide>

      <Slide product="briobot" index={5} eyebrow="WHAT THE CASE ESTABLISHES" title={<>An engineering result,<br />not a revenue claim.</>}>
        <div className={styles.statementGrid}>
          <article><span>01</span><h2>Evidence before fields</h2><p>Product records and policy material inform the proposed case update.</p></article>
          <article><span>02</span><h2>Deterministic checks</h2><p>Python rules validate values and protect the Salesforce write boundary.</p></article>
          <article><span>03</span><h2>Review stays visible</h2><p>Dry-run, safe-stop, and tracing support inspection before action.</p></article>
        </div>
        <div className={styles.evidenceStrip}><b>What we can support</b><span>Workflow design · source retrieval · structured extraction · validation · human review</span></div>
        <Note>Prior team materials include offline evaluation work. No production accuracy, time-saved, cost, or revenue result is claimed here.</Note>
      </Slide>

      <Slide product="briobot" index={6} eyebrow="TEREGON LABS / APPLIED AI + SOFTWARE" dark title={<>The useful part is<br />the whole workflow.</>}>
        <div className={styles.takeawayLayout}>
          <p className={styles.takeawayLead}>For a support team, the model is only one step. Useful automation connects the case system, product knowledge, validation rules, and the person responsible for the answer.</p>
          <div className={styles.nextSteps}>
            <span>Map the current process</span><span>Connect approved evidence</span><span>Keep writes bounded</span><span>Measure against a team baseline</span>
          </div>
        </div>
        <div className={styles.endLinks}><Link href="/briobot.html">Read the BrioBot case page ↗</Link><Link href="/">Explore Teregon Labs ↗</Link></div>
      </Slide>
    </DeckShell>
  );
}

export function BriopediaDeck() {
  return (
    <DeckShell product="Briopedia" label="Internal knowledge / grounded support search" tone="blue" pdf="/assets/case-studies/teregon-briopedia-case-study.pdf">
      <Slide product="briopedia" index={1} eyebrow="SUPPORT KNOWLEDGE / GROUNDED SEARCH" cover dark title={<>Briopedia<span>A support library with its source attached.</span></>}>
        <div className={styles.coverBody}>
          <div>
            <p className={styles.coverCopy}>A versioned knowledge library paired with retrieval and conversational search for product support teams.</p>
            <p className={styles.attribution}>Prior Brio team product experience. Not a Teregon client engagement.</p>
          </div>
          <figure className={styles.coverVisual}>
            <Image src="/assets/mesh/briopedia.webp" width={1448} height={1086} alt="Illustrative three-dimensional book opening into connected support knowledge" priority />
            <figcaption>ILLUSTRATIVE KNOWLEDGE-SYSTEM VISUAL</figcaption>
          </figure>
        </div>
      </Slide>

      <Slide product="briopedia" index={2} eyebrow="THE WORK / SUPPORT KNOWLEDGE" title={<>A useful answer starts<br />with maintained material.</>}>
        <div className={styles.problemLayout}>
          <figure className={styles.productArt}>
            <Image src="/assets/briopedia/briopedia_infographic_light.webp" width={880} height={770} alt="Briopedia brand illustration showing a support reference book, water appliance, and connected tools" />
            <figcaption>BRAND ILLUSTRATION · NOT A PRODUCT SCREENSHOT</figcaption>
          </figure>
          <div className={styles.problemCopy}>
            <p>Support material changes over time. Agents need to find the relevant guidance and know which source supports an answer.</p>
            <p>Briopedia paired an editable, git-backed wiki with semantic retrieval and an LLM chat layer, so source material could be maintained separately from the answer interface.</p>
            <Note>No authenticated Briopedia interface is reproduced in this presentation.</Note>
          </div>
        </div>
      </Slide>

      <Slide product="briopedia" index={3} eyebrow="THE KNOWLEDGE PATH / FROM EDIT TO ANSWER" title={<>Keep the source.<br />Find the passage.</>}>
        <p className={styles.intro}>The library, retrieval layer, and chat interface each have a clear job.</p>
        <Workflow steps={[
          ["Maintain", "Product knowledge in a git-backed wiki", "EDIT"],
          ["Version", "Review changes and preserve history", "TRACK"],
          ["Retrieve", "FAISS search finds relevant passages", "SEARCH"],
          ["Respond", "A local or cloud LLM uses retrieved context", "DRAFT"],
          ["Reference", "Return the answer with its source material", "CITE"],
        ]} />
        <p className={styles.smallCaption}>Illustrative workflow; the cards above are not captures of the signed-in application.</p>
      </Slide>

      <Slide product="briopedia" index={4} eyebrow="ILLUSTRATIVE INTERFACE / SOURCE-GROUNDED ANSWER" title={<>A clear path from question<br />back to the source.</>}>
        <div className={styles.mockInterface} aria-label="Illustrative Briopedia support search interface, not a product screenshot">
          <div className={styles.mockSidebar}><div className={styles.mockBrand}>Briopedia <span>SUPPORT LIBRARY</span></div><p>KNOWLEDGE</p><b>Water dispenser guide</b><span>Filter replacement</span><span>Temperature issue</span><span>Service policy</span><div className={styles.mockHistory}>VERSION HISTORY<br /><small>Product guide · updated</small></div></div>
          <div className={styles.mockMain}><div className={styles.mockTop}>SUPPORT SEARCH <span>ILLUSTRATIVE UI</span></div><div className={styles.mockQuestion}>How do I prepare this unit for filter replacement?</div><div className={styles.mockAnswer}><b>Answer draft</b><p>Use the approved product guide to identify the unit’s filter procedure. Confirm the model before sharing steps.</p><div className={styles.mockSource}><span>WIKI SOURCE</span><b>Water dispenser guide / Filter replacement</b><small>Retrieved passage · review source before replying</small></div></div><div className={styles.mockInput}>Ask a product question…</div></div>
        </div>
        <Note>Illustrative interface only. Text is generic and is not product guidance or a live Briopedia capture.</Note>
      </Slide>

      <Slide product="briopedia" index={5} eyebrow="TECHNICAL SHAPE / PACKAGED FOR A TEAM" title={<>A replaceable model layer.<br />A retained knowledge base.</>}>
        <div className={styles.architectureLayout}>
          <div className={styles.architectureFlow}>
            <span>Next.js<br /><small>SUPPORT INTERFACE</small></span><i>→</i>
            <span>FastAPI<br /><small>APPLICATION API</small></span><i>→</i>
            <span>FAISS<br /><small>RETRIEVAL INDEX</small></span>
          </div>
          <div className={styles.architectureNotes}><p><b>Source</b><span>Git-backed wiki with editable content and reviewable history.</span></p><p><b>Model</b><span>Local or cloud LLM connection, kept replaceable.</span></p><p><b>Deployment</b><span>Interface, API, and model connection packaged with Docker Compose.</span></p></div>
        </div>
        <Note>Architecture follows the published case-study description. No performance, revenue, or customer-impact figures are asserted.</Note>
      </Slide>

      <Slide product="briopedia" index={6} eyebrow="TEREGON LABS / APPLIED AI + SOFTWARE" dark title={<>Search should lead<br />back to the source.</>}>
        <div className={styles.takeawayLayout}>
          <p className={styles.takeawayLead}>The system’s durable part is the maintained knowledge. Retrieval and language models help people reach it; citations and editable history keep the answer connected to its source.</p>
          <div className={styles.nextSteps}><span>Maintain the knowledge</span><span>Retrieve before drafting</span><span>Show the source</span><span>Keep the model replaceable</span></div>
        </div>
        <div className={styles.endLinks}><Link href="/briopedia.html">Read the Briopedia case page ↗</Link><Link href="/">Explore Teregon Labs ↗</Link></div>
      </Slide>
    </DeckShell>
  );
}
