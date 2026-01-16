import { setRequestLocale } from "next-intl/server";
import { SessionDetailContent } from "./session-detail-content";

interface PageProps {
  params: Promise<{ locale: string; sessionId: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { locale, sessionId } = await params;
  setRequestLocale(locale);

  return <SessionDetailContent sessionId={sessionId} />;
}
