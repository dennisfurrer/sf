"use client";

import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  type HTMLAttributes,
} from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import anime from "animejs";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import type { Profile } from "~/lib/mock-data";

export interface SwipeCardProps extends HTMLAttributes<HTMLDivElement> {
  profile: Profile;
  stackPosition: number;
  onSwipe?: (direction: "left" | "right" | "up") => void;
}

const SwipeCard = forwardRef<HTMLDivElement, SwipeCardProps>(
  ({ className, profile, stackPosition, onSwipe, ...props }, ref) => {
    const t = useTranslations("swipe");
    const cardRef = useRef<HTMLDivElement>(null);
    const [dragState, setDragState] = useState<{
      startX: number;
      startY: number;
      currentX: number;
      currentY: number;
      isDragging: boolean;
    }>({ startX: 0, startY: 0, currentX: 0, currentY: 0, isDragging: false });

    const [swipeIndicator, setSwipeIndicator] = useState<
      "none" | "vibe" | "pass" | "soulmate"
    >("none");

    // Calculate stack offset and scale
    const stackOffset = stackPosition * 8;
    const stackScale = 1 - stackPosition * 0.05;
    const stackOpacity = 1 - stackPosition * 0.2;

    // Handle drag start
    const handleDragStart = (clientX: number, clientY: number) => {
      if (stackPosition !== 0) return;
      setDragState({
        startX: clientX,
        startY: clientY,
        currentX: clientX,
        currentY: clientY,
        isDragging: true,
      });
    };

    // Handle drag move
    const handleDragMove = (clientX: number, clientY: number) => {
      if (!dragState.isDragging || stackPosition !== 0) return;

      const deltaX = clientX - dragState.startX;
      const deltaY = clientY - dragState.startY;

      setDragState((prev) => ({
        ...prev,
        currentX: clientX,
        currentY: clientY,
      }));

      // Update card position
      if (cardRef.current) {
        const rotation = deltaX * 0.1;
        cardRef.current.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotate(${rotation}deg)`;
      }

      // Determine swipe indicator
      const threshold = 50;
      if (deltaX > threshold) {
        setSwipeIndicator("vibe");
      } else if (deltaX < -threshold) {
        setSwipeIndicator("pass");
      } else if (deltaY < -threshold) {
        setSwipeIndicator("soulmate");
      } else {
        setSwipeIndicator("none");
      }
    };

    // Handle drag end
    const handleDragEnd = () => {
      if (!dragState.isDragging || stackPosition !== 0) return;

      const deltaX = dragState.currentX - dragState.startX;
      const deltaY = dragState.currentY - dragState.startY;
      const swipeThreshold = 100;

      setDragState({
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        isDragging: false,
      });
      setSwipeIndicator("none");

      if (Math.abs(deltaX) > swipeThreshold || deltaY < -swipeThreshold) {
        // Swipe detected
        let direction: "left" | "right" | "up";
        if (deltaY < -swipeThreshold && Math.abs(deltaY) > Math.abs(deltaX)) {
          direction = "up";
        } else {
          direction = deltaX > 0 ? "right" : "left";
        }

        // Animate card out
        if (cardRef.current) {
          const translations = {
            left: { x: -500, y: 0, rotate: -15 },
            right: { x: 500, y: 0, rotate: 15 },
            up: { x: 0, y: -500, rotate: 0 },
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
              onSwipe?.(direction);
            },
          });
        }
      } else {
        // Snap back
        if (cardRef.current) {
          anime({
            targets: cardRef.current,
            translateX: 0,
            translateY: 0,
            rotate: 0,
            duration: 300,
            easing: "easeOutCubic",
          });
        }
      }
    };

    // Mouse events
    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: React.MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handleDragEnd();
    };

    const onMouseLeave = () => {
      if (dragState.isDragging) {
        handleDragEnd();
      }
    };

    // Touch events
    const onTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      handleDragEnd();
    };

    // Reset transform when stackPosition changes
    useEffect(() => {
      if (cardRef.current && stackPosition === 0) {
        cardRef.current.style.transform = "";
      }
    }, [stackPosition]);

    return (
      <div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "absolute w-[calc(100%-32px)] max-w-[380px] aspect-[3/4]",
          "rounded-3xl overflow-hidden",
          "bg-velvet-deep",
          "shadow-xl",
          stackPosition === 0 ? "cursor-grab active:cursor-grabbing" : "",
          className
        )}
        style={{
          zIndex: 10 - stackPosition,
          transform: `translateY(${stackOffset}px) scale(${stackScale})`,
          opacity: stackOpacity,
        }}
        onMouseDown={stackPosition === 0 ? onMouseDown : undefined}
        onMouseMove={stackPosition === 0 ? onMouseMove : undefined}
        onMouseUp={stackPosition === 0 ? onMouseUp : undefined}
        onMouseLeave={stackPosition === 0 ? onMouseLeave : undefined}
        onTouchStart={stackPosition === 0 ? onTouchStart : undefined}
        onTouchMove={stackPosition === 0 ? onTouchMove : undefined}
        onTouchEnd={stackPosition === 0 ? onTouchEnd : undefined}
        {...props}
      >
        {/* Profile image */}
        <img
          src={profile.photo}
          alt={profile.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Swipe indicators */}
        {swipeIndicator === "vibe" && (
          <div className="absolute top-6 left-6 px-4 py-2 rounded-lg border-2 border-green bg-green/20 rotate-[-15deg]">
            <span className="text-2xl font-bold text-green">{t("like")}</span>
          </div>
        )}
        {swipeIndicator === "pass" && (
          <div className="absolute top-6 right-6 px-4 py-2 rounded-lg border-2 border-red-500 bg-red-500/20 rotate-[15deg]">
            <span className="text-2xl font-bold text-red-500">{t("pass")}</span>
          </div>
        )}
        {swipeIndicator === "soulmate" && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg border-2 border-gold bg-gold/20">
            <span className="text-2xl font-bold text-gold">{t("superlike")}</span>
          </div>
        )}

        {/* Profile info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            {profile.verified && <Badge variant="verified">Verified</Badge>}
            {profile.online && <Badge variant="online">Online</Badge>}
          </div>

          {/* Name and age */}
          <h2 className="font-serif text-3xl font-medium text-cream mb-1">
            {profile.name}, {profile.age}
          </h2>

          {/* Location */}
          <div className="flex items-center gap-1 text-cream/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {profile.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="cannabis">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SwipeCard.displayName = "SwipeCard";

export { SwipeCard };
