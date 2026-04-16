"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-label={alt}>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors"
        aria-label="Close lightbox"
      >
        ×
      </button>
    </div>,
    document.body
  );
}
