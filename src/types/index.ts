// App types

export type Screen = "discover" | "swipe" | "chat" | "profile";

export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  avatar: string;
  verified: boolean;
  online: boolean;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  type: "match" | "message" | "like" | "view";
  userId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
