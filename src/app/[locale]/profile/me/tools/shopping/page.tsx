import { setRequestLocale } from "next-intl/server";
import { ShoppingListContent } from "./shopping-list-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ShoppingListPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ShoppingListContent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
