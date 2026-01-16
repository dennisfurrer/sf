"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Settings,
  Edit3,
  BadgeCheck,
  MapPin,
  Globe,
  Sparkles,
  Flame,
  ChevronRight,
  User,
  Activity,
  Users,
  Wrench,
  TrendingUp,
  Heart,
  Video,
  Leaf,
  MessageCircle,
  ShoppingCart,
  Calendar,
  BookOpen,
  Dices,
  Timer,
  UserPlus,
} from "lucide-react";
import anime from "animejs";
import { currentUser, mockProfiles } from "~/lib/mock-data";
import { Link, useRouter, usePathname } from "~/i18n/routing";

type ProfileTab = "profile" | "activity" | "friends" | "tools";

// Mock data for tabs
const MOCK_WEEKLY_STATS = {
  vibesSent: 12,
  sessionsJoined: 3,
  videoMinutes: 47,
  newFriends: 2,
  newMatches: 4,
  badge: { name: "Social Smoker", icon: "🌿" },
  comparedToLastWeek: "+40%",
};

const MOCK_ACTIVITY = [
  { id: "1", type: "match", user: mockProfiles[0], time: "2h ago" },
  { id: "2", type: "vibe", user: mockProfiles[1], time: "4h ago", duration: 12 },
  { id: "3", type: "sesh", title: "Wake and bake at the beach", time: "6h ago", participants: 4 },
  { id: "4", type: "like", user: mockProfiles[2], time: "Yesterday" },
];

const MOCK_FRIENDS = mockProfiles.slice(0, 6).map((p, i) => ({
  ...p,
  isOnline: i < 3,
  friendsSince: "Dec 12, 2025",
  origin: i % 2 === 0 ? "vibe_mutual" : "sesh_met",
}));

