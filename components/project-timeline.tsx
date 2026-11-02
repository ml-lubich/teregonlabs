import styles from "./project-timeline.module.css";

export type ProjectMilestone = { title: string; detail: string };

export function ProjectTimeline({
  title,
  eyebrow = "PROJECT SEQUENCE / UNDATED",
  steps,
}: {
  title: string;
  eyebrow?: string;
  steps: ProjectMilestone[];
}) {
  return (
    <section className={styles.timeline} aria-label={title}>
      <div className={styles.heading}>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <ol className="project-timeline-list">
        {steps.map((step, index) => (
          <li className={styles.milestone} key={step.title}>
            <span className={styles.node} aria-hidden="true" />
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
