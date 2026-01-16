import { setRequestLocale } from "next-intl/server";
import { ChatListContent } from "./chat-list-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ChatPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ChatListContent />;
}
