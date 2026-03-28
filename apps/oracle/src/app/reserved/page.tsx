import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ShareButton } from "./share-button";

export const metadata: Metadata = {
  title: "Reservation Confirmed \u2014 Oracle Cards",
  description: "Your $1 deposit has been received. You're on the early-bird list.",
};

interface ReservedPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ReservedPage({ searchParams }: ReservedPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex max-w-md flex-col items-center gap-6">
        <CheckCircle className="h-16 w-16 text-green-500" />

        <h1 className="font-serif text-3xl font-bold sm:text-4xl">
          You&apos;re in!
        </h1>

        <p className="text-muted-foreground">
          Your $1 deposit secures early-bird pricing for Oracle Cards. You'll be
          among the first to experience AI-powered Greek deity readings.
        </p>

        <p className="text-sm text-muted-foreground/70">
          Check your email for what&apos;s next.
        </p>

        {session_id && (
          <p className="text-xs text-muted-foreground/50">
            Confirmation: {session_id.slice(0, 12)}...
          </p>
        )}

        <div className="flex w-full gap-3 pt-4">
          <Link
            href="/oracle"
            className="flex flex-1 min-h-[48px] items-center justify-center rounded-lg bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try a Free Reading
          </Link>
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
