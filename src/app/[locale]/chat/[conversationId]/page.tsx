import { setRequestLocale } from "next-intl/server";
import { ChatConversationContent } from "./chat-conversation-content";

interface PageProps {
  params: Promise<{ locale: string; conversationId: string }>;
}

export default async function ChatConversationPage({ params }: PageProps) {
  const { locale, conversationId } = await params;
  setRequestLocale(locale);

  return <ChatConversationContent conversationId={conversationId} />;
}
