import type { Metadata } from "next";
import { WorkPage } from "@/components/pages/work-page";

const title = "Applied AI and Custom Software";
const description = "Teregon Labs builds custom AI, data systems, integrations, and software for business workflows and operations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work.html" },
  openGraph: { type: "website", url: "/work.html", title, description, images: ["/assets/social-preview.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social-preview.jpg"] },
};

export default function Page() {
  return <WorkPage />;
}
