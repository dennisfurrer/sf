"use client";

import anime from "animejs";
import { BadgeCheck, ChevronLeft, Flame, Heart, Leaf, MapPin, RotateCcw, Star, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MatchModal } from "~/components/features/match-modal";
import { Link } from "~/i18n/routing";
import { mockProfiles, type Profile } from "~/lib/mock-data";
import { cn } from "~/lib/utils";

// Full Screen Swipe Card Component
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

  // Calculate smoke compatibility
  const compatibility = 65 + Math.floor(profile.id.charCodeAt(0) % 30);

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
      const rotation = deltaX * 0.05;

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

  // Stack styling - will-change for GPU acceleration
  const stackStyles: React.CSSProperties = {
    zIndex: 10 - stackPosition,
    opacity: stackPosition > 2 ? 0 : 1 - stackPosition * 0.3,
    willChange: "transform",
  };

  if (stackPosition !== 0) return null; // Only show top card

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 rounded-b-3xl overflow-hidden",
        stackPosition === 0 && "cursor-grab active:cursor-grabbing"
      )}
      style={stackStyles}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Profile Image - fills card */}
      <Image src={profile.photo} alt={profile.name} fill className="object-cover object-top" sizes="100vw" priority={stackPosition === 0} />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%)"
        }}
      />

      {/* Top bar - Back + Verified left, Compatibility center, Online right */}
      <div className="absolute top-0 left-0 right-0 pt-2 px-2 z-10 safe-top">
        <div className="flex items-center justify-between">
          {/* Left - Back button + Verified badge */}
          <div className="flex items-center gap-2">
            <Link
              href="/discover"
              className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:bg-white/20"
              style={{ background: "rgba(0, 0, 0, 0.6)" }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Link>
            {profile.verified && (
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
                style={{ background: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(212, 175, 55, 0.3)" }}
              >
                <BadgeCheck className="w-4 h-4" style={{ color: "#D4AF37" }} />
              </span>
            )}
          </div>

          {/* Compatibility - center */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{ background: "rgba(233, 30, 99, 0.2)", border: "1px solid rgba(233, 30, 99, 0.3)" }}
          >
            <Flame className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-white/80 text-xs font-medium">Compatibility</span>
            <span className="text-pink-400 text-sm font-bold">{compatibility}%</span>
          </div>

          {/* Online badge - right */}
          <div className="flex items-center">
            {profile.online && (
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
                style={{ background: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(34, 197, 94, 0.3)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content - bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-4 z-10">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-display text-3xl font-medium text-white">{profile.name}</h3>
          <span className="text-xl text-white/50 font-light">{profile.age}</span>
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
          "absolute top-1/2 right-8 -translate-y-1/2 rotate-12 transition-opacity duration-200 pointer-events-none",
          swipeIndicator === "right" ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className="px-6 py-3 rounded-xl font-display text-2xl font-bold tracking-widest"
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
          "absolute top-1/2 left-8 -translate-y-1/2 -rotate-12 transition-opacity duration-200 pointer-events-none",
          swipeIndicator === "left" ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className="px-6 py-3 rounded-xl font-display text-2xl font-bold tracking-widest"
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
          "absolute top-1/3 left-1/2 -translate-x-1/2 transition-opacity duration-200 pointer-events-none",
          swipeIndicator === "up" ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className="px-6 py-3 rounded-xl font-display text-2xl font-bold tracking-widest"
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
  const [hasLikedOnce, setHasLikedOnce] = useState(false);
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
        // First like always shows match, then 30% chance after that
        if (direction === "right" || direction === "up") {
          if (!hasLikedOnce) {
            // First like - always match!
            setMatchedProfile(mockProfiles[currentIndex]!);
            setShowMatch(true);
            setHasLikedOnce(true);
          } else if (Math.random() > 0.7) {
            // Subsequent likes - 30% chance
            setMatchedProfile(mockProfiles[currentIndex]!);
            setShowMatch(true);
          }
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
    <div ref={pageRef} className="opacity-0 flex flex-col h-[100dvh] pb-20 overflow-hidden">
      {/* Card Area - takes remaining space above buttons */}
      <div className="flex-1 relative overflow-hidden">
        {isOutOfProfiles ? (
          <div className="h-full flex items-center justify-center">
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

      {/* Action Bar - Fixed height section below image */}
      {!isOutOfProfiles && (
        <div className="flex-shrink-0 py-3 px-4" style={{ background: "rgba(10, 10, 10, 0.95)" }}>
          <div className="flex items-center justify-center gap-5">
            {/* Rewind */}
            <button
              onClick={handleRewind}
              disabled={currentIndex === 0}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200",
                currentIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:scale-110 active:scale-95"
              )}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#D4AF37",
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Pass */}
            <button
              onClick={() => handleSwipe("left")}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                border: "2px solid rgba(239, 68, 68, 0.5)",
                color: "#ef4444",
                boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
              }}
            >
              <X className="w-6 h-6" strokeWidth={3} />
            </button>

            {/* Super Like */}
            <button
              onClick={() => handleSwipe("up")}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(212, 175, 55, 0.2)",
                border: "2px solid rgba(212, 175, 55, 0.5)",
                color: "#D4AF37",
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
              }}
            >
              <Star className="w-5 h-5" fill="currentColor" />
            </button>

            {/* VIBE Button - Main CTA */}
            <button
              onClick={() => handleSwipe("right")}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                boxShadow: "0 8px 32px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)",
              }}
            >
              <Heart className="w-7 h-7 text-white" fill="currentColor" />
            </button>

            {/* Haaajde */}
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(147, 51, 234, 0.2)",
                border: "1px solid rgba(147, 51, 234, 0.4)",
                color: "#a855f7",
              }}
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>

          {/* Action Labels */}
          <div className="flex items-center justify-center gap-5 mt-0">
            <span className="w-11 text-center text-[9px] text-white/40">Undo</span>
            <span className="w-14 text-center text-[9px] text-red-400/80">Pass</span>
            <span className="w-12 text-center text-[9px] text-yellow-500/80">Super</span>
            <span className="w-16 text-center text-[10px] font-bold text-pink-400">VIBE</span>
            <span className="w-11 text-center text-[9px] text-purple-400/80">Haaajde</span>
          </div>
        </div>
      )}

      {/* Match Modal */}
      <MatchModal show={showMatch} profile={matchedProfile} onClose={() => setShowMatch(false)} />
    </div>
  );
}
