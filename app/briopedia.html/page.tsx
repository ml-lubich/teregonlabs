import type { Metadata } from "next";
import { BriopediaPage } from "@/components/pages/briopedia-page";

const title = "Briopedia | Support Knowledge System";
const description = "Prior Brio team product experience: a git-backed support wiki, FAISS retrieval, and local or cloud LLM chat. Not a Teregon client engagement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/briopedia.html" },
  openGraph: {
    type: "article",
    url: "/briopedia.html",
    title,
    description,
    images: [{ url: "/assets/briopedia/briopedia_infographic_dark.webp", alt: "Briopedia brand illustration, not a product screenshot" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/briopedia/briopedia_infographic_dark.webp"] },
};

export default function Page() {
  return <BriopediaPage />;
}
