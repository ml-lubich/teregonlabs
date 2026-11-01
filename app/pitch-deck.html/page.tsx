import type { Metadata } from "next";
import { PitchDeckPage } from "@/components/pages/pitch-deck-page";

const title = "Teregon Labs Studio Deck";
const description = "Applied AI, custom software, configurable service offerings, client website builds, and prior Brio team product experience.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pitch-deck.html" },
  openGraph: { type: "website", url: "/pitch-deck.html", title, description, images: ["/assets/social-preview.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social-preview.jpg"] },
};

export default function Page() {
  return <PitchDeckPage />;
}
