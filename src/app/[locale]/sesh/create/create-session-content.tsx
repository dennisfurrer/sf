"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Navigation,
  Video,
  Clock,
  Leaf,
  Users,
  Eye,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";
import type { SessionType, StrainType, SessionVisibility } from "~/lib/types";

// Step indicator
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full transition-all duration-300"
          style={{
            width: i === current ? 24 : 8,
            background:
              i === current
                ? "#4ade80"
                : i < current
                ? "rgba(74, 222, 128, 0.5)"
                : "rgba(255, 255, 255, 0.2)",
          }}
        />
      ))}
    </div>
  );
}

// Option Card Component
function OptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  color = "#4ade80",
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
      style={{
        background: selected ? `${color}15` : "rgba(255, 255, 255, 0.05)",
        border: `2px solid ${selected ? color : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: selected ? `0 4px 20px ${color}20` : "none",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
          style={{
            background: selected ? `${color}25` : "rgba(255, 255, 255, 0.08)",
          }}
        >
          <Icon
            className="w-7 h-7 transition-colors"
            style={{ color: selected ? color : "rgba(255, 255, 255, 0.5)" }}
          />
        </div>
        <div className="flex-1">
          <h3
            className="font-display font-medium transition-colors"
            style={{ color: selected ? "white" : "rgba(255, 255, 255, 0.8)" }}
          >
            {title}
          </h3>
          <p className="text-sm text-white/50">{description}</p>
        </div>
        {selected && (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: color }}
          >
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}

// Strain Type Pill
function StrainPill({
  type,
  label,
  selected,
  onClick,
}: {
  type: StrainType;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const colors: Record<string, string> = {
    sativa: "#4ade80",
    indica: "#c084fc",
    hybrid: "#facc15",
    edibles: "#fb923c",
    any: "rgba(255, 255, 255, 0.6)",
  };

  return (
    <button
      onClick={onClick}
      className="px-5 py-3 rounded-full text-sm font-medium transition-all"
      style={{
        background: selected ? `${colors[type]}20` : "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${selected ? colors[type] : "rgba(255, 255, 255, 0.1)"}`,
        color: selected ? colors[type] : "rgba(255, 255, 255, 0.6)",
      }}
    >
      {label}
    </button>
  );
}

