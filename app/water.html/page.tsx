import type { Metadata } from "next";
import { WaterPage } from "@/components/pages/water-page";

const title = "Teregon Aqua | Water Product Support and Operations";
const description = "Configurable AI and software services for water filtration and appliance support, service operations, and watershed planning.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/water.html" },
  openGraph: { type: "website", url: "/water.html", title, description, images: ["/assets/social-preview.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social-preview.jpg"] },
};

export default function Page() {
  return <WaterPage />;
}
