import type { Metadata } from "next";
import { EriaCaseStudy } from "@/components/pages/eria-case-study";
import "../eria-case-study.css";

const title = "ERIA Events | Website, Content System and Automation";
const description = "A live Teregon Labs client build for ERIA Events: a responsive public website, private content tools, and workflow automation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/eria.html" },
  openGraph: {
    type: "article",
    url: "/eria.html",
    title,
    description,
    images: [{ url: "/assets/case-studies/eria-live-site.jpg", width: 1440, height: 1000, alt: "The public ERIA Events website" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/case-studies/eria-live-site.jpg"] },
};

export default function Page() {
  return <EriaCaseStudy />;
}
