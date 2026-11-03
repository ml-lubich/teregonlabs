import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "Applied AI and Custom Software",
  description: "Teregon Labs builds custom AI and software for business workflows and operations, with Teregon Aqua focused on water-product service.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Teregon Labs | Applied AI and Custom Software",
    description: "Custom AI assistants, workflow automation, data tools, and production software for business operations.",
    images: [{ url: "/assets/social-preview.png", alt: "Teregon Labs — software that flows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teregon Labs | Applied AI and Custom Software",
    description: "Custom AI and software for business workflows, with a focused practice for water systems.",
    images: ["/assets/social-preview.png"],
  },
};

export default function Page() {
  return <HomePage />;
}
