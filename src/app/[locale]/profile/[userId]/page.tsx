import { setRequestLocale } from "next-intl/server";
import { UserProfileContent } from "./user-profile-content";

interface PageProps {
  params: Promise<{ locale: string; userId: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { locale, userId } = await params;
  setRequestLocale(locale);

  return <UserProfileContent userId={userId} />;
}
