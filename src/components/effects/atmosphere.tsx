"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export function Atmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Create floating particles using theme colors
    const createParticle = () => {
      if (!container) return;

      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none";

      const size = anime.random(4, 12);
      const accentNum = anime.random(1, 3);

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: var(--color-accent-${accentNum});
        box-shadow: 0 0 ${size * 2}px var(--color-accent-${accentNum});
        left: ${anime.random(0, 100)}%;
        bottom: -20px;
        opacity: 0;
      `;

      container.appendChild(particle);

      anime({
        targets: particle,
        translateY: [0, anime.random(-400, -800)],
        translateX: anime.random(-50, 50),
        opacity: [0, 0.7, 0],
        duration: anime.random(6000, 12000),
        easing: "easeOutQuad",
        complete: () => particle.remove(),
      });
    };

    // Spawn particles periodically
    const interval = setInterval(createParticle, 2000);

    // Initial particles
    for (let i = 0; i < 4; i++) {
      setTimeout(createParticle, i * 400);
    }

    return () => clearInterval(interval);
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

      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
