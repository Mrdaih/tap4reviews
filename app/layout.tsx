import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { OrganizationJsonLd } from "@/components/shared/StructuredData";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A1A2E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — NFC Google Review Cards for UAE Restaurants`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "NFC review cards",
    "Google reviews UAE",
    "restaurant reviews Dubai",
    "tap to review",
    "NFC cards Dubai",
    "review booster",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — NFC Google Review Cards`,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon-32x32.png" },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink-800 font-sans text-white/90 antialiased">
        <OrganizationJsonLd />
        {children}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
