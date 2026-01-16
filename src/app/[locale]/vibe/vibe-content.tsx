"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Video,
  Sparkles,
  Cigarette,
  Users,
  Zap,
  Coffee,
  PartyPopper,
  MessageCircle,
} from "lucide-react";
import anime from "animejs";
import type { SmokingStatus, GenderPref, VibeStyle } from "~/lib/types";

// Preference Option Component
function PreferenceOption({
  icon: Icon,
  label,
  selected,
  onClick,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  selected: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
      style={{
        background: selected ? `${color}20` : "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${selected ? color : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: selected ? `0 4px 20px ${color}30` : "none",
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
        style={{
          background: selected ? `${color}30` : "rgba(255, 255, 255, 0.08)",
        }}
      >
        <Icon
          className="w-6 h-6 transition-colors"
          style={{ color: selected ? color : "rgba(255, 255, 255, 0.5)" }}
        />
      </div>
      <span
        className="text-sm font-medium transition-colors"
        style={{ color: selected ? color : "rgba(255, 255, 255, 0.6)" }}
      >
        {label}
      </span>
    </button>
  );
}

// Preference Section Component
function PreferenceSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider">
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-3">{children}</div>
    </div>
  );
}

export function VibeContent() {
  const t = useTranslations("vibe");
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Preferences state
  const [smokingStatus, setSmokingStatus] = useState<SmokingStatus>("any");
  const [lookingFor, setLookingFor] = useState<GenderPref>("anyone");
  const [vibeStyle, setVibeStyle] = useState<VibeStyle>("chill");

  // Content entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, { start: 200 }),
        duration: 600,
        easing: "easeOutCubic",
      });
    }
  }, []);

  // Floating animation for the main icon
  useEffect(() => {
    anime({
      targets: ".vibe-icon",
      translateY: [-5, 5],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  // Pulse animation for the button
  useEffect(() => {
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        boxShadow: [
          "0 4px 30px rgba(156, 39, 176, 0.4)",
          "0 4px 50px rgba(156, 39, 176, 0.6)",
          "0 4px 30px rgba(156, 39, 176, 0.4)",
        ],
        duration: 2000,
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }, []);

  const handleStartVibing = () => {
    // TODO: Implement actual matching logic
    console.log("Starting vibe with preferences:", {
      smokingStatus,
      lookingFor,
      vibeStyle,
    });
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      {/* Header Area with Gradient */}
      <div
        className="relative pt-12 pb-8 px-4"
        style={{
          background:
            "linear-gradient(180deg, rgba(156, 39, 176, 0.15) 0%, transparent 100%)",
        }}
      >
        {/* Floating Orbs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-10 left-1/4 w-32 h-32 rounded-full blur-3xl"
            style={{ background: "rgba(156, 39, 176, 0.2)" }}
          />
          <div
            className="absolute top-20 right-1/4 w-24 h-24 rounded-full blur-3xl"
            style={{ background: "rgba(233, 30, 99, 0.15)" }}
          />
        </div>

        {/* Main Icon */}
        <div className="relative flex justify-center mb-6">
          <div
            className="vibe-icon w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(156, 39, 176, 0.3) 0%, rgba(233, 30, 99, 0.2) 100%)",
              boxShadow: "0 8px 40px rgba(156, 39, 176, 0.3)",
            }}
          >
            <Video className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-display text-3xl text-white mb-2">
            {t("title")}
          </h1>
          <p className="text-white/50">{t("subtitle")}</p>
        </div>
      </div>

      {/* Preferences */}
      <div ref={contentRef} className="flex-1 px-4 pt-6 space-y-8">
        {/* Smoking Status */}
        <div className="opacity-0">
          <PreferenceSection title={t("preferences.smoking")}>
            <PreferenceOption
              icon={Cigarette}
              label={t("preferences.smokingNow")}
              selected={smokingStatus === "smoking"}
              onClick={() => setSmokingStatus("smoking")}
              color="#4ade80"
            />
            <PreferenceOption
              icon={Coffee}
              label={t("preferences.notNow")}
              selected={smokingStatus === "not_now"}
              onClick={() => setSmokingStatus("not_now")}
              color="#fbbf24"
            />
            <PreferenceOption
              icon={Sparkles}
              label={t("preferences.any")}
              selected={smokingStatus === "any"}
              onClick={() => setSmokingStatus("any")}
              color="#c084fc"
            />
          </PreferenceSection>
        </div>

        {/* Looking For */}
        <div className="opacity-0">
          <PreferenceSection title={t("preferences.lookingFor")}>
            <PreferenceOption
              icon={Users}
              label={t("preferences.anyone")}
              selected={lookingFor === "anyone"}
              onClick={() => setLookingFor("anyone")}
              color="#c084fc"
            />
            <PreferenceOption
              icon={Users}
              label={t("preferences.sameGender")}
              selected={lookingFor === "same_gender"}
              onClick={() => setLookingFor("same_gender")}
              color="#60a5fa"
            />
            <PreferenceOption
              icon={Users}
              label={t("preferences.differentGender")}
              selected={lookingFor === "different_gender"}
              onClick={() => setLookingFor("different_gender")}
              color="#f472b6"
            />
          </PreferenceSection>
        </div>

        {/* Vibe Style */}
        <div className="opacity-0">
          <PreferenceSection title={t("preferences.vibeStyle")}>
            <PreferenceOption
              icon={Coffee}
              label={t("preferences.chill")}
              selected={vibeStyle === "chill"}
              onClick={() => setVibeStyle("chill")}
              color="#4ade80"
            />
            <PreferenceOption
              icon={MessageCircle}
              label={t("preferences.chatty")}
              selected={vibeStyle === "chatty"}
              onClick={() => setVibeStyle("chatty")}
              color="#60a5fa"
            />
            <PreferenceOption
              icon={PartyPopper}
              label={t("preferences.party")}
              selected={vibeStyle === "party"}
              onClick={() => setVibeStyle("party")}
              color="#f472b6"
            />
          </PreferenceSection>
        </div>
      </div>

      {/* Start Button - Fixed at Bottom */}
      <div className="px-4 pt-6 pb-2">
        <button
          ref={buttonRef}
          onClick={handleStartVibing}
          className="w-full py-5 rounded-2xl font-display text-xl text-white font-medium flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #9c27b0 0%, #e91e63 50%, #9c27b0 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          <Zap className="w-6 h-6" />
          {t("startMatching")}
        </button>
      </div>

      {/* Online Count */}
      <div className="text-center pb-4">
        <span className="text-white/30 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
          847 {t("preferences.any").toLowerCase()} vibing now
        </span>
      </div>
    </div>
  );
}