// Number Selector
function NumberSelector({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
        style={{ background: "rgba(255, 255, 255, 0.1)" }}
      >
        <Minus className="w-6 h-6 text-white" />
      </button>
      <div className="text-center">
        <div className="font-display text-5xl text-white">{value}</div>
        <div className="text-white/40 text-sm">
          {value === 1 ? "person" : "people"}
        </div>
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
        style={{ background: "rgba(255, 255, 255, 0.1)" }}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

const TOTAL_STEPS = 6;

export function CreateSessionContent() {
  const t = useTranslations("sesh.create");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [sessionType, setSessionType] = useState<SessionType>("hosting");
  const [timing, setTiming] = useState<"now" | "later">("now");
  const [strainType, setStrainType] = useState<StrainType>("any");
  const [strainName, setStrainName] = useState("");
  const [capacity, setCapacity] = useState(2);
  const [visibility, setVisibility] = useState<SessionVisibility>("public");

  // Animate content on step change
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current,
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 300,
        easing: "easeOutCubic",
      });
    }
  }, [step]);

  const canProceed = () => {
    switch (step) {
      case 0:
        return description.length >= 10;
      case 1:
        return true; // Session type always selected
      case 2:
        return true; // Timing always selected
      case 3:
        return true; // Strain type always selected
      case 4:
        return capacity >= 1;
      case 5:
        return true; // Visibility always selected
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      handleCreate();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      router.push("/sesh");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-4 pb-4 safe-top"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <h1 className="font-display text-lg text-white">{t("title")}</h1>
          <button
            onClick={() => router.push("/sesh")}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>
        <StepIndicator current={step} total={TOTAL_STEPS} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto" ref={contentRef}>
        {/* Step 0: Description */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white mb-2">
              What's the vibe?
            </h2>
            <p className="text-white/50 mb-6">{t("description")}</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Sunset sesh on my rooftop, got good music and snacks. Come through!"
              className="w-full h-40 p-4 rounded-2xl text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-green-400/50"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
            <div className="text-right text-white/30 text-sm">
              {description.length}/200
            </div>
          </div>
        )}

        {/* Step 1: Session Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white mb-2">
              Session Type
            </h2>
            <p className="text-white/50 mb-6">{t("location")}</p>
            <div className="space-y-3">
              <OptionCard
                icon={Home}
                title={t("myPlace")}
                description="Host at your place"
                selected={sessionType === "hosting"}
                onClick={() => setSessionType("hosting")}
              />
              <OptionCard
                icon={Navigation}
                title={t("meetup")}
                description="Meet somewhere outside"
                selected={sessionType === "mobile"}
                onClick={() => setSessionType("mobile")}
              />
              <OptionCard
                icon={Video}
                title={t("virtual")}
                description="Video call session"
                selected={sessionType === "virtual"}
                onClick={() => setSessionType("virtual")}
                color="#c084fc"
              />
            </div>
          </div>
        )}

        {/* Step 2: Timing */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white mb-2">
              {t("when")}
            </h2>
            <div className="space-y-3">
              <OptionCard
                icon={Clock}
                title={t("now")}
                description="Start within 10 minutes"
                selected={timing === "now"}
                onClick={() => setTiming("now")}
              />
              <OptionCard
                icon={Clock}
                title={t("later")}
                description="Pick a specific time"
                selected={timing === "later"}
                onClick={() => setTiming("later")}
              />
            </div>
            {timing === "later" && (
              <div
                className="mt-4 p-4 rounded-2xl"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <p className="text-white/50 text-sm text-center">
                  Date/time picker would go here
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Strain */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white mb-2">
              {t("whatStrain")}
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <StrainPill
                type="sativa"
                label="Sativa"
                selected={strainType === "sativa"}
                onClick={() => setStrainType("sativa")}
              />
              <StrainPill
                type="indica"
                label="Indica"
                selected={strainType === "indica"}
                onClick={() => setStrainType("indica")}
              />
              <StrainPill
                type="hybrid"
                label="Hybrid"
                selected={strainType === "hybrid"}
                onClick={() => setStrainType("hybrid")}
              />
              <StrainPill
                type="edibles"
                label="Edibles"
                selected={strainType === "edibles"}
                onClick={() => setStrainType("edibles")}
              />
              <StrainPill
                type="any"
                label="I'll match whatever"
                selected={strainType === "any"}
                onClick={() => setStrainType("any")}
              />
            </div>
            {strainType !== "any" && (
              <div>
                <label className="text-white/50 text-sm mb-2 block">
                  Specific strain (optional)
                </label>
                <input
                  type="text"
                  value={strainName}
                  onChange={(e) => setStrainName(e.target.value)}
                  placeholder="e.g., Blue Dream, Wedding Cake..."
                  className="w-full p-4 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Capacity */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white mb-2">
              {t("capacity")}
            </h2>
            <p className="text-white/50 mb-8 text-center">
              Looking for {capacity} {capacity === 1 ? "person" : "people"} to
              join
            </p>
            <NumberSelector
              value={capacity}
              min={1}
              max={10}
              onChange={setCapacity}
            />
          </div>
        )}

        {/* Step 5: Visibility */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white mb-2">
              Who can see this?
            </h2>
            <div className="space-y-3">
              <OptionCard
                icon={Eye}
                title="Everyone nearby"
                description="Anyone within range can see and join"
                selected={visibility === "public"}
                onClick={() => setVisibility("public")}
              />
              <OptionCard
                icon={Users}
                title="Friends of friends"
                description="More trusted network"
                selected={visibility === "friends_of_friends"}
                onClick={() => setVisibility("friends_of_friends")}
              />
              <OptionCard
                icon={Users}
                title="Friends only"
                description="Only your friends can see"
                selected={visibility === "friends"}
                onClick={() => setVisibility("friends")}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div
        className="px-4 pb-6 pt-4 safe-bottom"
        style={{
          background:
            "linear-gradient(to top, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.95) 80%, transparent 100%)",
        }}
      >
        <button
          onClick={handleNext}
          disabled={!canProceed() || isCreating}
          className="w-full py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: canProceed()
              ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
              : "rgba(255, 255, 255, 0.1)",
            color: canProceed() ? "white" : "rgba(255, 255, 255, 0.3)",
            boxShadow: canProceed()
              ? "0 4px 20px rgba(34, 197, 94, 0.3)"
              : "none",
          }}
        >
          {isCreating ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : step === TOTAL_STEPS - 1 ? (
            <>
              <Leaf className="w-5 h-5" />
              {t("submit")}
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
