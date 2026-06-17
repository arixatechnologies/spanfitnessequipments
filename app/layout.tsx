import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Span Fitness Equipments | Gym Equipment in Visakhapatnam",
    template: "%s | Span Fitness Equipments"
  },
  description:
    "Span Fitness Equipments is a premium gym equipment dealer in Visakhapatnam supplying commercial gym equipment, home gym equipment, treadmills, strength machines and fitness accessories.",
  keywords: [
    "fitness equipment store in Visakhapatnam",
    "gym equipment dealer",
    "commercial gym equipment",
    "home gym equipment",
    "fitness accessories",
    "treadmill dealer",
    "gym setup equipment",
    "Span Fitness Equipments"
  ],
  openGraph: {
    title: "Span Fitness Equipments",
    description:
      "Premium cardio, strength, accessories and gym setup equipment across Andhra Pradesh and Telangana.",
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [{ url: "/images/og/span-fitness-equipment-og-image.png", width: 1200, height: 630, alt: "Span Fitness Equipments" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Span Fitness Equipments",
    description: siteConfig.description,
    images: ["/images/og/span-fitness-equipment-og-image.png"]
  },
  alternates: { canonical: siteConfig.url },
  category: "Fitness Equipment",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: "/logo.svg", apple: "/span-fitness-logo.png" },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
