import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { AccountActions } from "./account-actions";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await getUserByEmail(session.user.email);
  const isPremium = user?.tier === "premium";

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-md space-y-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold mb-1">Account</h1>
          <p className="text-muted-foreground text-sm">
            Manage your oracle subscription and profile.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{session.user.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Plan</p>
            <div className="flex items-center gap-2">
              {isPremium ? (
                <Badge className="bg-[hsl(45,93%,47%)] text-black">
                  Premium
                </Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
          </div>

          {isPremium && (
            <p className="text-sm text-muted-foreground">
              Cancel subscription: You will keep Premium access until your
              current billing period ends. After that, you will return to 3 free
              readings per month.
            </p>
          )}

          <AccountActions isPremium={isPremium} />
        </div>
      </div>
    </div>
  );
}
