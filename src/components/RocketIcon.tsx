export default function RocketIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Rocket"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rNose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ee7ff" />
          <stop offset="1" stopColor="#35d4f2" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="20" ry="8" fill="#35d4f2" opacity="0.4" />
      <path d="M60 8 C74 28 82 46 82 62 L38 62 C38 46 46 28 60 8 Z" fill="url(#rNose)" />
      <rect x="38" y="60" width="44" height="46" rx="14" fill="#f6f9ff" />
      <circle cx="60" cy="80" r="10" fill="#102a6b" stroke="#35d4f2" strokeWidth="3" />
      <path d="M38 74 L22 100 L38 96 Z" fill="#2f6bff" />
      <path d="M82 74 L98 100 L82 96 Z" fill="#2f6bff" />
      <rect x="52" y="102" width="16" height="10" rx="3" fill="#9fb0d6" />
    </svg>
  );
}
