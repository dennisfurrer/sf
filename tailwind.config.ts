import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Surface colors (dark backgrounds)
        surface: {
          black: "var(--color-black, #050505)",
          charcoal: "var(--color-charcoal, #0a0a0a)",
          smoke: "var(--color-smoke, #141414)",
          1: "var(--color-surface-1, #1a1a1a)",
          2: "var(--color-surface-2, #222222)",
          3: "var(--color-surface-3, #2a2a2a)",
        },
        // Theme-aware accent colors
        accent: {
          1: "var(--color-accent-1)",
          "1-light": "var(--color-accent-1-light)",
          "1-dark": "var(--color-accent-1-dark)",
          2: "var(--color-accent-2)",
          "2-light": "var(--color-accent-2-light)",
          "2-dark": "var(--color-accent-2-dark)",
          3: "var(--color-accent-3)",
          "3-light": "var(--color-accent-3-light)",
          "3-dark": "var(--color-accent-3-dark)",
        },
        // Text colors
        text: {
          primary: "var(--color-text-primary, #f5f5f7)",
          secondary: "var(--color-text-secondary, #a1a1a6)",
          muted: "var(--color-text-muted, #636366)",
        },
        // Legacy colors for compatibility
        lounge: {
          black: "#080808",
          charcoal: "#111111",
          smoke: "#1a1a1a",
          ember: "#1f1410",
        },
        rose: {
          DEFAULT: "#8b4d62",
          dark: "#5c3344",
          blush: "#b76e79",
        },
        gold: {
          DEFAULT: "#c9a962",
          light: "#e8d5a3",
        },
        green: {
          DEFAULT: "#4a7c59",
          light: "#6b9b7a",
        },
        velvet: {
          black: "#0a0608",
          deep: "#120a0f",
          rich: "#1a0f15",
          plum: "#2d1a24",
          wine: "#4a2035",
          rose: "#6b2d4a",
          blush: "#8b3d5c",
          pink: "#b85a7a",
          light: "#d4849e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Outfit", "sans-serif"],
      },
      // Z-index hierarchy for depth perception
      zIndex: {
        atmosphere: "0",
        "bg-gradient": "1",
        "content-back": "10",
        content: "20",
        "content-front": "30",
        "card-stack-3": "40",
        "card-stack-2": "50",
        "card-stack-1": "60",
        "card-active": "70",
        header: "80",
        nav: "90",
        "modal-backdrop": "100",
        modal: "110",
        toast: "120",
        tooltip: "130",
      },
      boxShadow: {
        // Elevation shadows (Apple-style depth)
        "elevation-1": "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)",
        "elevation-2": "0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)",
        "elevation-3": "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.4)",
        "elevation-4":
          "0 14px 28px rgba(0,0,0,0.35), 0 10px 10px rgba(0,0,0,0.4)",
        "elevation-5":
          "0 19px 38px rgba(0,0,0,0.4), 0 15px 12px rgba(0,0,0,0.35)",
        // Glow shadows (theme-aware)
        "glow-sm": "0 0 20px var(--glow-primary)",
        "glow-md": "0 0 40px var(--glow-primary)",
        "glow-lg": "0 0 60px var(--glow-primary)",
        "glow-xl": "0 0 80px var(--glow-secondary)",
        // Card shadows
        card: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        "card-hover":
          "0 16px 48px rgba(0,0,0,0.6), 0 0 40px var(--glow-primary)",
        "card-active": "0 4px 16px rgba(0,0,0,0.4)",
        // Inner shadows
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.1)",
        "inner-shadow": "inset 0 -1px 0 rgba(0,0,0,0.3)",
        // Legacy
        "glow-rose": "0 0 40px rgba(139,77,98,0.5)",
        "glow-gold": "0 0 40px rgba(201,169,98,0.5)",
        "glow-green": "0 0 40px rgba(74,124,89,0.5)",
      },
      backgroundImage: {
        glass:
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "glass-strong":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        "glow-rose":
          "radial-gradient(circle, rgba(139,77,98,0.4) 0%, transparent 70%)",
        "glow-gold":
          "radial-gradient(circle, rgba(201,169,98,0.4) 0%, transparent 70%)",
        "glow-green":
          "radial-gradient(circle, rgba(74,124,89,0.4) 0%, transparent 70%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "12px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "2xl": "64px",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
      animation: {
        // Legacy
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        smoke: "smoke 15s ease-out infinite",
        ember: "ember 3s ease-out infinite",
        shimmer: "shimmer 2s linear infinite",
        // New modern animations
        "float-logo": "float-logo 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in-scale": "fade-in-scale 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.4s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        pop: "pop 0.3s ease-out",
        "card-enter":
          "card-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "card-exit-left": "card-exit-left 0.4s ease-in forwards",
        "card-exit-right": "card-exit-right 0.4s ease-in forwards",
        "card-exit-up": "card-exit-up 0.4s ease-in forwards",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 77, 98, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 77, 98, 0.6)" },
        },
        smoke: {
          "0%": { transform: "translateY(0) scale(0.5)", opacity: "0" },
          "50%": { opacity: "0.3" },
          "100%": { transform: "translateY(-100vh) scale(1.5)", opacity: "0" },
        },
        ember: {
          "0%": { transform: "translateY(0) scale(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-200px) scale(0.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-logo": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-15px) scale(1.02)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "card-enter": {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(30px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "card-exit-left": {
          "0%": { opacity: "1", transform: "translateX(0) rotate(0)" },
          "100%": { opacity: "0", transform: "translateX(-150%) rotate(-15deg)" },
        },
        "card-exit-right": {
          "0%": { opacity: "1", transform: "translateX(0) rotate(0)" },
          "100%": { opacity: "0", transform: "translateX(150%) rotate(15deg)" },
        },
        "card-exit-up": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-100%) scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
