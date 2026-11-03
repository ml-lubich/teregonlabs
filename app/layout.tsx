import type { Metadata, Viewport } from "next";
import { DM_Mono, Space_Grotesk, Inter } from "next/font/google";
import { GuideWidget, SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";
import "../briopedia.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const siteUrl = new URL("https://teregonlabs.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Teregon Labs | Applied AI and Custom Software",
    template: "%s | Teregon Labs",
  },
  description:
    "Teregon Labs builds applied AI and custom software for customer workflows and complex operations, with a focused practice for water systems.",
  applicationName: "Teregon Labs",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Teregon Labs",
    url: "/",
    title: "Teregon Labs | Applied AI and Custom Software",
    description:
      "Applied AI and custom software for customer workflows and complex operations.",
    images: [{ url: "/assets/social-preview.png", width: 1200, height: 630, alt: "Teregon Labs — software that flows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teregon Labs | Applied AI and Custom Software",
    description:
      "Applied AI and custom software for customer workflows and complex operations.",
    images: ["/assets/social-preview.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#13241d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <GuideWidget />
      </body>
    </html>
  );
}
