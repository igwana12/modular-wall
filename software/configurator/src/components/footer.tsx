export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
            <span className="inline-block h-3 w-3 rounded-sm bg-teal" />
            <span className="text-foreground">[MODULAR]</span>
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            Local prototype. Not a product yet. Just an idea with magnets.
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            <span className="font-mono">v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
