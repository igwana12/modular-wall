"use client";

import { useRef, useState, useEffect } from "react";

// ─── SVG Social Icons (no external deps) ───────────────────────
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ─── Platform Data ─────────────────────────────────────────────
const PLATFORMS = [
  {
    name: "YouTube",
    icon: YouTubeIcon,
    color: "#FF0000",
    description: "Build guides, module reviews, interface tutorials. Watch the wall come alive.",
    stat: "Coming Soon",
    url: "#",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    color: "#00f2ea",
    description: "Wall build timelapses, interface animations, satisfying magnet snaps.",
    stat: "Coming Soon",
    url: "#",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    color: "#E4405F",
    description: "Wall configurations, lifestyle shots, module photography, community builds.",
    stat: "Coming Soon",
    url: "#",
  },
  {
    name: "Discord",
    icon: DiscordIcon,
    color: "#5865F2",
    description: "Community hub. Share interfaces, get support, show your wall. The town square.",
    stat: "Coming Soon",
    url: "#",
  },
  {
    name: "GitHub",
    icon: GitHubIcon,
    color: "#ffffff",
    description: "Open source everything. Fork the firmware, submit interfaces, build modules.",
    stat: "Public Repo",
    url: "https://github.com/igwana12/modular-wall",
  },
  {
    name: "X / Twitter",
    icon: XIcon,
    color: "#ffffff",
    description: "Product updates, launch announcements, behind-the-scenes.",
    stat: "Coming Soon",
    url: "#",
  },
];

// ─── Community Section ─────────────────────────────────────────
export function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="community" className="relative py-24 md:py-32 smoke-bg noise-overlay" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase section-label">
            Community
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Join the Community
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Share your wall. Download interfaces. Build together.
            <br />
            <span className="text-foreground font-medium">The wall generates inherently shareable content.</span>
          </p>
        </div>

        {/* Omma — Interface Creation Tool (featured) */}
        <a
          href="https://omma.build"
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-8 block rounded-2xl border border-teal/30 bg-gradient-to-r from-teal/5 via-surface-raised/50 to-amber/5 p-6 transition-all duration-300 hover:border-teal/50 hover:shadow-[0_0_40px_rgba(0,212,170,0.12)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.3s, box-shadow 0.3s",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-shrink-0 rounded-2xl bg-teal/10 border border-teal/20 p-4 transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
                <rect x="2" y="2" width="36" height="36" rx="10" stroke="#00D4AA" strokeWidth="2.5" fill="#00D4AA" fillOpacity="0.08" />
                <text x="20" y="27" textAnchor="middle" fill="#00D4AA" fontSize="20" fontWeight="bold" fontFamily="system-ui">O</text>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-teal">Create Interfaces with Omma</h3>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-mono bg-teal/10 text-teal border border-teal/20">
                  by Spline
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build your own mosAIc widget with Omma. Describe what you want, AI builds it as an interactive Three.js experience.{" "}
                <span className="text-foreground font-medium">No code required.</span>
              </p>
            </div>
            <div className="flex-shrink-0 text-teal font-mono text-sm opacity-60 group-hover:opacity-100 transition-opacity">
              omma.build →
            </div>
          </div>
        </a>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORMS.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target={platform.url !== "#" ? "_blank" : undefined}
                rel={platform.url !== "#" ? "noopener noreferrer" : undefined}
                className="group rounded-2xl border border-border/50 bg-surface-raised/50 p-6 transition-all duration-300 hover:bg-surface-raised"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease-out ${index * 0.08}s, transform 0.5s ease-out ${index * 0.08}s, border-color 0.3s, background-color 0.3s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${platform.color}40`;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${platform.color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${platform.color}12` }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{platform.name}</h3>
                      <span
                        className="text-[10px] font-mono rounded-full px-2 py-0.5"
                        style={{
                          color: platform.color === "#ffffff" ? "#00D4AA" : platform.color,
                          backgroundColor: `${platform.color === "#ffffff" ? "#00D4AA" : platform.color}12`,
                          border: `1px solid ${platform.color === "#ffffff" ? "#00D4AA" : platform.color}25`,
                        }}
                      >
                        {platform.stat}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Content types callout */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { emoji: "🎬", label: "Build Timelapses", desc: "Watch walls come together" },
            { emoji: "🎨", label: "Interface Showcases", desc: "See what the community builds" },
            { emoji: "🧲", label: "Magnet ASMR", desc: "Satisfying snap videos" },
            { emoji: "📐", label: "Design Templates", desc: "Pre-made wall layouts" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border/30 bg-surface/30 p-4">
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="text-xs font-semibold mb-1">{item.label}</div>
              <div className="text-[10px] text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
