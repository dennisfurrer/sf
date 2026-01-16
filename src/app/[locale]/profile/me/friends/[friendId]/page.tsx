import { setRequestLocale } from "next-intl/server";
import { FriendProfileContent } from "./friend-profile-content";

interface PageProps {
  params: Promise<{ locale: string; friendId: string }>;
}

export default async function FriendProfilePage({ params }: PageProps) {
  const { locale, friendId } = await params;
  setRequestLocale(locale);

  return <FriendProfileContent friendId={friendId} />;
}

export function generateStaticParams() {
  return [
    { locale: "en", friendId: "1" },
    { locale: "de", friendId: "1" },
  ];
}
