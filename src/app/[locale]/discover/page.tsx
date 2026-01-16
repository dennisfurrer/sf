import { setRequestLocale } from "next-intl/server";
import { DiscoverContent } from "./discover-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DiscoverPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DiscoverContent />;
}
