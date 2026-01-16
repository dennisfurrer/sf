"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";
import { SwipeCard } from "./swipe-card";
import { MatchModal } from "./match-modal";
import { mockProfiles, type Profile } from "~/lib/mock-data";

export interface SwipeStackProps {
  className?: string;
}

export function SwipeStack({ className }: SwipeStackProps) {
  const t = useTranslations("match");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const handleSwipe = useCallback(
    (direction: "left" | "right" | "up") => {
      // 30% chance to trigger match on right swipe
      if (direction === "right" && Math.random() < 0.3) {
        setMatchedProfile(mockProfiles[currentIndex]);
        setShowMatch(true);
      }

      // Move to next card
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex]
  );

  const handleCloseMatch = useCallback(() => {
    setShowMatch(false);
    setMatchedProfile(null);
  }, []);

  // Get visible cards (current + next 2)
  const visibleProfiles = mockProfiles.slice(currentIndex, currentIndex + 3);

  // Out of profiles
  if (visibleProfiles.length === 0) {
    return (
      <div className={cn("flex-1 flex items-center justify-center p-8", className)}>
        <div className="text-center">
          <div className="text-6xl mb-4">🍃</div>
          <h2 className="font-serif text-2xl text-cream mb-2">{t("outOfProfiles")}</h2>
          <p className="text-cream/60">{t("checkBackLater")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex-1 flex items-center justify-center",
        className
      )}
    >
      {/* Card stack - render in reverse order so first card is on top */}
      {visibleProfiles
        .slice()
        .reverse()
        .map((profile, reverseIndex) => {
          const stackPosition = visibleProfiles.length - 1 - reverseIndex;
          return (
            <SwipeCard
              key={profile.id}
              profile={profile}
              stackPosition={stackPosition}
              onSwipe={stackPosition === 0 ? handleSwipe : undefined}
            />
          );
        })}

      {/* Match Modal */}
      <MatchModal
        show={showMatch}
        profile={matchedProfile}
        onClose={handleCloseMatch}
      />
    </div>
  );
}
