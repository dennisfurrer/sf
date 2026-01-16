"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  Plus,
  Check,
  Trash2,
  ShoppingCart,
  Leaf,
  Cookie,
  Package,
  Sparkles,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";

// Types
interface ShoppingItem {
  id: string;
  name: string;
  category: "essentials" | "herb" | "munchies";
  checked: boolean;
}

// Mock data
const initialItems: ShoppingItem[] = [
  { id: "1", name: "Rolling papers", category: "essentials", checked: false },
  { id: "2", name: "Lighter", category: "essentials", checked: true },
  { id: "3", name: "Grinder", category: "essentials", checked: false },
  { id: "4", name: "Blue Dream (3.5g)", category: "herb", checked: false },
  { id: "5", name: "Wedding Cake (1g)", category: "herb", checked: false },
  { id: "6", name: "Doritos", category: "munchies", checked: true },
  { id: "7", name: "Gummy bears", category: "munchies", checked: false },
  { id: "8", name: "Ice cream", category: "munchies", checked: false },
];

// Quick add suggestions
const quickAddItems: { name: string; category: ShoppingItem["category"] }[] = [
  { name: "Papers", category: "essentials" },
  { name: "Lighter", category: "essentials" },
  { name: "Filters", category: "essentials" },
  { name: "Eye drops", category: "essentials" },
  { name: "Chips", category: "munchies" },
  { name: "Drinks", category: "munchies" },
];

// Category config
const categoryConfig = {
  essentials: {
    label: "Essentials",
    icon: Package,
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.15)",
  },
  herb: {
    label: "Herb",
    icon: Leaf,
    color: "#4ade80",
    bg: "rgba(74, 222, 128, 0.15)",
  },
  munchies: {
    label: "Munchies",
    icon: Cookie,
    color: "#fb923c",
    bg: "rgba(251, 146, 60, 0.15)",
  },
};

// Checkbox component
function CheckboxItem({
  item,
  onToggle,
  onDelete,
}: {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const config = categoryConfig[item.category];

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-all group"
      style={{ background: "rgba(255, 255, 255, 0.03)" }}
    >
      <button
        onClick={() => onToggle(item.id)}
        className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
        style={{
          background: item.checked ? config.color : "transparent",
          border: `2px solid ${item.checked ? config.color : "rgba(255, 255, 255, 0.2)"}`,
        }}
      >
        {item.checked && <Check className="w-4 h-4 text-white" />}
      </button>
      <span
        className="flex-1 transition-all"
        style={{
          color: item.checked ? "rgba(255, 255, 255, 0.3)" : "white",
          textDecoration: item.checked ? "line-through" : "none",
        }}
      >
        {item.name}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all hover:bg-red-500/20"
      >
        <Trash2 className="w-4 h-4 text-red-400" />
      </button>
    </div>
  );
}

// Category section
function CategorySection({
  category,
  items,
  onToggle,
  onDelete,
}: {
  category: keyof typeof categoryConfig;
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const uncheckedCount = items.filter((i) => !i.checked).length;

  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: config.bg }}
        >
          <Icon className="w-4 h-4" style={{ color: config.color }} />
        </div>
        <span className="font-display font-medium text-white">
          {config.label}
        </span>
        {uncheckedCount > 0 && (
          <span
            className="px-2 py-0.5 rounded-full text-xs"
            style={{ background: config.bg, color: config.color }}
          >
            {uncheckedCount}
          </span>
        )}
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <CheckboxItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export function ShoppingListContent() {
  const t = useTranslations("tools.shopping");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ShoppingItem["category"]>("essentials");
  const [showQuickAdd, setShowQuickAdd] = useState(false);

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

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: selectedCategory,
      checked: false,
    };

    setItems((prev) => [...prev, newItem]);
    setNewItemName("");
  };

  const handleQuickAdd = (name: string, category: ShoppingItem["category"]) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      category,
      checked: false,
    };
    setItems((prev) => [...prev, newItem]);
    setShowQuickAdd(false);
  };

  const handleClearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  // Group items by category
  const essentialsItems = items.filter((i) => i.category === "essentials");
  const herbItems = items.filter((i) => i.category === "herb");
  const munchiesItems = items.filter((i) => i.category === "munchies");

  const completedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;

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
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <h1 className="font-display text-lg text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-400" />
            Shopping List
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                background: "linear-gradient(90deg, #4ade80, #22c55e)",
              }}
            />
          </div>
          <span className="text-white/50 text-sm">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* Add Item Input */}
        <div
          className="p-4 rounded-2xl opacity-0"
          style={{ background: "rgba(255, 255, 255, 0.05)" }}
        >
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
              placeholder="Add an item..."
              className="flex-1 px-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
            <button
              onClick={handleAddItem}
              disabled={!newItemName.trim()}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              }}
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Category selector */}
          <div className="flex gap-2">
            {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map(
              (cat) => {
                const config = categoryConfig[cat];
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3 py-1.5 rounded-lg text-sm transition-all"
                    style={{
                      background: isSelected ? config.bg : "transparent",
                      color: isSelected ? config.color : "rgba(255, 255, 255, 0.4)",
                      border: `1px solid ${isSelected ? config.color : "rgba(255, 255, 255, 0.1)"}`,
                    }}
                  >
                    {config.label}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="w-full p-3 rounded-xl flex items-center justify-center gap-2 transition-all opacity-0"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
          }}
        >
          <Sparkles className="w-4 h-4 text-white/40" />
          <span className="text-white/40 text-sm">Quick Add</span>
        </button>

        {/* Quick Add Pills */}
        {showQuickAdd && (
          <div className="flex flex-wrap gap-2">
            {quickAddItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleQuickAdd(item.name, item.category)}
                className="px-4 py-2 rounded-full text-sm transition-all active:scale-95"
                style={{
                  background: categoryConfig[item.category].bg,
                  color: categoryConfig[item.category].color,
                }}
              >
                + {item.name}
              </button>
            ))}
          </div>
        )}

        {/* Category Sections */}
        <div className="space-y-6 opacity-0">
          <CategorySection
            category="essentials"
            items={essentialsItems}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
          <CategorySection
            category="herb"
            items={herbItems}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
          <CategorySection
            category="munchies"
            items={munchiesItems}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12 opacity-0">
            <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/60 font-medium mb-2">List is empty</h3>
            <p className="text-white/40 text-sm">Add items to get started</p>
          </div>
        )}

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <button
            onClick={handleClearCompleted}
            className="w-full py-3 rounded-xl text-red-400 text-sm transition-all hover:bg-red-500/10 opacity-0"
          >
            Clear {completedCount} completed item{completedCount !== 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
}
