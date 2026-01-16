"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import anime from "animejs";
import { Bell, Globe, Sun, Leaf, Check, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "~/i18n/routing";

interface HeroHeaderProps {
  onlineCount?: number;
}

const SESSION_KEY = "sf-intro-shown";
const THEME_KEY = "sf-theme";

type Theme = "sunset" | "earthy";
type ActiveMenu = "theme" | "language" | "notifications" | null;

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", title: "New Match!", message: "Luna wants to connect", time: "2m", read: false },
  { id: "2", title: "Sesh Starting", message: "Nearby sesh in 15 min", time: "10m", read: false },
  { id: "3", title: "Vibe Request", message: "Someone wants to vibe", time: "1h", read: true },
];

export function HeroHeader({ onlineCount = 4269 }: HeroHeaderProps) {
  const meshRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const smokeContainerRef = useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [theme, setTheme] = useState<Theme>("sunset");
  const [mounted, setMounted] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  // Initialize theme from sessionStorage
  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem(THEME_KEY) as Theme;
    if (saved && (saved === "sunset" || saved === "earthy")) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const selectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    sessionStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setActiveMenu(null);
  };

  const selectLanguage = (newLocale: "en" | "de") => {
    router.replace(pathname, { locale: newLocale });
    setActiveMenu(null);
  };

  const toggleMenu = (menu: ActiveMenu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(SESSION_KEY);
    if (!hasSeenIntro) {
      setIsFirstVisit(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      anime({
        targets: meshRef.current,
        rotate: [0, 360],
        duration: 60000,
        easing: "linear",
        loop: true,
      });
    }

    if (logoRef.current) {
      if (isFirstVisit) {
        anime({
          targets: logoRef.current,
          scale: [1.4, 1],
          opacity: [0, 1],
          translateY: [-30, 0],
          translateZ: [100, 0],
          duration: 1400,
          easing: "easeOutCubic",
          delay: 200,
        });
      } else {
        anime({
          targets: logoRef.current,
          scale: [0.95, 1],
          opacity: [0, 1],
          duration: 600,
          easing: "easeOutQuad",
        });
      }
    }

    // Smoke effect behind logo
    const smokeContainer = smokeContainerRef.current;
    if (!smokeContainer) return;

    const createLogoSmoke = () => {
      if (!smokeContainer) return;

      const plume = document.createElement("div");
      plume.className = "absolute pointer-events-none";

      const startX = anime.random(20, 80);
      const width = anime.random(60, 150);
      const height = anime.random(80, 180);

      plume.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        left: ${startX}%;
        bottom: 0;
        opacity: 0;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        background: radial-gradient(ellipse at center,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.03) 30%,
          rgba(255, 255, 255, 0.01) 60%,
          transparent 100%
        );
        filter: blur(${anime.random(25, 45)}px);
        transform-origin: center bottom;
      `;

      smokeContainer.appendChild(plume);

      anime({
        targets: plume,
        translateY: [0, anime.random(-200, -400)],
        translateX: [0, anime.random(-60, 60)],
        scaleX: [1, anime.random(1.5, 2.5)],
        scaleY: [1, anime.random(1.2, 1.8)],
        opacity: [0, 0.5, 0.3, 0],
        rotate: [0, anime.random(-15, 15)],
        duration: anime.random(6000, 10000),
        easing: "easeOutQuad",
        complete: () => plume.remove(),
      });
    };

    const smokeInterval = setInterval(createLogoSmoke, 3000);
    setTimeout(createLogoSmoke, 500);
    setTimeout(createLogoSmoke, 1500);

    return () => clearInterval(smokeInterval);
  }, [isFirstVisit]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeMenu && !(e.target as Element).closest(".nav-menu-container")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeMenu]);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="relative overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Gradient Mesh Background - reduced by 25% */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-surface-black" />
        <div
          ref={meshRef}
          className="absolute -inset-[30%] opacity-30"
          style={{
            background: "var(--gradient-hero-subtle)",
            filter: "blur(80px)",
            transformOrigin: "center center",
          }}
        />
        <div
          className="absolute top-0 left-1/4 w-[200px] h-[200px] rounded-full opacity-25 animate-pulse-glow"
          style={{
            background: "var(--gradient-glow)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 px-4 pt-safe pb-2">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-2 pt-2">
          {/* Online Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--color-accent-1)" }}
            />
            <span className="text-xs font-medium text-text-primary">
              {onlineCount.toLocaleString()} Online
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 nav-menu-container">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu("theme");
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    theme === "sunset"
                      ? "linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 45, 146, 0.3))"
                      : "linear-gradient(135deg, rgba(45, 106, 79, 0.3), rgba(221, 161, 94, 0.3))",
                  border: `1px solid ${theme === "sunset" ? "rgba(255, 107, 53, 0.4)" : "rgba(45, 106, 79, 0.4)"}`,
                }}
                title="Theme"
              >
                {mounted && (theme === "sunset" ? (
                  <Sun className="w-5 h-5 text-orange-400" />
                ) : (
                  <Leaf className="w-5 h-5 text-green-500" />
                ))}
              </button>

              {/* Theme Dropdown */}
              {activeMenu === "theme" && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="p-2">
                    <button
                      onClick={() => selectTheme("sunset")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #ff6b35, #ff2d92)",
                        }}
                      >
                        <Sun className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">Sunset</span>
                      {theme === "sunset" && (
                        <Check className="w-4 h-4 ml-auto" style={{ color: "var(--color-accent-1)" }} />
                      )}
                    </button>
                    <button
                      onClick={() => selectTheme("earthy")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #2d6a4f, #dda15e)",
                        }}
                      >
                        <Leaf className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">Earthy</span>
                      {theme === "earthy" && (
                        <Check className="w-4 h-4 ml-auto" style={{ color: "var(--color-accent-1)" }} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu("language");
                }}
                className="icon-btn relative"
                title="Language"
              >
                <Globe className="w-5 h-5" />
                <span
                  className="absolute -bottom-0.5 -right-0.5 text-[8px] font-bold uppercase"
                  style={{ color: "var(--color-accent-1)" }}
                >
                  {locale.toUpperCase()}
                </span>
              </button>

              {/* Language Dropdown */}
              {activeMenu === "language" && (
                <div
                  className="absolute top-full right-0 mt-2 w-40 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="p-2">
                    <button
                      onClick={() => selectLanguage("en")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10"
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-sm font-medium text-white">English</span>
                      {locale === "en" && (
                        <Check className="w-4 h-4 ml-auto" style={{ color: "var(--color-accent-1)" }} />
                      )}
                    </button>
                    <button
                      onClick={() => selectLanguage("de")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10"
                    >
                      <span className="text-lg">🇩🇪</span>
                      <span className="text-sm font-medium text-white">Deutsch</span>
                      {locale === "de" && (
                        <Check className="w-4 h-4 ml-auto" style={{ color: "var(--color-accent-1)" }} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu("notifications");
                }}
                className="relative icon-btn"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 animate-pulse"
                    style={{
                      backgroundColor: "var(--color-accent-2)",
                      borderColor: "var(--color-black)",
                    }}
                  />
                )}
              </button>

              {/* Notifications Dropdown */}
              {activeMenu === "notifications" && (
                <div
                  className="absolute top-full right-0 mt-2 w-72 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="p-3 border-b border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--color-accent-2)",
                          color: "white",
                        }}
                      >
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-3 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        style={{
                          background: notification.read ? "transparent" : "rgba(255, 255, 255, 0.03)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              backgroundColor: notification.read
                                ? "rgba(255, 255, 255, 0.2)"
                                : "var(--color-accent-1)",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-white/60 truncate">{notification.message}</p>
                          </div>
                          <span className="text-[10px] text-white/40">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <button
                      className="w-full py-2 text-xs font-medium rounded-xl transition-all hover:bg-white/10"
                      style={{ color: "var(--color-accent-1)" }}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo with Smoke Effect */}
        <div
          ref={logoRef}
          className="flex flex-col items-center opacity-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative">
            {/* Smoke container behind logo */}
            <div
              ref={smokeContainerRef}
              className="absolute inset-0 -inset-x-20 -bottom-10 overflow-hidden pointer-events-none z-0"
            />
            {/* Purple glow bg - shorter with darker edges */}
            <div
              className="absolute inset-x-0 top-1/4 bottom-1/4 blur-[60px] opacity-60"
              style={{
                background: "radial-gradient(ellipse 80% 60% at center, var(--glow-primary) 0%, var(--glow-secondary) 40%, rgba(0,0,0,0.8) 70%, transparent 100%)",
              }}
            />
            <Image
              src="/logo.png"
              alt="StonelyFans"
              width={2048}
              height={1365}
              className="relative z-10"
              style={{
                width: "auto",
                height: "clamp(228px, 36vw, 330px)",
                maxWidth: "95vw",
                marginTop: "-20px",
                marginBottom: "-20px",
                filter: "drop-shadow(0 0 40px var(--glow-secondary))",
              }}
              priority
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-black), transparent)",
        }}
      />
    </header>
  );
}
