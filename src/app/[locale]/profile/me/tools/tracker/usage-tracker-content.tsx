"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Flame,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Leaf,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";

// Types
interface UsageEntry {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number; // grams
  method: "smoke" | "vape" | "edible" | "dab";
  strain?: string;
  notes?: string;
}

// Mock usage data for the current month
const mockUsageData: UsageEntry[] = [
  { id: "1", date: "2024-01-02", amount: 0.5, method: "smoke", strain: "Blue Dream" },
  { id: "2", date: "2024-01-05", amount: 0.3, method: "vape" },
  { id: "3", date: "2024-01-06", amount: 0.5, method: "smoke", strain: "Wedding Cake" },
  { id: "4", date: "2024-01-08", amount: 10, method: "edible" }, // mg for edibles
  { id: "5", date: "2024-01-10", amount: 0.4, method: "smoke" },
  { id: "6", date: "2024-01-12", amount: 0.5, method: "smoke", strain: "OG Kush" },
  { id: "7", date: "2024-01-14", amount: 0.3, method: "vape" },
  { id: "8", date: "2024-01-15", amount: 0.5, method: "smoke" },
];

// Method config
const methodConfig = {
  smoke: { label: "Smoke", color: "#fb923c", icon: "🔥" },
  vape: { label: "Vape", color: "#60a5fa", icon: "💨" },
  edible: { label: "Edible", color: "#4ade80", icon: "🍪" },
  dab: { label: "Dab", color: "#c084fc", icon: "💎" },
};

// Calendar day component
function CalendarDay({
  day,
  isCurrentMonth,
  isToday,
  usageLevel,
  onClick,
}: {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  usageLevel: 0 | 1 | 2 | 3; // 0=none, 1=light, 2=medium, 3=heavy
  onClick: () => void;
}) {
  const bgColors = [
    "transparent",
    "rgba(74, 222, 128, 0.2)",
    "rgba(74, 222, 128, 0.4)",
    "rgba(74, 222, 128, 0.7)",
  ];

  return (
    <button
      onClick={onClick}
      className="aspect-square rounded-lg flex items-center justify-center text-sm transition-all"
      style={{
        background: bgColors[usageLevel],
        color: isCurrentMonth
          ? usageLevel > 0
            ? "white"
            : "rgba(255, 255, 255, 0.7)"
          : "rgba(255, 255, 255, 0.2)",
        border: isToday ? "2px solid #4ade80" : "none",
      }}
    >
      {day}
    </button>
  );
}

// Stats card
function StatCard({
  label,
  value,
  unit,
  trend,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  unit: string;
  trend?: "up" | "down" | "same";
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}) {
  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-red-400" />
            ) : trend === "down" ? (
              <TrendingDown className="w-4 h-4 text-green-400" />
            ) : null}
          </div>
        )}
      </div>
      <div className="font-display text-2xl text-white">
        {value}
        <span className="text-sm text-white/50 ml-1">{unit}</span>
      </div>
      <div className="text-white/40 text-sm">{label}</div>
    </div>
  );
}

