export function Footer() {
  return (
    <footer className="relative pt-12 pb-8">
      {/* Gradient border-top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal to-amber opacity-40" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
            <span className="inline-block h-3 w-3 rounded-sm bg-teal" />
            <span className="text-foreground">mosAIc</span>
          </div>

          <p className="text-sm text-muted-foreground font-mono italic">
            Open hardware. Proprietary soul.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-teal transition-colors font-mono"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
              <span className="font-mono">v0.1.0</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground/40 font-mono">
            Local prototype. Not a product yet. Just an idea with magnets.
          </p>
        </div>
      </div>
    </footer>
  );
}
