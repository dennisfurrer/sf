"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Flag,
  SkipForward,
  Heart,
  UserPlus,
  X,
} from "lucide-react";
import anime from "animejs";
import type { SmokingStatus, GenderPref, VibeStyle } from "~/lib/types";
import { mockProfiles } from "~/lib/mock-data";

type VibeState = "pre-match" | "matching" | "video-call" | "success";

// Mock vibe match data
const MOCK_VIBE_PARTNERS = mockProfiles.slice(0, 5);

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
      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-300"
      style={{
        background: selected ? `${color}20` : "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${selected ? color : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: selected ? `0 4px 20px ${color}30` : "none",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
        style={{
          background: selected ? `${color}30` : "rgba(255, 255, 255, 0.08)",
        }}
      >
        <Icon
          className="w-5 h-5 transition-colors"
          style={{ color: selected ? color : "rgba(255, 255, 255, 0.5)" }}
        />
      </div>
      <span
        className="text-xs font-medium transition-colors"
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
    <div className="space-y-2">
      <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider">
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-2">{children}</div>
    </div>
  );
}

// Pre-Match Screen
function PreMatchScreen({
  onStart,
  smokingStatus,
  setSmokingStatus,
  lookingFor,
  setLookingFor,
  vibeStyle,
  setVibeStyle,
}: {
  onStart: () => void;
  smokingStatus: SmokingStatus;
  setSmokingStatus: (s: SmokingStatus) => void;
  lookingFor: GenderPref;
  setLookingFor: (g: GenderPref) => void;
  vibeStyle: VibeStyle;
  setVibeStyle: (v: VibeStyle) => void;
}) {
  const t = useTranslations("vibe");
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <div className="min-h-screen pb-20 flex flex-col">
      {/* Header Area with Gradient */}
      <div
        className="relative pt-10 pb-4 px-4"
        style={{
          background:
            "linear-gradient(180deg, rgba(156, 39, 176, 0.15) 0%, transparent 100%)",
        }}
      >
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

        <div className="relative flex justify-center mb-3">
          <div
            className="vibe-icon w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(156, 39, 176, 0.3) 0%, rgba(233, 30, 99, 0.2) 100%)",
              boxShadow: "0 8px 40px rgba(156, 39, 176, 0.3)",
            }}
          >
            <Video className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-display text-2xl text-white mb-1">
            {t("title")}
          </h1>
          <p className="text-white/50 text-sm">{t("subtitle")}</p>
        </div>
      </div>

      {/* Preferences */}
      <div ref={contentRef} className="flex-1 px-4 pt-4 space-y-5">
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

      {/* Start Button */}
      <div className="px-4 pt-4 pb-1">
        <button
          ref={buttonRef}
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-display text-lg text-white font-medium flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #9c27b0 0%, #e91e63 50%, #9c27b0 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          <Zap className="w-5 h-5" />
          {t("startMatching")}
        </button>
      </div>

      <div className="text-center pb-2">
        <span className="text-white/30 text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
          847 vibing now
        </span>
      </div>
    </div>
  );
}

