import type { Metadata } from "next";
import { ApproachPage } from "@/components/pages/approach-page";

const title = "AI Consulting and Software Delivery";
const description = "How Teregon Labs scopes applied AI and custom software around workflows, evidence, and human decisions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/approach.html" },
  openGraph: { type: "website", url: "/approach.html", title, description, images: ["/assets/social-preview.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social-preview.jpg"] },
};

export default function Page() {
  return <ApproachPage />;
}