// Tab Button Component
function TabButton({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-1 py-3 relative transition-all"
      style={{
        borderBottom: active ? "2px solid var(--color-accent-1)" : "2px solid transparent",
      }}
    >
      <Icon
        className="w-5 h-5 transition-colors"
        style={{ color: active ? "var(--color-accent-1)" : "rgba(255, 255, 255, 0.4)" }}
      />
      <span
        className="text-xs font-medium transition-colors"
        style={{ color: active ? "white" : "rgba(255, 255, 255, 0.5)" }}
      >
        {label}
      </span>
      {badge && badge > 0 && (
        <span
          className="absolute top-1 right-1/4 w-5 h-5 rounded-full text-[10px] flex items-center justify-center"
          style={{ background: "var(--color-accent-1)" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ============ PROFILE TAB COMPONENTS ============

function VibeQuote({ promptKey, answer, index }: { promptKey: string; answer: string; index: number }) {
  const t = useTranslations("warStoryPrompts");
  const isEven = index % 2 === 0;
  const isFirst = index === 0;

  return (
    <div
      className="relative rounded-3xl p-6 overflow-hidden"
      style={{
        background: isEven
          ? "linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 45, 146, 0.08) 100%)"
          : "linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(255, 45, 146, 0.08) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="absolute top-4 right-4 text-6xl font-serif opacity-10" style={{ color: "var(--color-accent-1)" }}>
        "
      </div>
      <p className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: "var(--color-accent-1)" }}>
        <Sparkles className="w-4 h-4" />
        {t(promptKey)}
      </p>
      {isFirst ? (
        <p className="text-white text-3xl font-body font-bold text-center leading-tight tracking-wide">
          {answer}
        </p>
      ) : (
        <p className="text-white text-lg font-display leading-relaxed italic">"{answer}"</p>
      )}
    </div>
  );
}

function StrainChip({ name, index }: { name: string; index: number }) {
  const emojis = ["🌿", "💨", "✨", "🔥", "🍃"];
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(45, 106, 79, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%)",
        border: "1px solid rgba(52, 211, 153, 0.3)",
      }}
    >
      <span className="text-lg">{emojis[index % emojis.length]}</span>
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}

function VibeStat({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center text-center py-1">
      <span className="text-lg mb-0.5">{emoji}</span>
      <span className="text-white font-medium text-xs">{value}</span>
      <span className="text-white/40 text-[10px]">{label}</span>
    </div>
  );
}

function ProfileTabContent() {
  const t = useTranslations("profile");
  const tPrefs = useTranslations("preferences");
  const profile = currentUser;

  return (
    <div className="space-y-6">
      {/* Quick Vibe Check */}
      <section
        className="rounded-2xl p-3"
        style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
      >
        <div className="grid grid-cols-4 gap-2">
          <VibeStat emoji="🍃" label="Vibe" value={tPrefs(`strainTypes.${profile.strainType}`)} />
          <VibeStat emoji="💨" label="Style" value={profile.method[0] || "Joints"} />
          <VibeStat emoji="⚡" label="Level" value={tPrefs(`tolerances.${profile.tolerance}`)} />
          <VibeStat emoji="🌙" label="When" value={tPrefs(`frequencies.${profile.frequency}`)} />
        </div>
      </section>

      {/* War Stories */}
      <section>
        <h2 className="font-display text-lg text-white/80 mb-4">
          My Stories
        </h2>
        <div className="space-y-4">
          {profile.warStories.map((story, i) => (
            <VibeQuote key={i} promptKey={story.promptKey} answer={story.answer} index={i} />
          ))}
        </div>
      </section>

      {/* Favorite Strains */}
      <section>
        <h2 className="font-display text-lg text-white/80 mb-4">
          My Go-To Strains
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile.favoriteStrains.map((strain, i) => (
            <StrainChip key={strain} name={strain} index={i} />
          ))}
        </div>
      </section>

      {/* Interests */}
      <section>
        <h2 className="font-display text-lg text-white/80 mb-4">
          What I'm Into
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============ ACTIVITY TAB ============

function WeeklyStatsCard() {
  const stats = MOCK_WEEKLY_STATS;

  return (
    <div
      className="rounded-3xl p-5"
      style={{
        background: "linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(233, 30, 99, 0.08) 100%)",
        border: "1px solid rgba(156, 39, 176, 0.2)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-400" />
            Your Week in Vibes
          </h3>
          <p className="text-white/40 text-sm">Jan 10 - Jan 16</p>
        </div>
        <span className="text-green-400 text-sm font-medium flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {stats.comparedToLastWeek}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center">
          <div className="text-2xl font-display text-white">{stats.vibesSent}</div>
          <div className="text-white/40 text-xs">Vibes sent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display text-white">{stats.sessionsJoined}</div>
          <div className="text-white/40 text-xs">Seshs join</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display text-white">{stats.videoMinutes}</div>
          <div className="text-white/40 text-xs">min video</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display text-white">{stats.newFriends}</div>
          <div className="text-white/40 text-xs">New frnd</div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
        <span className="text-xl">{stats.badge.icon}</span>
        <span className="text-white text-sm">"{stats.badge.name}" unlocked!</span>
      </div>
    </div>
  );
}

function ActivityCard({ item }: { item: typeof MOCK_ACTIVITY[0] }) {
  const icons = {
    match: Heart,
    vibe: Video,
    sesh: Leaf,
    like: Heart,
  };
  const Icon = icons[item.type as keyof typeof icons] || Heart;

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl"
      style={{ background: "rgba(255, 255, 255, 0.03)" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255, 255, 255, 0.08)" }}
      >
        {item.user ? (
          <Image
            src={item.user.photo}
            alt={item.user.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <Icon className="w-5 h-5 text-pink-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm">
          {item.type === "match" && `Matched with ${item.user?.name}`}
          {item.type === "vibe" && `Vibed with ${item.user?.name} for ${(item as any).duration}min`}
          {item.type === "sesh" && `Joined "${(item as any).title}"`}
          {item.type === "like" && `${item.user?.name} liked you`}
        </p>
        <p className="text-white/40 text-xs">{item.time}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-white/30" />
    </div>
  );
}

function ActivityTabContent() {
  return (
    <div className="space-y-6">
      <WeeklyStatsCard />

      <div>
        <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-3">Today</h3>
        <div className="space-y-2">
          {MOCK_ACTIVITY.slice(0, 2).map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-3">Yesterday</h3>
        <div className="space-y-2">
          {MOCK_ACTIVITY.slice(2).map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ FRIENDS TAB ============

function OnlineFriendsSection() {
  const onlineFriends = MOCK_FRIENDS.filter((f) => f.isOnline);

  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <h3 className="text-white/60 text-sm mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Online Now ({onlineFriends.length})
      </h3>
      <div className="flex gap-4">
        {onlineFriends.map((friend) => (
          <Link
            key={friend.id}
            href={`/profile/${friend.id}`}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-green-400/30">
              <Image src={friend.photo} alt={friend.name} fill className="object-cover" sizes="56px" />
            </div>
            <span className="text-white/60 text-xs">{friend.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FriendCard({ friend }: { friend: typeof MOCK_FRIENDS[0] }) {
  return (
    <Link
      href={`/profile/${friend.id}`}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5"
      style={{ background: "rgba(255, 255, 255, 0.03)" }}
    >
      <div className="relative w-14 h-14 rounded-full overflow-hidden">
        <Image src={friend.photo} alt={friend.name} fill className="object-cover" sizes="56px" />
        {friend.isOnline && (
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2"
            style={{ backgroundColor: "#22c55e", borderColor: "var(--color-black)" }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{friend.name}</span>
          {friend.verified && <BadgeCheck className="w-4 h-4" style={{ color: "#D4AF37" }} />}
        </div>
        <p className="text-white/40 text-xs">
          Friends since {friend.friendsSince} - via {friend.origin === "vibe_mutual" ? "Vibe" : "Sesh"}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-white/30" />
    </Link>
  );
}

function FriendsTabContent() {
  return (
    <div className="space-y-6">
      <OnlineFriendsSection />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider">All Friends</h3>
          <button className="text-sm" style={{ color: "var(--color-accent-1)" }}>
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {MOCK_FRIENDS.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>

      {/* Friend Requests */}
      <div>
        <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-3">
          Friend Requests (2)
        </h3>
        <div
          className="p-4 rounded-2xl flex items-center gap-4"
          style={{ background: "rgba(255, 255, 255, 0.03)" }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={mockProfiles[6]?.photo || ""}
              alt="Request"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm">{mockProfiles[6]?.name || "User"} wants to be friends</p>
            <p className="text-white/40 text-xs">Met via Vibe Check</p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: "var(--color-accent-1)" }}
            >
              Accept
            </button>
            <button className="px-4 py-2 rounded-full text-sm bg-white/10 text-white/60">Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TOOLS TAB ============

function ToolCard({
  icon: Icon,
  title,
  subtitle,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5"
      style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(255, 255, 255, 0.08)" }}
      >
        <Icon className="w-6 h-6 text-white/60" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-white/40 text-sm">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-white/30" />
    </Link>
  );
}

function ToolsTabContent() {
  return (
    <div className="space-y-3">
      <ToolCard
        icon={ShoppingCart}
        title="Shopping List"
        subtitle="5 items - Updated today"
        href="/profile/me/tools/shopping"
      />
      <ToolCard
        icon={Calendar}
        title="Usage Tracker"
        subtitle="Track your sessions"
        href="/profile/me/tools/tracker"
      />
      <ToolCard
        icon={BookOpen}
        title="Strain Journal"
        subtitle="12 strains rated"
        href="/profile/me/tools/journal"
      />
      <ToolCard icon={Dices} title="Spin the Wheel" subtitle="Decide what to smoke" href="#" />
      <ToolCard icon={Timer} title="Session Timer" subtitle="Track active sesh duration" href="#" />
    </div>
  );
}

// ============ MAIN COMPONENT ============

export function MyProfileContent() {
  const t = useTranslations("profile");
  const tSettings = useTranslations("settings");
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const toggleLanguage = () => {
    const newLocale = pathname.startsWith("/de") ? "en" : "de";
    router.replace(pathname, { locale: newLocale });
  };

  const profile = currentUser;

  return (
    <div ref={pageRef} className="opacity-0 pb-24">
      {/* Compact Header */}
      <div className="relative h-[280px]">
        <Image src={profile.photo} alt={profile.name} fill className="object-cover" sizes="100vw" priority />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--color-black) 0%, rgba(5,5,5,0.5) 50%, transparent 100%)" }}
        />

        {/* Action buttons */}
        <div className="absolute top-4 left-4 safe-top">
          <Link
            href="#"
            className="w-10 h-10 rounded-full grid place-items-center backdrop-blur-xl transition-all active:scale-95"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Settings className="w-[18px] h-[18px] text-white/90" />
          </Link>
        </div>
        <div className="absolute top-4 right-4 safe-top">
          <button
            className="w-10 h-10 rounded-full grid place-items-center backdrop-blur-xl transition-all active:scale-95"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Edit3 className="w-[18px] h-[18px] text-white/90" />
          </button>
        </div>

        {/* Profile info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-3xl font-medium text-white">{profile.name}</h1>
            <span className="text-2xl text-white/60 font-light">{profile.age}</span>
            {profile.verified && <BadgeCheck className="w-6 h-6" style={{ color: "#D4AF37" }} />}
          </div>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Online
            </span>
          </div>

          {/* XP Bar */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-white/50 text-xs">Lvl 7</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: "65%" }} />
            </div>
            <span className="text-white/30 text-xs">450 to next</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        className="flex border-b"
        style={{ borderColor: "rgba(255, 255, 255, 0.08)", background: "rgba(10, 10, 10, 0.95)" }}
      >
        <TabButton icon={User} label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
        <TabButton
          icon={Activity}
          label="Activity"
          active={activeTab === "activity"}
          onClick={() => setActiveTab("activity")}
        />
        <TabButton
          icon={Users}
          label="Friends"
          active={activeTab === "friends"}
          onClick={() => setActiveTab("friends")}
          badge={MOCK_FRIENDS.length}
        />
        <TabButton icon={Wrench} label="Tools" active={activeTab === "tools"} onClick={() => setActiveTab("tools")} />
      </div>

      {/* Tab Content */}
      <div
        className="px-4 pt-6 min-h-[50vh]"
        style={{
          background: "linear-gradient(180deg, rgba(15, 15, 15, 1) 0%, var(--color-black) 100%)",
        }}
      >
        {activeTab === "profile" && <ProfileTabContent />}
        {activeTab === "activity" && <ActivityTabContent />}
        {activeTab === "friends" && <FriendsTabContent />}
        {activeTab === "tools" && <ToolsTabContent />}
      </div>
    </div>
  );
}
