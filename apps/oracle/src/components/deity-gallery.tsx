"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { DeitySummary } from "@/types/deity";

interface DeityGalleryProps {
  deities: DeitySummary[];
}

export function DeityGallery({ deities }: DeityGalleryProps) {
  return (
    <section className="w-full">
      <h2 className="font-serif text-2xl font-semibold mb-2">
        Browse the Pantheon
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {deities.map((deity) => (
          <DeityTile key={deity.id} deity={deity} />
        ))}
      </div>
    </section>
  );
}

function DeityTile({ deity }: { deity: DeitySummary }) {
  return (
    <Link href={`/read/${deity.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="overflow-hidden border-border/50 cursor-pointer">
          <CardContent className="p-0">
            <div className="aspect-[3/4] relative bg-muted flex items-center justify-center">
              <Skeleton className="absolute inset-0" />
              <span
                className="relative z-10 text-3xl font-serif font-bold"
                style={{ color: deity.color_palette[0] }}
              >
                {deity.name.charAt(0)}
              </span>
            </div>
            <div className="px-2 py-1.5">
              <p
                className="text-xs font-medium truncate"
                style={{ color: deity.color_palette[0] }}
              >
                {deity.name}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {deity.title}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
