"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  Settings2,
  Users,
  MapPin,
  Leaf,
  Flame,
  Clock,
  Sparkles,
  RotateCcw,
  Save,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";

// Range Slider Component
function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
  unit = "",
  icon: Icon,
}: {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= localMax) {
      setLocalMin(newMin);
      onChange([newMin, localMax]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= localMin) {
      setLocalMax(newMax);
      onChange([localMin, newMax]);
    }
  };

  const percentage1 = ((localMin - min) / (max - min)) * 100;
  const percentage2 = ((localMax - min) / (max - min)) * 100;

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(74, 222, 128, 0.15)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "#4ade80" }} />
        </div>
        <div className="flex-1">
          <div className="text-white font-medium">{label}</div>
          <div className="text-green-400 text-sm">
            {localMin}
            {unit} - {localMax}
            {unit}
          </div>
        </div>
      </div>

      <div className="relative h-2 bg-white/10 rounded-full">
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${percentage1}%`,
            width: `${percentage2 - percentage1}%`,
            background: "linear-gradient(90deg, #4ade80, #22c55e)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={handleMinChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb indicators */}
        <div
          className="absolute w-4 h-4 rounded-full bg-white shadow-lg -translate-y-1/4"
          style={{ left: `calc(${percentage1}% - 8px)` }}
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-white shadow-lg -translate-y-1/4"
          style={{ left: `calc(${percentage2}% - 8px)` }}
        />
      </div>
    </div>
  );
}

// Toggle Pill Group
function PillGroup({
  label,
  options,
  selected,
  onChange,
  icon: Icon,
  multiSelect = true,
}: {
  label: string;
  options: { value: string; label: string; color?: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  multiSelect?: boolean;
}) {
  const toggleOption = (value: string) => {
    if (multiSelect) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(74, 222, 128, 0.15)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "#4ade80" }} />
        </div>
        <div className="text-white font-medium">{label}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const color = option.color || "#4ade80";
          return (
            <button
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: isSelected ? `${color}20` : "rgba(255, 255, 255, 0.05)",
                color: isSelected ? color : "rgba(255, 255, 255, 0.5)",
                border: `1px solid ${isSelected ? color : "rgba(255, 255, 255, 0.1)"}`,
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Toggle Switch
function ToggleSwitch({
  label,
  description,
  enabled,
  onChange,
  icon: Icon,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div
      className="p-4 rounded-2xl flex items-center gap-4"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(74, 222, 128, 0.15)" }}
      >
        <Icon className="w-5 h-5" style={{ color: "#4ade80" }} />
      </div>
      <div className="flex-1">
        <div className="text-white font-medium">{label}</div>
        <div className="text-white/40 text-sm">{description}</div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className="w-12 h-7 rounded-full p-1 transition-all"
        style={{
          background: enabled
            ? "linear-gradient(90deg, #4ade80, #22c55e)"
            : "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          className="w-5 h-5 rounded-full bg-white shadow-md transition-transform"
          style={{
            transform: enabled ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </button>
    </div>
  );
}

export function MatchSettingsContent() {
  const t = useTranslations("profile");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // Settings state
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 40]);
  const [distance, setDistance] = useState<[number, number]>([0, 25]);
  const [strainTypes, setStrainTypes] = useState<string[]>(["sativa", "hybrid", "indica"]);
  const [methods, setMethods] = useState<string[]>(["joints", "vapes", "bongs"]);
  const [frequency, setFrequency] = useState<string[]>(["daily", "weekly"]);
  const [tolerance, setTolerance] = useState<string[]>(["moderate", "veteran"]);
  const [showOnline, setShowOnline] = useState(true);
  const [showVerified, setShowVerified] = useState(false);

  // Entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(50, { start: 100 }),
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const handleReset = () => {
    setAgeRange([21, 40]);
    setDistance([0, 25]);
    setStrainTypes(["sativa", "hybrid", "indica"]);
    setMethods(["joints", "vapes", "bongs"]);
    setFrequency(["daily", "weekly"]);
    setTolerance(["moderate", "veteran"]);
    setShowOnline(true);
    setShowVerified(false);
  };

  const handleSave = () => {
    // In a real app, would save to backend
    router.back();
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <h1 className="font-display text-lg text-white flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-green-400" />
            Match Settings
          </h1>
          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {/* Age Range */}
        <div className="opacity-0">
          <RangeSlider
            label="Age Range"
            min={18}
            max={65}
            value={ageRange}
            onChange={setAgeRange}
            icon={Users}
          />
        </div>

        {/* Distance */}
        <div className="opacity-0">
          <RangeSlider
            label="Distance"
            min={0}
            max={100}
            value={distance}
            onChange={setDistance}
            unit=" mi"
            icon={MapPin}
          />
        </div>

        {/* Strain Types */}
        <div className="opacity-0">
          <PillGroup
            label="Strain Preferences"
            options={[
              { value: "sativa", label: "Sativa", color: "#4ade80" },
              { value: "indica", label: "Indica", color: "#c084fc" },
              { value: "hybrid", label: "Hybrid", color: "#facc15" },
              { value: "edibles", label: "Edibles", color: "#fb923c" },
            ]}
            selected={strainTypes}
            onChange={setStrainTypes}
            icon={Leaf}
          />
        </div>

        {/* Consumption Methods */}
        <div className="opacity-0">
          <PillGroup
            label="Consumption Methods"
            options={[
              { value: "joints", label: "Joints" },
              { value: "blunts", label: "Blunts" },
              { value: "bongs", label: "Bongs" },
              { value: "vapes", label: "Vapes" },
              { value: "edibles", label: "Edibles" },
              { value: "dabs", label: "Dabs" },
            ]}
            selected={methods}
            onChange={setMethods}
            icon={Flame}
          />
        </div>

        {/* Frequency */}
        <div className="opacity-0">
          <PillGroup
            label="Smoking Frequency"
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "social", label: "Social" },
              { value: "special", label: "Special Occasions" },
            ]}
            selected={frequency}
            onChange={setFrequency}
            icon={Clock}
          />
        </div>

        {/* Tolerance */}
        <div className="opacity-0">
          <PillGroup
            label="Tolerance Level"
            options={[
              { value: "lightweight", label: "Lightweight" },
              { value: "moderate", label: "Moderate" },
              { value: "veteran", label: "Veteran" },
              { value: "ironLungs", label: "Iron Lungs" },
            ]}
            selected={tolerance}
            onChange={setTolerance}
            icon={Sparkles}
          />
        </div>

        {/* Toggles */}
        <div className="opacity-0">
          <ToggleSwitch
            label="Show Online Only"
            description="Only show people who are currently online"
            enabled={showOnline}
            onChange={setShowOnline}
            icon={Users}
          />
        </div>

        <div className="opacity-0">
          <ToggleSwitch
            label="Verified Only"
            description="Only show verified profiles"
            enabled={showVerified}
            onChange={setShowVerified}
            icon={Sparkles}
          />
        </div>
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
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
          }}
        >
          <Save className="w-5 h-5" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
