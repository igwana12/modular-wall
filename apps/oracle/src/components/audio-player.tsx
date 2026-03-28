"use client";

import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface AudioPlayerProps {
  isMuted: boolean;
  isPlaying: boolean;
  onToggleMute: () => void;
}

export function AudioPlayer({
  isMuted,
  isPlaying,
  onToggleMute,
}: AudioPlayerProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMute}
            className="min-w-[44px] min-h-[44px]"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          />
        }
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : isPlaying ? (
          <motion.span
            className="inline-flex"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Volume2 className="h-5 w-5 text-[hsl(45,93%,47%)]" />
          </motion.span>
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        {isMuted ? "Tap to resume" : isPlaying ? "Playing" : "Audio"}
      </TooltipContent>
    </Tooltip>
  );
}
