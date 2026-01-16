import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import "../globals.css";
import { routing } from "~/i18n/routing";
import { BottomNav } from "~/components/layout/bottom-nav";
import { Atmosphere } from "~/components/effects/atmosphere";
import { NoiseOverlay } from "~/components/effects/noise-overlay";
import { Vignette } from "~/components/effects/vignette";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StonelyFans | Connect & Vibe",
  description:
    "Where good vibes meet good times. Connect with like-minded cannabis enthusiasts.",
  keywords: ["cannabis", "dating", "social", "420", "stoner", "community"],
  authors: [{ name: "StonelyFans" }],
  openGraph: {
    title: "StonelyFans | Connect & Vibe",
    description:
      "Where good vibes meet good times. Connect with like-minded cannabis enthusiasts.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "StonelyFans | Connect & Vibe",
    description:
      "Where good vibes meet good times. Connect with like-minded cannabis enthusiasts.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="dark"
      data-theme="sunset"
      suppressHydrationWarning
    >
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable} font-body bg-surface-black text-text-primary min-h-screen overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Atmosphere effects */}
          <Atmosphere />
          <NoiseOverlay />
          <Vignette />

          {/* Main content */}
          <div className="relative z-content flex flex-col min-h-screen max-w-md mx-auto">
            <main className="flex-1 overflow-y-auto pb-24">{children}</main>

            {/* Bottom Navigation */}
            <BottomNav />
          </div>

          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--glass-bg-strong)",
                border: "1px solid var(--glass-border)",
                color: "var(--color-text-primary)",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
