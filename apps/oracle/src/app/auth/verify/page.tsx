/**
 * Magic link verification page.
 * Shown after the user submits their email for sign-in.
 */

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center max-w-md space-y-4">
        <h1 className="font-serif text-2xl font-semibold">
          Check your email
        </h1>
        <p className="text-muted-foreground">
          The oracle has sent a key. Click the link in your email to sign in.
        </p>
      </div>
    </div>
  );
}
