export default function HeroArt() {
  return (
    <svg
      viewBox="0 0 420 380"
      role="img"
      aria-label="A spacecraft flying past planets and stars"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="planetA" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#6ee7ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </radialGradient>
        <radialGradient id="planetB" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffe07a" />
          <stop offset="1" stopColor="#e0912f" />
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9fb0d6" />
          <stop offset="1" stopColor="#f6f9ff" />
        </linearGradient>
        <linearGradient id="shipBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f9ff" />
          <stop offset="1" stopColor="#b9c9f0" />
        </linearGradient>
        <linearGradient id="shipNose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ee7ff" />
          <stop offset="1" stopColor="#35d4f2" />
        </linearGradient>
      </defs>

      {/* stars */}
      {[
        [30, 40, 2.4],
        [90, 20, 1.6],
        [360, 60, 2.2],
        [390, 150, 1.8],
        [40, 300, 2],
        [120, 340, 1.6],
        [300, 30, 2.6],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#f6f9ff" opacity="0.85" />
      ))}

      {/* ringed planet */}
      <g transform="translate(320 300)">
        <circle r="58" fill="url(#planetB)" />
        <ellipse
          cx="0"
          cy="4"
          rx="96"
          ry="22"
          fill="none"
          stroke="url(#ring)"
          strokeWidth="7"
          opacity="0.85"
        />
      </g>

      {/* blue planet */}
      <g transform="translate(70 110)">
        <circle r="72" fill="url(#planetA)" />
        <circle cx="-22" cy="-26" r="12" fill="#f6f9ff" opacity="0.25" />
        <circle cx="20" cy="18" r="16" fill="#102a6b" opacity="0.25" />
      </g>

      {/* spacecraft */}
      <g transform="translate(210 150) rotate(18)">
        {[-1, 1].map((side) => (
          <g key={side}>
            <rect
              x={side === -1 ? -96 : 44}
              y="8"
              width="52"
              height="72"
              rx="6"
              fill="#2f6bff"
              stroke="#6ee7ff"
              strokeWidth="2"
            />
            <line
              x1={side === -1 ? -96 : 44}
              y1="32"
              x2={side === -1 ? -44 : 96}
              y2="32"
              stroke="#6ee7ff"
              strokeWidth="1.2"
            />
            <line
              x1={side === -1 ? -96 : 44}
              y1="56"
              x2={side === -1 ? -44 : 96}
              y2="56"
              stroke="#6ee7ff"
              strokeWidth="1.2"
            />
            <line
              x1={side === -1 ? -44 : 44}
              y1="44"
              x2={side === -1 ? -20 : 20}
              y2="44"
              stroke="#9fb0d6"
              strokeWidth="4"
            />
          </g>
        ))}
        <path
          d="M0 -70 C 18 -40 34 -18 34 6 L-34 6 C-34 -18 -18 -40 0 -70 Z"
          fill="url(#shipNose)"
        />
        <rect
          x="-34"
          y="-6"
          width="68"
          height="96"
          rx="20"
          fill="url(#shipBody)"
        />
        <circle cx="0" cy="26" r="16" fill="#102a6b" stroke="#6ee7ff" strokeWidth="3" />
        <circle cx="-5" cy="21" r="5" fill="#6ee7ff" opacity="0.8" />
        <ellipse cx="0" cy="98" rx="30" ry="12" fill="#35d4f2" opacity="0.5" />
      </g>
    </svg>
  );
}
