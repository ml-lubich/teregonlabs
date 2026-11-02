import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/products-page";

const title = "Configurable AI and Software Services | Teregon Labs";
const description = "Applied AI and custom software services configured around your team’s workflows, data, and review needs. Explore Teregon Aqua, Oasis, Aquifer, Zephyr, Equinox, and Terra.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products.html" },
  openGraph: { type: "website", url: "/products.html", title, description, images: ["/assets/social-preview.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/social-preview.jpg"] },
};

export default function Page() {
  return <ProductsPage />;
}
