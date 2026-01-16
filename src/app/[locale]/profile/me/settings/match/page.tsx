import { setRequestLocale } from "next-intl/server";
import { MatchSettingsContent } from "./match-settings-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MatchSettingsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MatchSettingsContent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
