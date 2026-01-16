import { setRequestLocale } from "next-intl/server";
import { FriendRequestsContent } from "./friend-requests-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FriendRequestsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FriendRequestsContent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
