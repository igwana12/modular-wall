import fs from "fs";
import path from "path";

const DEITY_ORDER: Record<string, string> = {
  zeus: "I",
  hera: "II",
  poseidon: "III",
  hades: "IV",
  athena: "V",
  apollo: "VI",
  artemis: "VII",
  ares: "VIII",
  aphrodite: "IX",
  hermes: "X",
  hephaestus: "XI",
  demeter: "XII",
  dionysus: "XIII",
  persephone: "XIV",
  hestia: "XV",
  prometheus: "XVI",
  hecate: "XVII",
  eros: "XVIII",
  pan: "XIX",
  nike: "XX",
  tyche: "XXI",
};

interface DeityConfig {
  id: string;
  name: string;
  title: string;
  color_palette: [string, string, string];
  reading_style: string;
  mythology_keywords: string[];
}

function loadDeityConfig(deityId: string): DeityConfig {
  const configPath = path.join(
    process.cwd(),
    "..",
    "..",
    "services",
    "orb-backend",
    "gods",
    `${deityId}.json`
  );
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

function loadQrSvg(deityId: string): string {
  const qrPath = path.join(
    process.cwd(),
    "..",
    "..",
    "assets",
    "qr-codes",
    `${deityId}.svg`
  );
  try {
    const svg = fs.readFileSync(qrPath, "utf-8");
    // Make QR code white on transparent for the card
    return svg
      .replace(/fill="#ffffff"/g, 'fill="transparent"')
      .replace(/stroke="#000000"/g, 'stroke="#ffffff"');
  } catch {
    return "";
  }
}

export default async function CardFrontPage({
  params,
}: {
  params: Promise<{ deity: string }>;
}) {
  const { deity: deityId } = await params;
  const config = loadDeityConfig(deityId);
  const romanNumeral = DEITY_ORDER[deityId] || "?";
  const [color1, color2, color3] = config.color_palette;
  const qrSvg = loadQrSvg(deityId);

  // Check if hero image exists in public/print-assets
  const heroImagePath = `/print-assets/${deityId}.png`;

  return (
    <div
      style={{
        width: 900,
        height: 1500,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Crimson Pro', 'Georgia', serif",
        background: `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`,
      }}
    >
      {/* Hero image background */}
      <img
        src={heroImagePath}
        alt={config.name}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />

      {/* Dark vignette overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.85) 85%)
          `,
        }}
      />

      {/* Top border accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color1}, ${color2}, ${color3})`,
        }}
      />

      {/* Roman numeral top center */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: color2,
            textShadow: `0 0 20px ${color1}, 0 0 40px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)`,
            letterSpacing: "0.15em",
          }}
        >
          {romanNumeral}
        </span>
      </div>

      {/* Corner sacred geometry accents */}
      <svg
        style={{ position: "absolute", top: 15, left: 15, opacity: 0.4 }}
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <path
          d="M0 0 L60 0 L60 8 L8 8 L8 60 L0 60 Z"
          fill={color2}
          opacity="0.6"
        />
        <circle cx="8" cy="8" r="3" fill={color1} opacity="0.8" />
      </svg>
      <svg
        style={{ position: "absolute", top: 15, right: 15, opacity: 0.4 }}
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <path
          d="M60 0 L0 0 L0 8 L52 8 L52 60 L60 60 Z"
          fill={color2}
          opacity="0.6"
        />
        <circle cx="52" cy="8" r="3" fill={color1} opacity="0.8" />
      </svg>

      {/* Bottom content area */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "60px 40px 40px",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        {/* Deity name */}
        <h1
          style={{
            margin: 0,
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            textShadow: `0 0 30px ${color1}80, 0 0 60px ${color1}40, 0 2px 8px rgba(0,0,0,0.9)`,
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          {config.name.toUpperCase()}
        </h1>

        {/* Deity title */}
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 26,
            fontWeight: 400,
            color: color2,
            textShadow: `0 0 15px ${color1}60, 0 1px 4px rgba(0,0,0,0.9)`,
            letterSpacing: "0.12em",
            fontStyle: "italic",
          }}
        >
          {config.title}
        </p>

        {/* Bottom row: branding + QR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 30,
          }}
        >
          {/* Sacred Circuits branding */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Sacred Circuits
            </span>
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.15em",
              }}
            >
              oracleball.ai
            </span>
          </div>

          {/* QR code */}
          <div
            style={{
              width: 130,
              height: 130,
              background: "rgba(255,255,255,0.95)",
              borderRadius: 8,
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{ width: 114, height: 114 }}
              dangerouslySetInnerHTML={{
                __html: qrSvg
                  ? qrSvg
                      .replace(/stroke="#ffffff"/g, 'stroke="#000000"')
                      .replace(/width="300"/, 'width="114"')
                      .replace(/height="300"/, 'height="114"')
                  : '<div style="width:114;height:114;background:#ccc"></div>',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color1}, ${color2}, ${color3})`,
        }}
      />
    </div>
  );
}
