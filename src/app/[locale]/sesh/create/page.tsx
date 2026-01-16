import { setRequestLocale } from "next-intl/server";
import { CreateSessionContent } from "./create-session-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CreateSessionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CreateSessionContent />;
}