// Log entry modal (simplified)
function LogEntryForm({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (entry: Omit<UsageEntry, "id">) => void;
}) {
  const [method, setMethod] = useState<UsageEntry["method"]>("smoke");
  const [amount, setAmount] = useState("");
  const [strain, setStrain] = useState("");

  const handleSave = () => {
    if (!amount) return;
    onSave({
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      method,
      strain: strain || undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="w-full max-w-md p-6 rounded-t-3xl"
        style={{ background: "rgb(20, 20, 20)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-white">Log Session</h2>
          <button onClick={onClose} className="text-white/40">
            Cancel
          </button>
        </div>

        {/* Method selector */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">Method</label>
          <div className="flex gap-2">
            {(Object.keys(methodConfig) as Array<keyof typeof methodConfig>).map(
              (m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className="flex-1 py-3 rounded-xl text-center transition-all"
                  style={{
                    background:
                      method === m
                        ? `${methodConfig[m].color}20`
                        : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${method === m ? methodConfig[m].color : "rgba(255, 255, 255, 0.1)"}`,
                    color: method === m ? methodConfig[m].color : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <span className="text-lg">{methodConfig[m].icon}</span>
                  <div className="text-sm mt-1">{methodConfig[m].label}</div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <label className="text-white/50 text-sm mb-2 block">
            Amount ({method === "edible" ? "mg" : "g"})
          </label>
          <input
            type="number"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={method === "edible" ? "10" : "0.5"}
            className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Strain input */}
        <div className="mb-6">
          <label className="text-white/50 text-sm mb-2 block">
            Strain (optional)
          </label>
          <input
            type="text"
            value={strain}
            onChange={(e) => setStrain(e.target.value)}
            placeholder="e.g., Blue Dream"
            className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!amount}
          className="w-full py-4 rounded-2xl font-display font-medium transition-all disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
          }}
        >
          Log Session
        </button>
      </div>
    </div>
  );
}

export function UsageTrackerContent() {
  const t = useTranslations("tools.tracker");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<UsageEntry[]>(mockUsageData);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showLogForm, setShowLogForm] = useState(false);

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

  // Calendar helpers
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const today = new Date();

  // Get usage for a specific date
  const getUsageForDate = (day: number): 0 | 1 | 2 | 3 => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEntries = entries.filter((e) => e.date === dateStr);
    const totalAmount = dayEntries.reduce((sum, e) => sum + e.amount, 0);
    if (totalAmount === 0) return 0;
    if (totalAmount < 0.3) return 1;
    if (totalAmount < 0.7) return 2;
    return 3;
  };

  // Calculate stats
  const thisMonthEntries = entries.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getMonth() === currentMonth.getMonth() &&
      d.getFullYear() === currentMonth.getFullYear()
    );
  });

  const totalGrams = thisMonthEntries
    .filter((e) => e.method !== "edible")
    .reduce((sum, e) => sum + e.amount, 0);

  const sessionsCount = thisMonthEntries.length;
  const avgPerSession = sessionsCount > 0 ? totalGrams / sessionsCount : 0;

  // Days since last session
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const lastSession = sortedEntries[0];
  const daysSinceLast = lastSession
    ? Math.floor(
        (today.getTime() - new Date(lastSession.date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const handleSaveEntry = (entry: Omit<UsageEntry, "id">) => {
    const newEntry: UsageEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

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
            <BarChart3 className="w-5 h-5 text-green-400" />
            Usage Tracker
          </h1>
          <button
            onClick={() => setShowLogForm(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(74, 222, 128, 0.2)" }}
          >
            <Plus className="w-5 h-5 text-green-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 opacity-0">
          <StatCard
            label="This Month"
            value={totalGrams.toFixed(1)}
            unit="g"
            trend="same"
            icon={Leaf}
            color="#4ade80"
          />
          <StatCard
            label="Sessions"
            value={sessionsCount}
            unit=""
            icon={Flame}
            color="#fb923c"
          />
          <StatCard
            label="Avg / Session"
            value={avgPerSession.toFixed(2)}
            unit="g"
            icon={BarChart3}
            color="#60a5fa"
          />
          <StatCard
            label="T-Break"
            value={daysSinceLast}
            unit="days"
            icon={Calendar}
            color="#c084fc"
          />
        </div>

        {/* Calendar */}
        <div
          className="p-4 rounded-2xl opacity-0"
          style={{ background: "rgba(255, 255, 255, 0.05)" }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5 text-white/60" />
            </button>
            <span className="font-display text-white">{monthName}</span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
            >
              <ChevronRight className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div
                key={i}
                className="text-center text-white/30 text-sm py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === today.getDate() &&
                currentMonth.getMonth() === today.getMonth() &&
                currentMonth.getFullYear() === today.getFullYear();
              return (
                <CalendarDay
                  key={day}
                  day={day}
                  isCurrentMonth={true}
                  isToday={isToday}
                  usageLevel={getUsageForDate(day)}
                  onClick={() => {}}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              />
              <span className="text-white/40 text-xs">None</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ background: "rgba(74, 222, 128, 0.2)" }}
              />
              <span className="text-white/40 text-xs">Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ background: "rgba(74, 222, 128, 0.4)" }}
              />
              <span className="text-white/40 text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ background: "rgba(74, 222, 128, 0.7)" }}
              />
              <span className="text-white/40 text-xs">Heavy</span>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="opacity-0">
          <h3 className="font-display text-white mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {sortedEntries.slice(0, 5).map((entry) => {
              const config = methodConfig[entry.method];
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                >
                  <span className="text-xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="text-white text-sm">
                      {entry.strain || config.label}
                    </div>
                    <div className="text-white/40 text-xs">{entry.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">
                      {entry.amount}
                      {entry.method === "edible" ? "mg" : "g"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Log Form Modal */}
      {showLogForm && (
        <LogEntryForm
          onClose={() => setShowLogForm(false)}
          onSave={handleSaveEntry}
        />
      )}
    </div>
  );
}
