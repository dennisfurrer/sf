import { setRequestLocale } from "next-intl/server";
import { VibeContent } from "./vibe-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function VibePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VibeContent />;
}
