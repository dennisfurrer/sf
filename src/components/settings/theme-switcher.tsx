"use client";

import { useState, useEffect } from "react";
import { Sun, Leaf } from "lucide-react";
import { cn } from "~/lib/utils";

type Theme = "sunset" | "earthy";

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>("sunset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme
    const saved = localStorage.getItem("sf-theme") as Theme;
    if (saved && (saved === "sunset" || saved === "earthy")) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("sf-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("flex gap-1 p-1.5 rounded-2xl glass-surface", className)}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5">
          <Sun className="w-4 h-4 text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Sunset</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl">
          <Leaf className="w-4 h-4 text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Earthy</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-1 p-1.5 rounded-2xl glass-surface border border-white/10",
        className
      )}
    >
      <button
        onClick={() => toggleTheme("sunset")}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium",
          theme === "sunset"
            ? "text-white shadow-lg"
            : "text-text-muted hover:text-text-secondary hover:bg-white/5"
        )}
        style={{
          background:
            theme === "sunset"
              ? "linear-gradient(135deg, #ff6b35 0%, #ff2d92 100%)"
              : "transparent",
          boxShadow:
            theme === "sunset"
              ? "0 4px 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 45, 146, 0.2)"
              : "none",
        }}
      >
        <Sun className="w-4 h-4" />
        <span className="text-sm">Sunset</span>
      </button>

      <button
        onClick={() => toggleTheme("earthy")}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium",
          theme === "earthy"
            ? "text-white shadow-lg"
            : "text-text-muted hover:text-text-secondary hover:bg-white/5"
        )}
        style={{
          background:
            theme === "earthy"
              ? "linear-gradient(135deg, #2d6a4f 0%, #dda15e 100%)"
              : "transparent",
          boxShadow:
            theme === "earthy"
              ? "0 4px 20px rgba(45, 106, 79, 0.4), 0 0 40px rgba(221, 161, 94, 0.2)"
              : "none",
        }}
      >
        <Leaf className="w-4 h-4" />
        <span className="text-sm">Earthy</span>
      </button>
    </div>
  );
}
