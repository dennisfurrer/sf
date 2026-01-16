"use client";

import { Compass, Leaf, Video, MessageCircle, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "~/i18n/routing";
import { cn } from "~/lib/utils";

const navItems = [
  { icon: Compass, labelKey: "discover", href: "/discover" as const },
  { icon: Leaf, labelKey: "sesh", href: "/sesh" as const },
  { icon: Video, labelKey: "vibe", href: "/vibe" as const },
  { icon: MessageCircle, labelKey: "chat", href: "/chat" as const },
  { icon: User, labelKey: "profile", href: "/profile/me" as const },
];

// Gold color for active state
const GOLD = "#D4AF37";

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 border-t safe-bottom z-nav"
      style={{
        background: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, labelKey, href }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={labelKey}
              href={href}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                !isActive && "text-white/40 hover:text-white/60"
              )}
              style={isActive ? { color: GOLD } : undefined}
            >
              {isActive && (
                <span
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{
                    backgroundColor: GOLD,
                    boxShadow: `0 0 8px ${GOLD}`,
                  }}
                />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive && "scale-110"
                )}
              />
              <span
                className="text-[10px] font-medium uppercase tracking-wide"
                style={isActive ? { color: GOLD } : undefined}
              >
                {t(labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