// Matching Screen (Loading/Searching)
function MatchingScreen({ onCancel }: { onCancel: () => void }) {
  const t = useTranslations("vibe");
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      anime({
        targets: spinnerRef.current,
        rotate: 360,
        duration: 1500,
        loop: true,
        easing: "linear",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Camera Preview Placeholder */}
      <div
        className="w-64 h-80 rounded-3xl mb-8 flex items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="text-center">
          <Camera className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/40 text-sm">Camera Preview</p>
        </div>
      </div>

      <h2 className="font-display text-2xl text-white mb-4">{t("searching")}</h2>

      {/* Spinner */}
      <div
        ref={spinnerRef}
        className="w-12 h-12 mb-8 rounded-full border-2 border-purple-400/30 border-t-purple-400"
      />

      <button
        onClick={onCancel}
        className="px-8 py-3 rounded-full font-medium transition-all hover:bg-white/10"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

// Video Call Screen
function VideoCallScreen({
  partner,
  onNext,
  onVibe,
  timeRemaining,
  iVibed,
}: {
  partner: typeof mockProfiles[0];
  onNext: () => void;
  onVibe: () => void;
  timeRemaining: number;
  iVibed: boolean;
}) {
  const t = useTranslations("vibe");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (timeRemaining / 120) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Main Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video (Partner) */}
        <div className="absolute inset-0">
          <Image
            src={partner.photo}
            alt={partner.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Local Video (You) - PiP */}
        <div
          className="absolute top-4 left-4 w-28 h-36 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/40" />
          </div>
        </div>

        {/* Partner Info */}
        <div className="absolute bottom-32 left-4 right-4">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl text-white">
              {partner.name}, {partner.age}
            </h3>
            {partner.online && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 flex items-center gap-1">
                <Cigarette className="w-3 h-3" />
                Smoking
              </span>
            )}
          </div>
          <p className="text-white/50 text-sm">{partner.location}</p>
        </div>

        {/* Report Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <Flag className="w-5 h-5 text-white/50" />
        </button>
      </div>

      {/* Timer Bar */}
      <div className="px-4 py-3 bg-black/90">
        <div className="flex items-center justify-between text-sm text-white/50 mb-2">
          <span>{formatTime(120 - timeRemaining)}</span>
          <span>2:00</span>
        </div>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{
              width: `${100 - progress}%`,
              background: "linear-gradient(90deg, #9c27b0, #e91e63)",
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-6 pt-4 bg-black/90 safe-bottom">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Next Button */}
          <button
            onClick={onNext}
            className="flex-1 py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <SkipForward className="w-5 h-5" />
            NEXT
          </button>

          {/* Vibe Button */}
          <button
            onClick={onVibe}
            disabled={iVibed}
            className="flex-1 py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            style={{
              background: iVibed
                ? "rgba(74, 222, 128, 0.3)"
                : "linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)",
              color: "white",
              boxShadow: iVibed ? "none" : "0 4px 20px rgba(233, 30, 99, 0.4)",
            }}
          >
            <Heart className="w-5 h-5" fill={iVibed ? "currentColor" : "none"} />
            {iVibed ? "VIBED!" : "VIBE"}
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.1)",
              color: isMuted ? "#ef4444" : "white",
            }}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsCameraOff(!isCameraOff)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isCameraOff ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.1)",
              color: isCameraOff ? "#ef4444" : "white",
            }}
          >
            {isCameraOff ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
          </button>
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(255, 255, 255, 0.1)", color: "white" }}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Screen (Mutual Vibe)
function SuccessScreen({
  partner,
  onContinueCall,
  onAddFriend,
  onFindNew,
}: {
  partner: typeof mockProfiles[0];
  onContinueCall: () => void;
  onAddFriend: () => void;
  onFindNew: () => void;
}) {
  const t = useTranslations("vibe");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        delay: anime.stagger(100, { start: 300 }),
        duration: 600,
        easing: "easeOutCubic",
      });
    }

    // Celebration particles effect
    anime({
      targets: ".success-heart",
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutElastic(1, 0.5)",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(156, 39, 176, 0.2) 0%, transparent 60%)",
        }}
      />

      <div ref={contentRef} className="relative z-10 text-center">
        {/* Title */}
        <h1 className="font-display text-4xl text-white mb-6 opacity-0">
          {t("mutualVibe")}
        </h1>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-4 mb-6 opacity-0">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-500/50">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
          </div>

          <div className="success-heart">
            <Heart
              className="w-10 h-10 text-pink-500"
              fill="currentColor"
              style={{ filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))" }}
            />
          </div>

          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-500/50">
            <Image
              src={partner.photo}
              alt={partner.name}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>

        <p className="text-white/60 mb-10 opacity-0">{t("youBothVibed")}</p>

        {/* Action Buttons */}
        <div className="space-y-3 w-full max-w-xs opacity-0">
          <button
            onClick={onContinueCall}
            className="w-full py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)",
              boxShadow: "0 4px 20px rgba(233, 30, 99, 0.4)",
            }}
          >
            <Video className="w-5 h-5" />
            Continue Video Call
          </button>

          <button
            onClick={onAddFriend}
            className="w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <UserPlus className="w-5 h-5" />
            {t("addFriend")} & Chat Later
          </button>

          <button
            onClick={onFindNew}
            className="w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <Sparkles className="w-5 h-5" />
            Find New Match
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Vibe Content
export function VibeContent() {
  const [state, setState] = useState<VibeState>("pre-match");
  const [smokingStatus, setSmokingStatus] = useState<SmokingStatus>("any");
  const [lookingFor, setLookingFor] = useState<GenderPref>("anyone");
  const [vibeStyle, setVibeStyle] = useState<VibeStyle>("chill");
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [iVibed, setIVibed] = useState(false);

  const currentPartner = MOCK_VIBE_PARTNERS[partnerIndex % MOCK_VIBE_PARTNERS.length]!;

  // Handle starting the match
  const handleStart = () => {
    setState("matching");
    // Simulate finding a match after 2-4 seconds
    setTimeout(() => {
      setState("video-call");
      setTimeRemaining(120);
      setIVibed(false);
    }, 2000 + Math.random() * 2000);
  };

  // Handle cancel during matching
  const handleCancel = () => {
    setState("pre-match");
  };

  // Handle next (skip to new partner)
  const handleNext = () => {
    setState("matching");
    setPartnerIndex((i) => i + 1);
    setIVibed(false);
    setTimeout(() => {
      setState("video-call");
      setTimeRemaining(120);
    }, 1500);
  };

  // Handle vibe button
  const handleVibe = () => {
    setIVibed(true);
    // Simulate mutual vibe (50% chance for demo)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        setState("success");
      }, 1000);
    }
  };

  // Handle success actions
  const handleContinueCall = () => {
    setState("video-call");
  };

  const handleAddFriend = () => {
    // Would add friend and go to chat
    setState("pre-match");
  };

  const handleFindNew = () => {
    handleNext();
  };

  // Timer countdown during video call
  useEffect(() => {
    if (state !== "video-call") return;

    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          // Time's up - move to next if no mutual vibe
          if (!iVibed) {
            handleNext();
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state, iVibed]);

  switch (state) {
    case "pre-match":
      return (
        <PreMatchScreen
          onStart={handleStart}
          smokingStatus={smokingStatus}
          setSmokingStatus={setSmokingStatus}
          lookingFor={lookingFor}
          setLookingFor={setLookingFor}
          vibeStyle={vibeStyle}
          setVibeStyle={setVibeStyle}
        />
      );
    case "matching":
      return <MatchingScreen onCancel={handleCancel} />;
    case "video-call":
      return (
        <VideoCallScreen
          partner={currentPartner}
          onNext={handleNext}
          onVibe={handleVibe}
          timeRemaining={timeRemaining}
          iVibed={iVibed}
        />
      );
    case "success":
      return (
        <SuccessScreen
          partner={currentPartner}
          onContinueCall={handleContinueCall}
          onAddFriend={handleAddFriend}
          onFindNew={handleFindNew}
        />
      );
  }
}
