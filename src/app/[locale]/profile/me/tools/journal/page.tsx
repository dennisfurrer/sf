import { setRequestLocale } from "next-intl/server";
import { StrainJournalContent } from "./strain-journal-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function StrainJournalPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StrainJournalContent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
