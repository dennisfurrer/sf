"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  Plus,
  Star,
  Leaf,
  Search,
  BookOpen,
  Heart,
  Sparkles,
  Moon,
  Sun,
  Zap,
  X,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";

// Types
type StrainType = "sativa" | "indica" | "hybrid";

interface StrainEntry {
  id: string;
  name: string;
  type: StrainType;
  rating: number; // 1-5
  effects: string[];
  notes: string;
  dateTried: string;
  favorite: boolean;
  thc?: number;
  photo?: string;
}

// Mock data
const mockStrains: StrainEntry[] = [
  {
    id: "1",
    name: "Blue Dream",
    type: "hybrid",
    rating: 5,
    effects: ["Relaxed", "Happy", "Creative"],
    notes: "Perfect daytime strain. Great for creativity and staying productive.",
    dateTried: "2024-01-15",
    favorite: true,
    thc: 21,
  },
  {
    id: "2",
    name: "Wedding Cake",
    type: "indica",
    rating: 4,
    effects: ["Relaxed", "Euphoric", "Hungry"],
    notes: "Strong body high. Great for evening use.",
    dateTried: "2024-01-12",
    favorite: false,
    thc: 25,
  },
  {
    id: "3",
    name: "Sour Diesel",
    type: "sativa",
    rating: 4,
    effects: ["Energetic", "Happy", "Focused"],
    notes: "Classic energizing strain. Good for morning sessions.",
    dateTried: "2024-01-08",
    favorite: true,
    thc: 19,
  },
  {
    id: "4",
    name: "OG Kush",
    type: "hybrid",
    rating: 5,
    effects: ["Relaxed", "Happy", "Sleepy"],
    notes: "All-time favorite. Perfect for unwinding after a long day.",
    dateTried: "2024-01-05",
    favorite: true,
    thc: 23,
  },
  {
    id: "5",
    name: "Northern Lights",
    type: "indica",
    rating: 3,
    effects: ["Sleepy", "Relaxed", "Happy"],
    notes: "Very heavy indica. Good for sleep but too strong for casual use.",
    dateTried: "2024-01-02",
    favorite: false,
    thc: 18,
  },
];

// Available effects for tagging
const availableEffects = [
  "Relaxed",
  "Happy",
  "Euphoric",
  "Creative",
  "Energetic",
  "Focused",
  "Hungry",
  "Sleepy",
  "Giggly",
  "Talkative",
  "Uplifted",
];

// Strain type config
const strainTypeConfig = {
  sativa: { label: "Sativa", color: "#4ade80", icon: Sun },
  indica: { label: "Indica", color: "#c084fc", icon: Moon },
  hybrid: { label: "Hybrid", color: "#facc15", icon: Zap },
};

// Star rating component
function StarRating({
  rating,
  onChange,
  readonly = false,
}: {
  rating: number;
  onChange?: (r: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          disabled={readonly}
          className="transition-transform active:scale-90"
        >
          <Star
            className="w-5 h-5"
            style={{
              fill: star <= rating ? "#facc15" : "transparent",
              color: star <= rating ? "#facc15" : "rgba(255, 255, 255, 0.2)",
            }}
          />
        </button>
      ))}
    </div>
  );
}

