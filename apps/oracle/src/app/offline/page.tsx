export default function OfflinePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-serif text-[32px] font-bold mb-4">
        The oracle requires a connection to Olympus
      </h1>
      <p className="text-muted-foreground text-base">
        Please reconnect to receive your reading.
      </p>
    </main>
  );
}
