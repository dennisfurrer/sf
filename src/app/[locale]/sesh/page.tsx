import { setRequestLocale } from "next-intl/server";
import { SeshContent } from "./sesh-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SeshPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SeshContent />;
}
