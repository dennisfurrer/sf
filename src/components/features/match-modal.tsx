"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import anime from "animejs";
import { currentUser, type Profile } from "~/lib/mock-data";
import { Link } from "~/i18n/routing";

interface MatchModalProps {
  show: boolean;
  profile: Profile | null;
  onClose: () => void;
}

export function MatchModal({ show, profile, onClose }: MatchModalProps) {
  const t = useTranslations("match");
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && overlayRef.current && contentRef.current && leavesRef.current) {
      // Animate in overlay
      anime({
        targets: overlayRef.current,
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutCubic",
      });

      // Animate in content
      anime({
        targets: contentRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 200,
        easing: "easeOutExpo",
      });

      // Falling leaves celebration
      const leaves = ["🍃", "🌿", "☘️", "💨", "✨"];
      const container = leavesRef.current;

      for (let i = 0; i < 20; i++) {
        const leaf = document.createElement("div");
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.className = "absolute text-xl pointer-events-none";
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.top = "-20px";
        container.appendChild(leaf);

        anime({
          targets: leaf,
          translateY: window.innerHeight + 50,
          translateX: anime.random(-100, 100),
          rotate: anime.random(360, 720),
          opacity: [1, 0],
          duration: anime.random(3000, 5000),
          delay: anime.random(0, 1000),
          easing: "easeInQuad",
          complete: () => leaf.remove(),
        });
      }
    }
  }, [show]);

  if (!show || !profile) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-lounge-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
      style={{ opacity: 0 }}
    >
      {/* Falling leaves container */}
      <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      <div ref={contentRef} className="text-center max-w-sm mx-auto" style={{ opacity: 0 }}>
        {/* Match icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green to-rose flex items-center justify-center shadow-glow-rose">
          <span className="text-4xl">💚</span>
        </div>

        {/* Title - Localized */}
        <h1 className="font-display text-4xl font-semibold text-text-primary mb-2">{t("title")}</h1>
        <p className="text-text-secondary mb-8">{t("subtitle")}</p>

        {/* Profile photos */}
        <div className="flex justify-center items-center mb-10">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-lounge-charcoal translate-x-4 z-10">
            <Image src={currentUser.photo} alt="You" fill className="object-cover" sizes="80px" />
          </div>
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-lounge-charcoal -translate-x-4">
            <Image src={profile.photo} alt={profile.name} fill className="object-cover" sizes="80px" />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/chat" className="block w-full btn-primary py-4 text-lg text-center">
            {t("sendMessage")}
          </Link>
          <button onClick={onClose} className="w-full btn-secondary py-4 text-lg">
            {t("keepSwiping")}
          </button>
        </div>
      </div>
    </div>
  );
}
