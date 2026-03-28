"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface IntentInputProps {
  onSubmit: (intent: string) => void;
  disabled?: boolean;
}

export function IntentInput({ onSubmit, disabled = false }: IntentInputProps) {
  const [intent, setIntent] = useState("");
  const isValid = intent.trim().length >= 3;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isValid && !disabled) {
      onSubmit(intent.trim());
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full space-y-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
    >
      <label
        htmlFor="oracle-intent"
        className="block text-[14px] font-medium leading-[1.4] text-muted-foreground"
      >
        What weighs on your mind?
      </label>
      <Textarea
        id="oracle-intent"
        placeholder="Ask about love, purpose, a decision you face..."
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        disabled={disabled}
        className="min-h-[100px] resize-none"
        rows={3}
      />
      <Button
        type="submit"
        disabled={!isValid || disabled}
        className="w-full min-h-[48px] bg-[hsl(45,93%,47%)] text-zinc-950 font-semibold hover:bg-[hsl(45,93%,42%)] disabled:opacity-50"
      >
        Begin Reading
      </Button>
    </motion.form>
  );
}
