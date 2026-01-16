import { setRequestLocale } from "next-intl/server";
import { UsageTrackerContent } from "./usage-tracker-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function UsageTrackerPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UsageTrackerContent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
