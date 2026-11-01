import type { Metadata } from "next";
import { BriopediaDeck } from "@/components/pages/case-study-decks";

const title = "Briopedia Case Study Presentation | Teregon Labs";
const description = "A Teregon Labs case-study presentation on prior Brio team knowledge systems: a versioned wiki, FAISS retrieval, source-grounded chat, and replaceable model layer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/briopedia-deck.html" },
  openGraph: { type: "article", url: "/briopedia-deck.html", title, description, images: ["/assets/mesh/briopedia.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/mesh/briopedia.webp"] },
};

export default function Page() {
  return <BriopediaDeck />;
}
