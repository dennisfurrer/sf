import { setRequestLocale } from "next-intl/server";
import { MyProfileContent } from "./my-profile-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MyProfilePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MyProfileContent />;
}
