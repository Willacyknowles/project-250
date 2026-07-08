import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.publicProduct} | ${siteConfig.platformName}`,
    template: `%s | ${siteConfig.publicProduct}`,
  },
  description: siteConfig.platformDescription,
  applicationName: siteConfig.platformName,
  authors: [{ name: siteConfig.company }],
  creator: siteConfig.company,
  publisher: siteConfig.company,
  openGraph: {
    title: siteConfig.publicProduct,
    description: siteConfig.platformDescription,
    siteName: siteConfig.publicProduct,
    type: "website",
    url: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8faf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
