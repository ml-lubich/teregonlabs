import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";

const title = "About Teregon Labs";
const description = "Meet the Teregon Labs team and learn how its applied AI and custom software practices are organized.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about.html" },
  openGraph: { type: "website", url: "/about.html", title, description, images: ["/assets/social-preview.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social-preview.jpg"] },
};

export default function Page() {
  return <AboutPage />;
}
