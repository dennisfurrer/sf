import { setRequestLocale } from "next-intl/server";
import { FriendsListContent } from "./friends-list-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FriendsListPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FriendsListContent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