// Strain card component
function StrainCard({
  strain,
  onToggleFavorite,
}: {
  strain: StrainEntry;
  onToggleFavorite: (id: string) => void;
}) {
  const config = strainTypeConfig[strain.type];
  const TypeIcon = config.icon;

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${config.color}20` }}
          >
            <Leaf className="w-6 h-6" style={{ color: config.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-white">{strain.name}</h3>
              {strain.favorite && (
                <Heart
                  className="w-4 h-4"
                  style={{ fill: "#ef4444", color: "#ef4444" }}
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <TypeIcon className="w-3.5 h-3.5" style={{ color: config.color }} />
              <span className="text-sm" style={{ color: config.color }}>
                {config.label}
              </span>
              {strain.thc && (
                <span className="text-white/40 text-sm">• {strain.thc}% THC</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(strain.id)}
          className="p-2 rounded-lg transition-all hover:bg-white/5"
        >
          <Heart
            className="w-5 h-5"
            style={{
              fill: strain.favorite ? "#ef4444" : "transparent",
              color: strain.favorite ? "#ef4444" : "rgba(255, 255, 255, 0.3)",
            }}
          />
        </button>
      </div>

      <StarRating rating={strain.rating} readonly />

      <div className="flex flex-wrap gap-1.5 mt-3">
        {strain.effects.map((effect) => (
          <span
            key={effect}
            className="px-2 py-1 rounded-full text-xs"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {effect}
          </span>
        ))}
      </div>

      {strain.notes && (
        <p className="text-white/40 text-sm mt-3 line-clamp-2">{strain.notes}</p>
      )}

      <div className="text-white/20 text-xs mt-3">{strain.dateTried}</div>
    </div>
  );
}

// Add strain form
function AddStrainForm({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (strain: Omit<StrainEntry, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<StrainType>("hybrid");
  const [rating, setRating] = useState(3);
  const [effects, setEffects] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [thc, setThc] = useState("");

  const toggleEffect = (effect: string) => {
    setEffects((prev) =>
      prev.includes(effect) ? prev.filter((e) => e !== effect) : [...prev, effect]
    );
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      type,
      rating,
      effects,
      notes,
      dateTried: new Date().toISOString().split("T")[0],
      favorite: false,
      thc: thc ? parseInt(thc) : undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="w-full max-w-md max-h-[85vh] overflow-y-auto p-6 rounded-t-3xl"
        style={{ background: "rgb(20, 20, 20)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-white">Add Strain</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">Strain Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Blue Dream"
            className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">Type</label>
          <div className="flex gap-2">
            {(Object.keys(strainTypeConfig) as StrainType[]).map((t) => {
              const config = strainTypeConfig[t];
              const TypeIcon = config.icon;
              const isSelected = type === t;
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: isSelected ? `${config.color}20` : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${isSelected ? config.color : "rgba(255, 255, 255, 0.1)"}`,
                    color: isSelected ? config.color : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <TypeIcon className="w-4 h-4" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* THC */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">THC % (optional)</label>
          <input
            type="number"
            value={thc}
            onChange={(e) => setThc(e.target.value)}
            placeholder="e.g., 21"
            className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">Rating</label>
          <StarRating rating={rating} onChange={setRating} />
        </div>

        {/* Effects */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">Effects</label>
          <div className="flex flex-wrap gap-2">
            {availableEffects.map((effect) => {
              const isSelected = effects.includes(effect);
              return (
                <button
                  key={effect}
                  onClick={() => toggleEffect(effect)}
                  className="px-3 py-1.5 rounded-full text-sm transition-all"
                  style={{
                    background: isSelected
                      ? "rgba(74, 222, 128, 0.2)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${isSelected ? "#4ade80" : "rgba(255, 255, 255, 0.1)"}`,
                    color: isSelected ? "#4ade80" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {effect}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="text-white/50 text-sm mb-2 block">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did it make you feel?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-4 rounded-2xl font-display font-medium transition-all disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
          }}
        >
          Add to Journal
        </button>
      </div>
    </div>
  );
}

export function StrainJournalContent() {
  const t = useTranslations("tools.journal");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [strains, setStrains] = useState<StrainEntry[]>(mockStrains);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<StrainType | "all" | "favorites">("all");
  const [showAddForm, setShowAddForm] = useState(false);

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

  // Filter strains
  const filteredStrains = strains.filter((strain) => {
    const matchesSearch = strain.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" ||
      filterType === "favorites"
        ? filterType === "favorites"
          ? strain.favorite
          : true
        : strain.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleToggleFavorite = (id: string) => {
    setStrains((prev) =>
      prev.map((strain) =>
        strain.id === id ? { ...strain, favorite: !strain.favorite } : strain
      )
    );
  };

  const handleAddStrain = (newStrain: Omit<StrainEntry, "id">) => {
    const strain: StrainEntry = {
      ...newStrain,
      id: Date.now().toString(),
    };
    setStrains((prev) => [strain, ...prev]);
  };

  // Stats
  const totalStrains = strains.length;
  const favoriteCount = strains.filter((s) => s.favorite).length;
  const avgRating = strains.length
    ? (strains.reduce((sum, s) => sum + s.rating, 0) / strains.length).toFixed(1)
    : "0";

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
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <h1 className="font-display text-lg text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Strain Journal
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(74, 222, 128, 0.2)" }}
          >
            <Plus className="w-5 h-5 text-green-400" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search strains..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {["all", "favorites", "sativa", "indica", "hybrid"].map((f) => {
            const isActive = filterType === f;
            const config =
              f === "all" || f === "favorites"
                ? null
                : strainTypeConfig[f as StrainType];
            return (
              <button
                key={f}
                onClick={() => setFilterType(f as typeof filterType)}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: isActive
                    ? config?.color
                      ? `${config.color}20`
                      : "rgba(74, 222, 128, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                  color: isActive
                    ? config?.color || "#4ade80"
                    : "rgba(255, 255, 255, 0.5)",
                  border: `1px solid ${isActive ? (config?.color || "#4ade80") : "rgba(255, 255, 255, 0.1)"}`,
                }}
              >
                {f === "all"
                  ? "All"
                  : f === "favorites"
                    ? `Favorites (${favoriteCount})`
                    : config?.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {/* Stats Row */}
        <div className="flex gap-3 opacity-0">
          <div
            className="flex-1 p-4 rounded-2xl text-center"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <div className="font-display text-2xl text-white">{totalStrains}</div>
            <div className="text-white/40 text-sm">Strains</div>
          </div>
          <div
            className="flex-1 p-4 rounded-2xl text-center"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <div className="font-display text-2xl text-white flex items-center justify-center gap-1">
              {avgRating}
              <Star
                className="w-5 h-5"
                style={{ fill: "#facc15", color: "#facc15" }}
              />
            </div>
            <div className="text-white/40 text-sm">Avg Rating</div>
          </div>
          <div
            className="flex-1 p-4 rounded-2xl text-center"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <div className="font-display text-2xl text-white flex items-center justify-center gap-1">
              {favoriteCount}
              <Heart
                className="w-5 h-5"
                style={{ fill: "#ef4444", color: "#ef4444" }}
              />
            </div>
            <div className="text-white/40 text-sm">Favorites</div>
          </div>
        </div>

        {/* Strain Cards */}
        {filteredStrains.map((strain) => (
          <div key={strain.id} className="opacity-0">
            <StrainCard strain={strain} onToggleFavorite={handleToggleFavorite} />
          </div>
        ))}

        {/* Empty State */}
        {filteredStrains.length === 0 && (
          <div className="text-center py-12 opacity-0">
            <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/60 font-medium mb-2">No strains found</h3>
            <p className="text-white/40 text-sm">
              {searchQuery
                ? "Try a different search"
                : "Add your first strain to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <AddStrainForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddStrain}
        />
      )}
    </div>
  );
}
