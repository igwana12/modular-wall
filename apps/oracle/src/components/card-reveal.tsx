"use client";

import { useState, useEffect } from "react";
// Respects prefers-reduced-motion via motion's useReducedMotion hook
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

interface CardRevealProps {
  deityName: string;
  deityTitle: string;
  imageUrl: string;
  colorPalette: [string, string, string];
  onRevealComplete: () => void;
}

export function CardReveal({
  deityName,
  deityTitle,
  imageUrl,
  colorPalette,
  onRevealComplete,
}: CardRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation: show front immediately
      setIsFlipped(true);
      setShowInfo(true);
      onRevealComplete();
      return;
    }

    // Trigger flip after 500ms anticipation delay
    const timer = setTimeout(() => setIsFlipped(true), 500);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, onRevealComplete]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card container with perspective */}
      <div style={{ perspective: 1200 }} className="relative">
        <div
          className="relative"
          style={{
            width: 280,
            height: 420,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Card Back */}
          <motion.div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 60, damping: 20 }
            }
          >
            <div className="relative w-full h-full bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
              {/* Gold glow pulse on card back */}
              {!prefersReducedMotion && !isFlipped && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    boxShadow: "0 0 20px 2px hsl(45 93% 47% / 0.3)",
                  }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              <div className="text-zinc-700 font-serif text-lg tracking-widest uppercase">
                Oracle
              </div>
            </div>
          </motion.div>

          {/* Card Front */}
          <motion.div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              rotateY: 180,
            }}
            animate={{ rotateY: isFlipped ? 360 : 180 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 60, damping: 20 }
            }
            onAnimationComplete={() => {
              if (isFlipped && !prefersReducedMotion) {
                setShowInfo(true);
              }
            }}
          >
            <Image
              src={imageUrl}
              alt={`${deityName} - ${deityTitle}`}
              fill
              priority
              className="object-cover rounded-xl"
              sizes="280px"
            />
          </motion.div>
        </div>
      </div>

      {/* Deity Name + Title */}
      {showInfo && (
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          onAnimationComplete={() => {
            if (!prefersReducedMotion) {
              onRevealComplete();
            }
          }}
        >
          <h1
            className="font-serif text-[32px] font-bold leading-tight"
            style={{ color: colorPalette[0] }}
          >
            {deityName}
          </h1>
          <p className="font-serif text-[24px] font-semibold text-muted-foreground mt-1">
            {deityTitle}
          </p>
        </motion.div>
      )}
    </div>
  );
}
