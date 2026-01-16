"use client";

import { Compass, Heart, Leaf, User, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "~/i18n/routing";
import { cn } from "~/lib/utils";

const navItems = [
  { icon: Compass, labelKey: "discover", href: "/discover" as const },
  { icon: Leaf, labelKey: "sesh", href: "/sesh" as const },
  { icon: Video, labelKey: "vibe", href: "/vibe" as const },
  { icon: Heart, labelKey: "match", href: "/match" as const },
  { icon: User, labelKey: "profile", href: "/profile/me" as const },
];

// Gold color for active state
const GOLD = "#D4AF37";

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className="mt-2 fixed bottom-0 inset-x-0 border-t safe-bottom z-nav"
      style={{
        background: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="grid grid-cols-5 pb-0.5 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, labelKey, href }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={labelKey}
              href={href}
              className={cn(
                "mt-5 relative flex flex-col items-center justify-center gap-0.5 py-0.5 transition-all duration-200",
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
