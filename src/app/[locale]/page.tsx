import { redirect } from "~/i18n/routing";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleRootPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Redirect to discover page
  redirect({ href: "/discover", locale });
}
