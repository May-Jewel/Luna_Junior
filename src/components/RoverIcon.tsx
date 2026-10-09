export default function RoverIcon() {
  return (
    <svg
      viewBox="0 0 140 120"
      role="img"
      aria-label="Mars rover"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* mast */}
      <line x1="70" y1="42" x2="70" y2="20" stroke="#9fb0d6" strokeWidth="4" />
      <circle cx="70" cy="16" r="9" fill="#35d4f2" stroke="#6ee7ff" strokeWidth="2" />
      <circle cx="70" cy="16" r="3" fill="#f6f9ff" />
      {/* body */}
      <rect x="34" y="40" width="72" height="34" rx="10" fill="#f6f9ff" />
      <rect x="44" y="48" width="34" height="14" rx="4" fill="#172b63" />
      <rect x="84" y="48" width="14" height="14" rx="4" fill="#ffd23f" />
      {/* wheels */}
      <circle cx="46" cy="88" r="16" fill="#3d372f" stroke="#9fb0d6" strokeWidth="3" />
      <circle cx="94" cy="88" r="16" fill="#3d372f" stroke="#9fb0d6" strokeWidth="3" />
      <circle cx="46" cy="88" r="5" fill="#9fb0d6" />
      <circle cx="94" cy="88" r="5" fill="#9fb0d6" />
      {/* ground */}
      <rect x="14" y="104" width="112" height="8" rx="4" fill="#8a4f2a" />
    </svg>
  );
}
