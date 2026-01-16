"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs";
import { Bell, Search, Globe } from "lucide-react";

interface HeroHeaderProps {
  tagline?: string;
  onlineCount?: number;
  onLanguageToggle?: () => void;
}

export function HeroHeader({
  tagline,
  onlineCount = 4269,
  onLanguageToggle,
}: HeroHeaderProps) {
  const meshRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate gradient mesh rotation
    if (meshRef.current) {
      anime({
        targets: meshRef.current,
        rotate: [0, 360],
        duration: 60000,
        easing: "linear",
        loop: true,
      });
    }

    // Logo entrance animation
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1200,
        easing: "easeOutExpo",
      });
    }

    // Floating particles
    if (containerRef.current) {
      const createParticle = () => {
        if (!containerRef.current) return;

        const particle = document.createElement("div");
        particle.className = "absolute rounded-full pointer-events-none";

        const size = anime.random(3, 8);
        const startX = anime.random(10, 90);

        particle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          background: var(--color-accent-${anime.random(1, 3)});
          box-shadow: 0 0 ${size * 3}px var(--glow-primary);
          left: ${startX}%;
          bottom: 0;
          opacity: 0;
        `;

        containerRef.current.appendChild(particle);

        anime({
          targets: particle,
          translateY: [0, anime.random(-300, -500)],
          translateX: anime.random(-30, 30),
          opacity: [0, 0.8, 0],
          scale: [1, 0.5],
          duration: anime.random(4000, 7000),
          easing: "easeOutQuad",
          complete: () => particle.remove(),
        });
      };

      // Initial burst
      for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 200);
      }

      // Continuous particles
      const interval = setInterval(createParticle, 1500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <header className="relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 z-0">
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-surface-black" />

        {/* Animated gradient mesh */}
        <div
          ref={meshRef}
          className="absolute -inset-[50%] opacity-50"
          style={{
            background: "var(--gradient-hero-subtle)",
            filter: "blur(100px)",
            transformOrigin: "center center",
          }}
        />

        {/* Static gradient orbs for depth */}
        <div
          className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-40 animate-pulse-glow"
          style={{
            background: "var(--gradient-glow)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full opacity-30 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, var(--glow-tertiary) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Particle Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
      />

      {/* Content Layer */}
      <div className="relative z-10 px-4 pt-safe pb-8">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-6 pt-4">
          {/* Online Counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-surface">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--color-accent-1)" }}
            />
            <span className="text-sm font-medium text-text-primary">
              {onlineCount.toLocaleString()} Online
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onLanguageToggle}
              className="icon-btn"
              title="Language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button className="icon-btn" title="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative icon-btn" title="Notifications">
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  backgroundColor: "var(--color-accent-2)",
                  borderColor: "var(--color-black)",
                }}
              />
            </button>
          </div>
        </div>

        {/* MASSIVE Logo - 10% bigger */}
        <div ref={logoRef} className="flex flex-col items-center opacity-0">
          <div className="relative">
            {/* Glow behind logo */}
            <div
              className="absolute inset-0 blur-[100px] opacity-80 scale-[2]"
              style={{ background: "var(--gradient-glow)" }}
            />

            {/* Logo Image - 10% larger (h-80 → h-[352px]) */}
            <Image
              src="https://i.ibb.co/RG4pbyLj/logo.png"
              alt="StonelyFans"
              width={1706}
              height={640}
              className="relative z-10 h-80 sm:h-[352px] w-auto animate-float-logo"
              style={{
                filter: "drop-shadow(0 0 80px var(--glow-secondary))",
              }}
              priority
              quality={100}
            />
          </div>

          {/* Tagline - 10x improved */}
          {tagline && (
            <div className="mt-8 text-center">
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-wide"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-1) 0%, var(--color-accent-2) 50%, var(--color-accent-3) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 10px var(--glow-primary))",
                }}
              >
                {tagline}
              </p>
              <div
                className="mt-3 h-[2px] w-32 mx-auto rounded-full"
                style={{
                  background: "var(--gradient-hero)",
                  boxShadow: "0 0 20px var(--glow-primary)",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade for seamless transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-black), transparent)",
        }}
      />
    </header>
  );
}
