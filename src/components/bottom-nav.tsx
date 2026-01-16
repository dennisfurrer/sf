"use client";

import { Compass, Heart, MessageCircle, User } from "lucide-react";
import { cn } from "~/lib/utils";

type Screen = "discover" | "swipe" | "chat" | "profile";

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems: { id: Screen; label: string; icon: typeof Compass }[] = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "swipe", label: "Match", icon: Heart },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="flex-shrink-0 glass border-t border-velvet-pink/20 safe-bottom">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const showBadge = item.id === "swipe" || item.id === "chat";

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-velvet-pink"
                  : "text-velvet-light/60 hover:text-velvet-light"
              )}
            >
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-velvet-pink to-gold rounded-full" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">
                {item.label}
              </span>
              {showBadge && (
                <span className="absolute top-1 right-3 min-w-[16px] h-4 px-1 flex items-center justify-center bg-gradient-to-r from-velvet-pink to-velvet-rose rounded-full text-[10px] font-bold text-white">
                  {item.id === "swipe" ? "5" : "12"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
