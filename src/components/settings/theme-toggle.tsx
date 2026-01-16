"use client";

import { useState, useEffect } from "react";
import { Sun, Leaf } from "lucide-react";

type Theme = "sunset" | "earthy";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("sunset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sf-theme") as Theme;
    if (saved && (saved === "sunset" || saved === "earthy")) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "sunset" ? "earthy" : "sunset";
    setTheme(newTheme);
    localStorage.setItem("sf-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5">
        <Sun className="w-5 h-5 text-white/40" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
      style={{
        background:
          theme === "sunset"
            ? "linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 45, 146, 0.3))"
            : "linear-gradient(135deg, rgba(45, 106, 79, 0.3), rgba(221, 161, 94, 0.3))",
        border: `1px solid ${theme === "sunset" ? "rgba(255, 107, 53, 0.4)" : "rgba(45, 106, 79, 0.4)"}`,
      }}
      title={`Switch to ${theme === "sunset" ? "Earthy" : "Sunset"} theme`}
    >
      {theme === "sunset" ? (
        <Sun className="w-5 h-5 text-orange-400" />
      ) : (
        <Leaf className="w-5 h-5 text-green-500" />
      )}
    </button>
  );
}
