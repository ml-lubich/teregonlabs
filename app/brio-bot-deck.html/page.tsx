import type { Metadata } from "next";
import { BrioBotDeck } from "@/components/pages/case-study-decks";

const title = "BrioBot Case Study Presentation | Teregon Labs";
const description = "A Teregon Labs case-study presentation on prior Brio team Salesforce support triage work, evidence retrieval, deterministic checks, and review boundaries.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/brio-bot-deck.html" },
  openGraph: { type: "article", url: "/brio-bot-deck.html", title, description, images: ["/assets/mesh/briobot.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/mesh/briobot.webp"] },
};

export default function Page() {
  return <BrioBotDeck />;
}
