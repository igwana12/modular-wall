"use client";

const NAV_LINKS = [
  { label: "Demo", href: "#demo" },
  { label: "Modules", href: "#modules" },
  { label: "Interfaces", href: "#interfaces" },
  { label: "Configurator", href: "#configurator" },
  { label: "Styles", href: "#customization" },
  { label: "Scenes", href: "#scenes" },
  { label: "Thesis", href: "#thesis" },
];

const SOCIAL_LINKS = [
  { name: "YouTube", href: "#", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "TikTok", href: "#", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { name: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  { name: "Discord", href: "#", icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" },
  { name: "GitHub", href: "https://github.com/igwana12/modular-wall", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
  { name: "X", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 section-dark">
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/mosaic-logo.jpg" alt="mosAIc" className="h-8 w-auto rounded-lg" />
              <span className="text-xl font-bold">mosAIc</span>
            </div>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-md mb-6">
              Open source modular wall computer. 12 magnetic modules, AI-powered orchestration,
              infinite combinations. Your desktop, on your wall.
            </p>
            <p className="text-xs text-muted-foreground/40 font-mono italic">
              Open hardware. Proprietary soul.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-muted-foreground/60 tracking-wide uppercase">Navigate</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground/50 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-muted-foreground/60 tracking-wide uppercase">Community</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href !== "#" ? "_blank" : undefined}
                  rel={link.href !== "#" ? "noopener noreferrer" : undefined}
                  className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-teal/20 transition-all"
                  aria-label={link.name}
                  title={link.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-muted-foreground/50 hover:text-teal transition-colors">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <a href="https://omma.build" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/40 hover:text-teal transition-colors font-mono block">
                Create with Omma →
              </a>
              <a href="https://github.com/igwana12/modular-wall" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/40 hover:text-teal transition-colors font-mono block">
                Contribute on GitHub →
              </a>
            </div>
          </div>
        </div>

        {/* Built with section */}
        <div className="border-t border-white/[0.04] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-[10px] text-muted-foreground/30 font-mono">
              <span>Built with open source hardware</span>
              <span className="hidden md:inline">·</span>
              <span>Three.js · Next.js · React · Blender</span>
              <span className="hidden md:inline">·</span>
              <span>A Pantheon experiment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/30">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                <span className="font-mono">v0.1.0</span>
              </div>
            </div>
          </div>
          <p className="text-center mt-6 text-[10px] text-muted-foreground/20 font-mono">
            Local prototype. Not a product yet. Just an idea with magnets.
          </p>
        </div>
      </div>
    </footer>
  );
}
