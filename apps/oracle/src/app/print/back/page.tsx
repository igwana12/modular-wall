export default function CardBackPage() {
  const teal = "#0d9488";
  const gold = "#d4a847";
  const darkBg = "#0a0e17";

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
      {/* Sacred geometry background pattern */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        viewBox="0 0 900 1500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric circles */}
        {[200, 300, 400, 500, 600].map((r) => (
          <circle
            key={r}
            cx="450"
            cy="750"
            r={r}
            fill="none"
            stroke={teal}
            strokeWidth="0.5"
            opacity="0.15"
          />
        ))}

        {/* Hexagonal grid pattern */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 450 + Math.cos(angle) * 600;
          const y2 = 750 + Math.sin(angle) * 600;
          return (
            <line
              key={`line-${i}`}
              x1="450"
              y1="750"
              x2={x2}
              y2={y2}
              stroke={gold}
              strokeWidth="0.5"
              opacity="0.1"
            />
          );
        })}

        {/* Inner sacred geometry: Seed of Life */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 450 + Math.cos(rad) * 80;
          const cy = 750 + Math.sin(rad) * 80;
          return (
            <circle
              key={`seed-${deg}`}
              cx={cx}
              cy={cy}
              r="80"
              fill="none"
              stroke={gold}
              strokeWidth="0.8"
              opacity="0.2"
            />
          );
        })}
        <circle cx="450" cy="750" r="80" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.2" />

        {/* Outer decorative ring */}
        <circle cx="450" cy="750" r="350" fill="none" stroke={gold} strokeWidth="1" opacity="0.15" />
        <circle cx="450" cy="750" r="352" fill="none" stroke={teal} strokeWidth="0.5" opacity="0.1" />

        {/* Corner ornaments */}
        {[
          [40, 40],
          [860, 40],
          [40, 1460],
          [860, 1460],
        ].map(([cx, cy], i) => (
          <g key={`corner-${i}`}>
            <circle cx={cx} cy={cy} r="25" fill="none" stroke={gold} strokeWidth="1" opacity="0.3" />
            <circle cx={cx} cy={cy} r="15" fill="none" stroke={teal} strokeWidth="0.5" opacity="0.25" />
            <circle cx={cx} cy={cy} r="3" fill={gold} opacity="0.4" />
          </g>
        ))}

        {/* Top and bottom decorative lines */}
        <line x1="80" y1="40" x2="820" y2="40" stroke={gold} strokeWidth="0.5" opacity="0.25" />
        <line x1="80" y1="1460" x2="820" y2="1460" stroke={gold} strokeWidth="0.5" opacity="0.25" />
        <line x1="40" y1="80" x2="40" y2="1420" stroke={gold} strokeWidth="0.5" opacity="0.25" />
        <line x1="860" y1="80" x2="860" y2="1420" stroke={gold} strokeWidth="0.5" opacity="0.25" />
      </svg>

      {/* Central eye / oracle symbol */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Oracle eye symbol */}
        <svg width="180" height="100" viewBox="0 0 180 100">
          <ellipse cx="90" cy="50" rx="85" ry="45" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.5" />
          <circle cx="90" cy="50" r="25" fill="none" stroke={teal} strokeWidth="1.5" opacity="0.6" />
          <circle cx="90" cy="50" r="10" fill={gold} opacity="0.4" />
          <circle cx="90" cy="50" r="4" fill={teal} opacity="0.8" />
        </svg>

        <h1
          style={{
            margin: "30px 0 0",
            fontSize: 64,
            fontWeight: 700,
            color: gold,
            letterSpacing: "0.35em",
            textShadow: `0 0 40px ${gold}40, 0 0 80px ${teal}20`,
          }}
        >
          ORACLE
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 18,
            color: teal,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Sacred Circuits
        </p>
      </div>

      {/* URL at bottom */}
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
        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.25em",
          }}
        >
          oracleball.ai
        </span>
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
