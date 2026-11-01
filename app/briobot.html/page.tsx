import type { Metadata } from "next";
import { BriobotPage } from "@/components/pages/briobot-page";

const title = "BrioBot | Salesforce Support Case Triage";
const description = "Prior Brio team product experience: a Salesforce support workflow using LangGraph retrieval, deterministic Python write gates, dry-run paths, safe stops, and Langfuse tracing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/briobot.html" },
  openGraph: {
    type: "article",
    url: "/briobot.html",
    title,
    description,
    images: [{ url: "/assets/mesh/briobot.webp", alt: "Abstract three-dimensional workflow mesh for support case triage" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/mesh/briobot.webp"] },
};

export default function Page() {
  return <BriobotPage />;
}
