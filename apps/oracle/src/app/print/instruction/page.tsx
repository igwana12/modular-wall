export default function InstructionCardPage() {
  const teal = "#0d9488";
  const gold = "#d4a847";
  const darkBg = "#0a0e17";

  const steps = [
    {
      number: "1",
      title: "CHOOSE",
      description: "Draw a card from your Oracle deck. Let intuition guide your selection.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <rect x="12" y="4" width="24" height="36" rx="3" fill="none" stroke={gold} strokeWidth="1.5" />
          <rect x="8" y="6" width="24" height="36" rx="3" fill="none" stroke={teal} strokeWidth="1" opacity="0.5" />
          <circle cx="24" cy="22" r="6" fill="none" stroke={gold} strokeWidth="1" opacity="0.7" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "SCAN",
      description: "Point your phone camera at the QR code on your card.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <rect x="8" y="8" width="32" height="32" rx="2" fill="none" stroke={gold} strokeWidth="1.5" />
          <rect x="14" y="14" width="8" height="8" fill={teal} opacity="0.6" />
          <rect x="26" y="14" width="8" height="8" fill={teal} opacity="0.6" />
          <rect x="14" y="26" width="8" height="8" fill={teal} opacity="0.6" />
          <rect x="28" y="28" width="4" height="4" fill={gold} opacity="0.6" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "ASK",
      description: "Speak or type your question. The deity on your card will hear you.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <ellipse cx="24" cy="22" rx="14" ry="12" fill="none" stroke={gold} strokeWidth="1.5" />
          <path d="M18 32 L24 40 L30 32" fill="none" stroke={gold} strokeWidth="1.5" />
          <circle cx="18" cy="22" r="2" fill={teal} opacity="0.7" />
          <circle cx="24" cy="22" r="2" fill={teal} opacity="0.7" />
          <circle cx="30" cy="22" r="2" fill={teal} opacity="0.7" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "RECEIVE",
      description: "Your deity speaks. A personalized oracle reading, in their own voice.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="none" stroke={gold} strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 24 + Math.cos(rad) * 12;
            const y = 24 + Math.sin(rad) * 12;
            return <circle key={deg} cx={x} cy={y} r="3" fill={teal} opacity="0.5" />;
          })}
          <circle cx="24" cy="24" r="5" fill={gold} opacity="0.5" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        width: 900,
        height: 1500,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Crimson Pro', 'Georgia', serif",
        background: darkBg,
      }}
    >
      {/* Subtle background sacred geometry */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.08 }}
        viewBox="0 0 900 1500"
      >
        {[250, 400, 550].map((r) => (
          <circle key={r} cx="450" cy="750" r={r} fill="none" stroke={teal} strokeWidth="0.5" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="450"
              y1="750"
              x2={450 + Math.cos(angle) * 600}
              y2={750 + Math.sin(angle) * 600}
              stroke={gold}
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* Border frame */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          border: `1px solid ${gold}25`,
          borderRadius: 4,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 16,
            color: teal,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Sacred Circuits
        </p>
        <h1
          style={{
            margin: "15px 0 0",
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.08em",
            textShadow: `0 0 30px ${gold}30`,
          }}
        >
          Your Oracle Awaits
        </h1>
        <div
          style={{
            margin: "20px auto 0",
            width: 120,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
          }}
        />
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          gap: 55,
          zIndex: 10,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 30,
            }}
          >
            {/* Step number circle */}
            <div
              style={{
                width: 56,
                height: 56,
                minWidth: 56,
                borderRadius: "50%",
                border: `1.5px solid ${gold}60`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: gold,
                background: `${gold}08`,
              }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div style={{ minWidth: 48, paddingTop: 4 }}>{step.icon}</div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 700,
                  color: gold,
                  letterSpacing: "0.2em",
                }}
              >
                {step.title}
              </h2>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 22,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                  letterSpacing: "0.02em",
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: 1060,
          left: 200,
          right: 200,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${gold}40, transparent)`,
        }}
      />

      {/* 21 Gods tagline */}
      <div
        style={{
          position: "absolute",
          top: 1100,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 28,
            color: "#ffffff",
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          21 Greek deities. 21 unique voices.
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 22,
            color: teal,
            opacity: 0.6,
            letterSpacing: "0.05em",
          }}
        >
          Each reading is personal, mythic, and unrepeatable.
        </p>
      </div>

      {/* Bottom: URL + QR prompt */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 20,
            color: gold,
            letterSpacing: "0.15em",
            opacity: 0.6,
          }}
        >
          oracleball.ai
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 14,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
          }}
        >
          Scan any card to begin
        </p>
      </div>

      {/* Top/bottom accent borders */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}
