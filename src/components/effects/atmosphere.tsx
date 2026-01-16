"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export function Atmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Create smoke plume
    const createSmokePlume = () => {
      if (!container) return;

      const plume = document.createElement("div");
      plume.className = "absolute pointer-events-none";

      // Randomize smoke properties
      const startX = anime.random(10, 90);
      const width = anime.random(80, 200);
      const height = anime.random(100, 250);

      plume.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        left: ${startX}%;
        bottom: -50px;
        opacity: 0;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        background: radial-gradient(ellipse at center,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.04) 30%,
          rgba(255, 255, 255, 0.01) 60%,
          transparent 100%
        );
        filter: blur(${anime.random(20, 40)}px);
        transform-origin: center bottom;
      `;

      container.appendChild(plume);

      // Animate the smoke rising and dissipating
      anime({
        targets: plume,
        translateY: [0, anime.random(-500, -800)],
        translateX: [0, anime.random(-100, 100)],
        scaleX: [1, anime.random(1.5, 3)],
        scaleY: [1, anime.random(1.2, 2)],
        opacity: [0, 0.6, 0.4, 0],
        rotate: [0, anime.random(-20, 20)],
        duration: anime.random(8000, 15000),
        easing: "easeOutQuad",
        complete: () => plume.remove(),
      });
    };

    // Create wispy smoke tendril
    const createSmokeTendril = () => {
      if (!container) return;

      const tendril = document.createElement("div");
      tendril.className = "absolute pointer-events-none";

      const startX = anime.random(5, 95);
      const width = anime.random(30, 80);

      tendril.style.cssText = `
        width: ${width}px;
        height: ${anime.random(150, 300)}px;
        left: ${startX}%;
        bottom: -30px;
        opacity: 0;
        background: linear-gradient(to top,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 50%,
          transparent 100%
        );
        filter: blur(${anime.random(15, 30)}px);
        border-radius: 100px;
        transform-origin: center bottom;
      `;

      container.appendChild(tendril);

      anime({
        targets: tendril,
        translateY: [0, anime.random(-400, -700)],
        translateX: () => [0, anime.random(-80, 80)],
        scaleX: [1, anime.random(0.5, 1.5)],
        skewX: [0, anime.random(-15, 15)],
        opacity: [0, 0.5, 0.3, 0],
        duration: anime.random(6000, 12000),
        easing: "easeOutSine",
        complete: () => tendril.remove(),
      });
    };

    // Spawn smoke periodically
    const plumeInterval = setInterval(createSmokePlume, 4000);
    const tendrilInterval = setInterval(createSmokeTendril, 2500);

    // Initial smoke
    setTimeout(createSmokePlume, 500);
    setTimeout(createSmokeTendril, 1000);
    setTimeout(createSmokePlume, 2000);
    setTimeout(createSmokeTendril, 3000);

    return () => {
      clearInterval(plumeInterval);
      clearInterval(tendrilInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-atmosphere overflow-hidden">
      {/* Large gradient orbs using theme colors */}
      <div
        className="absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse-glow"
        style={{
          background: "var(--gradient-glow)",
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[100px] opacity-25 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, var(--glow-secondary) 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, var(--glow-tertiary) 0%, transparent 70%)",
          animationDelay: "6s",
        }}
      />

      {/* Smoke container */}
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
