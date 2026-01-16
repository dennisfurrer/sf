"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heart, X, Star, RotateCcw, Zap, MapPin, BadgeCheck, Flame, Leaf, ChevronLeft } from "lucide-react";
import anime from "animejs";
import { mockProfiles, currentUser, type Profile } from "~/lib/mock-data";
import { cn } from "~/lib/utils";
import { Link } from "~/i18n/routing";
import { MatchModal } from "~/components/features/match-modal";

// Swipe Card Component
interface SwipeCardProps {
  profile: Profile;
  stackPosition: number;
  onSwipe?: (direction: "left" | "right" | "up") => void;
  cardRef?: React.RefObject<HTMLDivElement>;
}

function SwipeCard({ profile, stackPosition, onSwipe, cardRef }: SwipeCardProps) {
  const t = useTranslations("swipe");
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = cardRef || internalRef;
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeIndicator, setSwipeIndicator] = useState<"left" | "right" | "up" | null>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (stackPosition !== 0) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0]!.clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0]!.clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !ref.current || stackPosition !== 0) return;

      const clientX = "touches" in e ? e.touches[0]!.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]!.clientY : e.clientY;

      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;
      const rotation = deltaX * 0.1;

      ref.current.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotate(${rotation}deg)`;

      // Update swipe indicator
      if (deltaX > 80) {
        setSwipeIndicator("right");
      } else if (deltaX < -80) {
        setSwipeIndicator("left");
      } else if (deltaY < -80) {
        setSwipeIndicator("up");
      } else {
        setSwipeIndicator(null);
      }
    },
    [isDragging, dragStart, stackPosition, ref]
  );

  const handleDragEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !ref.current || stackPosition !== 0) return;
      setIsDragging(false);

      const clientX = "changedTouches" in e ? e.changedTouches[0]!.clientX : e.clientX;
      const clientY = "changedTouches" in e ? e.changedTouches[0]!.clientY : e.clientY;

      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;

      const threshold = 100;

      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        if (deltaY < -threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
          onSwipe?.("up");
        } else if (deltaX > threshold) {
          onSwipe?.("right");
        } else if (deltaX < -threshold) {
          onSwipe?.("left");
        } else {
          // Reset position
          anime({
            targets: ref.current,
            translateX: 0,
            translateY: 0,
            rotate: 0,
            duration: 300,
            easing: "easeOutCubic",
          });
        }
      } else {
        // Reset position
        anime({
          targets: ref.current,
          translateX: 0,
          translateY: 0,
          rotate: 0,
          duration: 300,
          easing: "easeOutCubic",
        });
      }

      setSwipeIndicator(null);
    },
    [isDragging, dragStart, stackPosition, onSwipe, ref]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Stack styling with enhanced shadows
  const stackStyles: React.CSSProperties = {
    zIndex: 10 - stackPosition,
    transform: `scale(${1 - stackPosition * 0.05}) translateY(${stackPosition * 12}px)`,
    opacity: stackPosition > 2 ? 0 : 1 - stackPosition * 0.2,
    boxShadow: stackPosition === 0
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)"
      : `0 ${15 - stackPosition * 5}px ${30 - stackPosition * 10}px -12px rgba(0, 0, 0, ${0.4 - stackPosition * 0.1})`,
  };

  // Random smoke compatibility for demo
  const compatibility = 65 + Math.floor(profile.id.charCodeAt(0) % 30);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute w-full max-w-[340px] h-[480px] rounded-3xl overflow-hidden",
        stackPosition === 0 && "cursor-grab active:cursor-grabbing"
      )}
      style={stackStyles}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Profile Image */}
      <Image src={profile.photo} alt={profile.name} fill className="object-cover" sizes="340px" priority={stackPosition === 0} />

      {/* Gradient overlay - enhanced */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.1) 60%, transparent 100%)"
        }}
      />

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="flex gap-2">
          {profile.verified && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              style={{ background: "rgba(212, 175, 55, 0.2)", color: "#D4AF37" }}
            >
              <BadgeCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
        {profile.online && (
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Online
          </span>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Smoke Compatibility */}
        <div
          className="mb-4 p-3 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(233, 30, 99, 0.15)", border: "1px solid rgba(233, 30, 99, 0.2)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(233, 30, 99, 0.2)" }}
          >
            <Flame className="w-5 h-5 text-pink-400" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-white/50 mb-1">Smoke Compatibility</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${compatibility}%`,
                    background: "linear-gradient(90deg, #ec4899, #f472b6)"
                  }}
                />
              </div>
              <span className="text-pink-400 text-sm font-medium">{compatibility}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-display text-2xl font-medium text-white">{profile.name}</h3>
          <span className="text-lg text-white/50 font-light">{profile.age}</span>
        </div>

        <div className="flex items-center gap-1.5 text-white/50 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {profile.distance} - {profile.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: index === 0 ? "rgba(233, 30, 99, 0.2)" : "rgba(255, 255, 255, 0.08)",
                color: index === 0 ? "#f472b6" : "rgba(255, 255, 255, 0.7)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Swipe indicators */}
      <div
        className={cn(
          "absolute top-1/2 right-5 -translate-y-1/2 rotate-12 transition-opacity duration-200 pointer-events-none",
          swipeIndicator === "right" ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className="px-5 py-2.5 rounded-xl font-display text-xl font-bold tracking-widest"
          style={{
            background: "rgba(34, 197, 94, 0.3)",
            border: "3px solid #4ade80",
            color: "#4ade80"
          }}
        >
          {t("like")}
        </span>
      </div>
      <div
        className={cn(
          "absolute top-1/2 left-5 -translate-y-1/2 -rotate-12 transition-opacity duration-200 pointer-events-none",
          swipeIndicator === "left" ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className="px-5 py-2.5 rounded-xl font-display text-xl font-bold tracking-widest"
          style={{
            background: "rgba(239, 68, 68, 0.3)",
            border: "3px solid #ef4444",
            color: "#ef4444"
          }}
        >
          {t("pass")}
        </span>
      </div>
      <div
        className={cn(
          "absolute top-1/4 left-1/2 -translate-x-1/2 transition-opacity duration-200 pointer-events-none",
          swipeIndicator === "up" ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className="px-5 py-2.5 rounded-xl font-display text-xl font-bold tracking-widest"
          style={{
            background: "rgba(212, 175, 55, 0.3)",
            border: "3px solid #D4AF37",
            color: "#D4AF37"
          }}
        >
          {t("superlike")}
        </span>
      </div>
    </div>
  );
}

export function MatchContent() {
  const t = useTranslations("match");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Page enter animation
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

  const animateSwipe = (direction: "left" | "right" | "up") => {
    if (!cardRef.current) return;

    const translations = {
      left: { x: -500, rotate: -15, y: 0 },
      right: { x: 500, rotate: 15, y: 0 },
      up: { x: 0, rotate: 0, y: -500 },
    };

    anime({
      targets: cardRef.current,
      translateX: translations[direction].x,
      translateY: translations[direction].y,
      rotate: translations[direction].rotate,
      opacity: 0,
      duration: 400,
      easing: "easeOutExpo",
      complete: () => {
        // Check for match (random 30% chance for demo)
        if ((direction === "right" || direction === "up") && Math.random() > 0.7) {
          setMatchedProfile(mockProfiles[currentIndex]!);
          setShowMatch(true);
        }
        setCurrentIndex((prev) => prev + 1);
      },
    });
  };

  const handleSwipe = (direction: "left" | "right" | "up") => {
    animateSwipe(direction);
  };

  const handleRewind = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const remainingProfiles = mockProfiles.slice(currentIndex, currentIndex + 3);
  const isOutOfProfiles = currentIndex >= mockProfiles.length;

  return (
    <div ref={pageRef} className="opacity-0 flex flex-col h-full">
      {/* Header */}
      <header
        className="px-4 pt-4 pb-3 safe-top flex items-center justify-between"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link
          href="/discover"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </Link>
        <div className="text-center">
          <h1 className="font-display text-lg text-white flex items-center gap-2 justify-center">
            <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
            Match
          </h1>
          <p className="text-white/40 text-xs">Find your smoke partner for life</p>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Card Stack */}
      <div className="flex-1 relative flex items-center justify-center px-4 pt-2">
        {isOutOfProfiles ? (
          <div className="text-center px-8">
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(233, 30, 99, 0.1)" }}
            >
              <Heart className="w-12 h-12 text-pink-400/50" />
            </div>
            <h3 className="font-display text-xl text-white mb-2">{t("outOfProfiles")}</h3>
            <p className="text-white/50 mb-6">{t("checkBackLater")}</p>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(233, 30, 99, 0.2), rgba(233, 30, 99, 0.1))",
                border: "1px solid rgba(233, 30, 99, 0.3)",
                color: "#f472b6",
              }}
            >
              <Leaf className="w-4 h-4" />
              Explore other features
            </Link>
          </div>
        ) : (
          remainingProfiles.map((profile, i) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              stackPosition={i}
              onSwipe={i === 0 ? handleSwipe : undefined}
              cardRef={i === 0 ? cardRef : undefined}
            />
          ))
        )}
      </div>

      {/* Action Bar */}
      {!isOutOfProfiles && (
        <div className="py-5 px-4">
          <div className="flex items-center justify-center gap-4">
            {/* Rewind */}
            <button
              onClick={handleRewind}
              disabled={currentIndex === 0}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                currentIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:scale-110 active:scale-95"
              )}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#D4AF37",
              }}
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Pass */}
            <button
              onClick={() => handleSwipe("left")}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "2px solid rgba(239, 68, 68, 0.4)",
                color: "#ef4444",
                boxShadow: "0 4px 20px rgba(239, 68, 68, 0.2)",
              }}
            >
              <X className="w-7 h-7" strokeWidth={3} />
            </button>

            {/* Super Like */}
            <button
              onClick={() => handleSwipe("up")}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(212, 175, 55, 0.15)",
                border: "2px solid rgba(212, 175, 55, 0.4)",
                color: "#D4AF37",
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.2)",
              }}
            >
              <Star className="w-6 h-6" fill="currentColor" />
            </button>

            {/* VIBE Button - Main CTA */}
            <button
              onClick={() => handleSwipe("right")}
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                boxShadow: "0 8px 32px rgba(236, 72, 153, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)",
              }}
            >
              <Heart className="w-9 h-9 text-white" fill="currentColor" />
            </button>

            {/* Boost */}
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(147, 51, 234, 0.15)",
                border: "1px solid rgba(147, 51, 234, 0.3)",
                color: "#a855f7",
              }}
            >
              <Zap className="w-5 h-5" />
            </button>
          </div>

          {/* Action Labels */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="w-12 text-center text-[10px] text-white/30">Undo</span>
            <span className="w-16 text-center text-[10px] text-red-400/70">Pass</span>
            <span className="w-14 text-center text-[10px] text-yellow-500/70">Super</span>
            <span className="w-20 text-center text-xs font-bold text-pink-400">VIBE</span>
            <span className="w-12 text-center text-[10px] text-purple-400/70">Boost</span>
          </div>
        </div>
      )}

      {/* Match Modal */}
      <MatchModal show={showMatch} profile={matchedProfile} onClose={() => setShowMatch(false)} />
    </div>
  );
}
