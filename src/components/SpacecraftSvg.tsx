export type PowerChoice = 'none' | 'solar' | 'battery' | 'banner';
export type ScienceChoice = 'none' | 'instrument' | 'tank' | 'snacks';
export type CommsChoice = 'none' | 'antenna' | 'megaphone' | 'flag';

interface Props {
  power: PowerChoice;
  science: ScienceChoice;
  comms: CommsChoice;
  compact?: boolean;
}

export default function SpacecraftSvg({
  power,
  science,
  comms,
  compact = false,
}: Props) {
  return (
    <svg
      viewBox="0 0 360 340"
      role="img"
      aria-label="Spacecraft with selected components"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f9ff" />
          <stop offset="1" stopColor="#b9c9f0" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#102a6b" />
        </linearGradient>
        <linearGradient id="noseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ee7ff" />
          <stop offset="1" stopColor="#35d4f2" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#35d4f2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#35d4f2" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="180" cy="300" rx="70" ry="22" fill="url(#glowGrad)" />

      {/* ---------- Communication mount (top) ---------- */}
      {comms === 'antenna' ? (
        <g>
          <line x1="180" y1="150" x2="180" y2="52" stroke="#cfe0ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M150 52 A30 26 0 0 1 210 52 Z" fill="url(#noseGrad)" stroke="#8ad6ff" strokeWidth="2" />
          <circle cx="180" cy="44" r="5" fill="#ffe07a" />
        </g>
      ) : null}
      {comms === 'megaphone' ? (
        <g>
          <rect x="172" y="96" width="16" height="54" rx="4" fill="#9fb0d6" />
          <path d="M188 96 L232 78 L232 118 L188 104 Z" fill="#ff6b7a" stroke="#ffd23f" strokeWidth="2" />
          <line x1="212" y1="88" x2="212" y2="108" stroke="#ffd23f" strokeWidth="2" />
        </g>
      ) : null}
      {comms === 'flag' ? (
        <g>
          <line x1="180" y1="150" x2="180" y2="58" stroke="#cfe0ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M182 62 L226 74 L182 88 Z" fill="#ff6b7a" stroke="#ffd23f" strokeWidth="2" />
        </g>
      ) : null}

      {/* ---------- Power (wings / body) ---------- */}
      {power === 'solar' ? (
        <g>
          <line x1="118" y1="205" x2="72" y2="205" stroke="#9fb0d6" strokeWidth="4" />
          <line x1="242" y1="205" x2="288" y2="205" stroke="#9fb0d6" strokeWidth="4" />
          <rect x="8" y="158" width="66" height="94" rx="6" fill="url(#panelGrad)" stroke="#6ee7ff" strokeWidth="2" />
          <rect x="286" y="158" width="66" height="94" rx="6" fill="url(#panelGrad)" stroke="#6ee7ff" strokeWidth="2" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <line x1="8" y1={189 + i * 24} x2="74" y2={189 + i * 24} stroke="#6ee7ff" strokeWidth="1.2" opacity="0.7" />
              <line x1="286" y1={189 + i * 24} x2="352" y2={189 + i * 24} stroke="#6ee7ff" strokeWidth="1.2" opacity="0.7" />
            </g>
          ))}
        </g>
      ) : null}
      {power === 'battery' ? (
        <g>
          <rect x="248" y="176" width="46" height="70" rx="8" fill="#3d372f" stroke="#9fb0d6" strokeWidth="2" />
          <rect x="264" y="168" width="14" height="10" rx="3" fill="#9fb0d6" />
          <rect x="255" y="196" width="32" height="14" rx="3" fill="#ffd23f" />
          <rect x="255" y="216" width="20" height="14" rx="3" fill="#42e8a8" opacity="0.7" />
        </g>
      ) : null}
      {power === 'banner' ? (
        <g>
          <line x1="248" y1="150" x2="248" y2="238" stroke="#9fb0d6" strokeWidth="4" />
          <rect x="250" y="160" width="60" height="30" rx="4" fill="#ff6b7a" stroke="#ffd23f" strokeWidth="2" />
          <rect x="250" y="198" width="60" height="30" rx="4" fill="#ffe07a" opacity="0.85" />
        </g>
      ) : null}

      {/* ---------- Nose + body ---------- */}
      <path d="M180 58 C 205 92 224 120 224 150 L136 150 C136 120 155 92 180 58 Z" fill="url(#noseGrad)" stroke="#8ad6ff" strokeWidth="2" />
      <rect x="136" y="146" width="88" height="150" rx="26" fill="url(#bodyGrad)" stroke="#8aa2d8" strokeWidth="2" />
      <circle cx="180" cy="188" r="22" fill="#102a6b" stroke="#6ee7ff" strokeWidth="3" />
      <circle cx="173" cy="181" r="7" fill="#6ee7ff" opacity="0.8" />
      <line x1="150" y1="240" x2="210" y2="240" stroke="#8aa2d8" strokeWidth="2" />

      {/* ---------- Science payload ---------- */}
      {science === 'instrument' ? (
        <g>
          <rect x="158" y="250" width="44" height="34" rx="8" fill="#172b63" stroke="#6ee7ff" strokeWidth="2" />
          <circle cx="180" cy="267" r="11" fill="#35d4f2" />
          <circle cx="180" cy="267" r="5" fill="#f6f9ff" />
          <line x1="180" y1="284" x2="180" y2="296" stroke="#6ee7ff" strokeWidth="3" />
        </g>
      ) : null}
      {science === 'tank' ? (
        <g>
          <rect x="164" y="248" width="32" height="46" rx="10" fill="#9fb0d6" stroke="#f6f9ff" strokeWidth="2" />
          <rect x="172" y="242" width="16" height="8" rx="3" fill="#5c6b93" />
          <line x1="168" y1="264" x2="192" y2="264" stroke="#5c6b93" strokeWidth="2" />
        </g>
      ) : null}
      {science === 'snacks' ? (
        <g>
          <rect x="156" y="252" width="48" height="38" rx="6" fill="#8a4f2a" stroke="#ffd23f" strokeWidth="2" />
          <circle cx="170" cy="266" r="6" fill="#e2a76f" />
          <circle cx="190" cy="266" r="6" fill="#e2a76f" />
          <circle cx="180" cy="280" r="6" fill="#e2a76f" />
        </g>
      ) : null}

      {/* engine nozzles */}
      <rect x="150" y="292" width="18" height="16" rx="4" fill="#5c6b93" />
      <rect x="192" y="292" width="18" height="16" rx="4" fill="#5c6b93" />

      {compact ? null : (
        <>
          <circle cx="60" cy="80" r="2.2" fill="#ffe07a" />
          <circle cx="300" cy="110" r="2" fill="#ffe07a" />
          <circle cx="40" cy="280" r="1.8" fill="#6ee7ff" />
          <circle cx="320" cy="260" r="2.4" fill="#6ee7ff" />
        </>
      )}
    </svg>
  );
}
