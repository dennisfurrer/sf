"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  BadgeCheck,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  UserMinus,
  Flag,
  Ban,
  Video,
  Leaf,
  Calendar,
  Users,
  Heart,
  Flame,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";
import { mockProfiles } from "~/lib/mock-data";

// Types
interface FriendStats {
  vibesTogether: number;
  seshesJoined: number;
  mutualFriends: number;
  friendsSince: string;
  origin: "vibe_mutual" | "sesh_met" | "matched" | "added";
}

// Get friend data by ID
function getFriendById(id: string) {
  const profile = mockProfiles.find((p) => p.id === id) || mockProfiles[0];
  const stats: FriendStats = {
    vibesTogether: Math.floor(Math.random() * 10) + 1,
    seshesJoined: Math.floor(Math.random() * 5),
    mutualFriends: Math.floor(Math.random() * 8) + 1,
    friendsSince: "Dec 15, 2025",
    origin: (["vibe_mutual", "sesh_met", "matched", "added"] as const)[
      parseInt(id) % 4
    ],
  };
  return { profile, stats };
}

// Origin labels
const originLabels = {
  vibe_mutual: "Mutual Vibe",
  sesh_met: "Met at a Sesh",
  matched: "Matched Together",
  added: "Added Directly",
};

// Stat Card
function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="flex-1 p-4 rounded-2xl text-center"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
        style={{ background: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="font-display text-xl text-white">{value}</div>
      <div className="text-white/40 text-xs">{label}</div>
    </div>
  );
}

export function FriendProfileContent({ friendId }: { friendId: string }) {
  const t = useTranslations("profile");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const { profile, stats } = getFriendById(friendId);

  // Entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(80, { start: 100 }),
        duration: 500,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const handleMessage = () => {
    router.push(`/chat/${friendId}`);
  };

  const handleStartVibe = () => {
    router.push("/vibe");
  };

  const handleRemoveFriend = () => {
    setShowOptions(false);
    // In real app, would show confirmation and remove
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
          <h1 className="font-display text-lg text-white">Friend</h1>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <MoreHorizontal className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      {/* Options Menu */}
      {showOptions && (
        <div
          className="absolute top-20 right-4 z-50 py-2 rounded-xl overflow-hidden"
          style={{ background: "rgb(30, 30, 30)" }}
        >
          <button
            onClick={handleRemoveFriend}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 text-left"
          >
            <UserMinus className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Remove Friend</span>
          </button>
          <button
            onClick={() => setShowOptions(false)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 text-left"
          >
            <Flag className="w-5 h-5 text-white/50" />
            <span className="text-white/70">Report</span>
          </button>
          <button
            onClick={() => setShowOptions(false)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 text-left"
          >
            <Ban className="w-5 h-5 text-white/50" />
            <span className="text-white/70">Block</span>
          </button>
        </div>
      )}

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* Profile Header */}
        <div className="text-center opacity-0">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-green-400/30 mx-auto">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
            <span
              className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-3 animate-pulse"
              style={{ backgroundColor: "#22c55e", borderColor: "var(--color-black)" }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="font-display text-2xl text-white">{profile.name}</h2>
            {profile.verified && (
              <BadgeCheck className="w-6 h-6" style={{ color: "#D4AF37" }} />
            )}
          </div>
          <div className="flex items-center justify-center gap-1 text-white/50 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
          <p className="text-white/40 text-sm max-w-xs mx-auto">
            {profile.warStories?.[0]?.answer || "Cannabis enthusiast"}
          </p>
        </div>

        {/* Friendship Info */}
        <div
          className="p-4 rounded-2xl opacity-0"
          style={{ background: "rgba(74, 222, 128, 0.1)", border: "1px solid rgba(74, 222, 128, 0.2)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(74, 222, 128, 0.2)" }}
            >
              <Heart className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-white font-medium">Friends since {stats.friendsSince}</div>
              <div className="text-green-400/70 text-sm">{originLabels[stats.origin]}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 opacity-0">
          <StatCard
            icon={Video}
            value={stats.vibesTogether}
            label="Vibes Together"
            color="#c084fc"
          />
          <StatCard
            icon={Leaf}
            value={stats.seshesJoined}
            label="Seshes Joined"
            color="#4ade80"
          />
          <StatCard
            icon={Users}
            value={stats.mutualFriends}
            label="Mutual Friends"
            color="#60a5fa"
          />
        </div>

        {/* Interests/Strains */}
        {profile.favoriteStrains && profile.favoriteStrains.length > 0 && (
          <div className="opacity-0">
            <h3 className="font-display text-white mb-3">Favorite Strains</h3>
            <div className="flex flex-wrap gap-2">
              {profile.favoriteStrains.map((strain) => (
                <span
                  key={strain}
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{ background: "rgba(74, 222, 128, 0.15)", color: "#4ade80" }}
                >
                  {strain}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="opacity-0">
            <h3 className="font-display text-white mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{ background: "rgba(255, 255, 255, 0.08)", color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {interest}
                </span>
              ))}
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
        <div className="flex gap-3">
          <button
            onClick={handleMessage}
            className="flex-1 py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
          <button
            onClick={handleStartVibe}
            className="flex-1 py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #c084fc 0%, #9333ea 100%)",
              boxShadow: "0 4px 20px rgba(147, 51, 234, 0.3)",
            }}
          >
            <Video className="w-5 h-5" />
            Start Vibe
          </button>
        </div>
      </div>
    </div>
  );
}
