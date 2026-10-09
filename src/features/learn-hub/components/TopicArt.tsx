import type { TopicVisual } from '../types';

interface Props {
  visual: TopicVisual;
  hue: string;
  className?: string;
}

function Craters({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={color} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx={cx - r * 0.7} cy={cy - r * 0.9} r={r * 0.6} fill={color} stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.2" />
      <circle cx={cx - r * 0.7} cy={cy - r * 0.9} r={r * 0.35} fill="#000" fillOpacity="0.15" />
      <circle cx={cx + r * 0.6} cy={cy + r * 0.7} r={r * 0.4} fill="#000" fillOpacity="0.18" />
      <circle cx={cx + r * 0.8} cy={cy - r * 0.6} r={r * 0.28} fill="#000" fillOpacity="0.12" />
    </>
  );
}

export default function TopicArt({ visual, hue, className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`shade-${visual}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={`glow-${visual}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={hue} stopOpacity="0.75" />
          <stop offset="1" stopColor={hue} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="140" rx="16" fill="#071026" />
      {[
        [20, 24],
        [176, 30],
        [34, 112],
        [168, 110],
        [100, 16],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#eaf2ff" opacity="0.7" />
      ))}

      {visual === 'solar-system' && (
        <g>
          <circle cx="100" cy="70" r="46" fill={`url(#glow-${visual})`} />
          <circle cx="100" cy="70" r="18" fill={hue} />
          {[
            [100, 70, 34],
            [100, 70, 50],
            [100, 70, 66],
          ].map(([cx, cy, rx], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={rx * 0.42}
              fill="none"
              stroke="#6ee7ff"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
          ))}
          <circle cx="134" cy="70" r="4" fill="#4d8bff" />
          <circle cx="148" cy="98" r="5" fill="#e0b878" />
          <circle cx="63" cy="100" r="6" fill="#c1502e" />
        </g>
      )}

      {visual === 'orbit' && (
        <g>
          <ellipse cx="100" cy="70" rx="70" ry="30" fill="none" stroke="#6ee7ff" strokeOpacity="0.5" strokeWidth="1.5" />
          <ellipse cx="100" cy="70" rx="46" ry="20" fill="none" stroke="#6ee7ff" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="100" cy="70" r="16" fill={hue} />
          <circle cx="100" cy="70" r="16" fill={`url(#shade-${visual})`} />
          <circle cx="166" cy="70" r="8" fill="#4d8bff" />
          <path d="M158 58 l10 -3 -3 10" fill="none" stroke="#ffe07a" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {visual === 'rocky-planet' && (
        <g>
          <circle cx="100" cy="70" r="42" fill={hue} />
          <Craters cx={100} cy={70} r={42} color={hue} />
        </g>
      )}

      {visual === 'gas-giant' && (
        <g>
          <circle cx="100" cy="70" r="44" fill={hue} />
          <clipPath id={`clip-${visual}`}>
            <circle cx="100" cy="70" r="44" />
          </clipPath>
          <g clipPath={`url(#clip-${visual})`} opacity="0.55">
            <rect x="40" y="46" width="120" height="9" rx="4" fill="#ffffff" fillOpacity="0.35" />
            <rect x="40" y="64" width="120" height="12" rx="6" fill="#000000" fillOpacity="0.18" />
            <rect x="40" y="86" width="120" height="9" rx="4" fill="#ffffff" fillOpacity="0.3" />
            <ellipse cx="126" cy="78" rx="11" ry="7" fill="#b0462e" />
          </g>
        </g>
      )}

      {visual === 'icy-moon' && (
        <g>
          <circle cx="96" cy="70" r="40" fill={hue} />
          <g clipPath="url(#clip-icy)">
            <clipPath id="clip-icy">
              <circle cx="96" cy="70" r="40" />
            </clipPath>
            <path d="M56 60 L136 78 M60 92 L132 66 M70 44 L120 100" stroke="#2f6bff" strokeOpacity="0.5" strokeWidth="2" />
          </g>
          <circle cx="160" cy="40" r="22" fill="#c1502e" opacity="0.85" />
        </g>
      )}

      {visual === 'sun' && (
        <g>
          <circle cx="100" cy="70" r="54" fill={`url(#glow-${visual})`} />
          <g stroke={hue} strokeWidth="3" strokeLinecap="round" opacity="0.8">
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              const x1 = 100 + Math.cos(a) * 40;
              const y1 = 70 + Math.sin(a) * 40;
              const x2 = 100 + Math.cos(a) * 52;
              const y2 = 70 + Math.sin(a) * 52;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          <circle cx="100" cy="70" r="38" fill={hue} />
          <circle cx="100" cy="70" r="38" fill={`url(#shade-${visual})`} />
        </g>
      )}

      {visual === 'aurora' && (
        <g>
          <path d="M10 110 Q60 40 110 80 T190 50" fill="none" stroke="#42e8a8" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
          <path d="M10 122 Q70 60 120 96 T190 72" fill="none" stroke="#6ee7ff" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
          <circle cx="150" cy="34" r="14" fill="#ffd23f" opacity="0.85" />
          <path d="M10 132 H190" stroke="#1b2b57" strokeWidth="4" />
        </g>
      )}

      {visual === 'mars' && (
        <g>
          <circle cx="100" cy="72" r="46" fill={hue} />
          <Craters cx={100} cy={72} r={46} color={hue} />
          <rect x="70" y="112" width="60" height="10" rx="4" fill="#5c5348" />
          <rect x="86" y="102" width="28" height="10" rx="3" fill="#f6f9ff" />
          <line x1="100" y1="102" x2="100" y2="92" stroke="#cfe0ff" strokeWidth="2" />
          <circle cx="100" cy="90" r="4" fill="#35d4f2" />
        </g>
      )}

      {visual === 'mars-rock' && (
        <g>
          <rect x="40" y="44" width="120" height="26" rx="6" fill="#d98a5f" />
          <rect x="40" y="72" width="120" height="22" rx="6" fill="#b86b3f" />
          <rect x="40" y="96" width="120" height="20" rx="6" fill="#8c4f2c" />
          <circle cx="100" cy="72" r="30" fill="none" stroke="#6ee7ff" strokeWidth="3" opacity="0.75" />
          <line x1="122" y1="94" x2="150" y2="122" stroke="#6ee7ff" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {visual === 'solar-panel' && (
        <g>
          <circle cx="34" cy="34" r="16" fill="#ffd23f" />
          <g stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round">
            <line x1="34" y1="8" x2="34" y2="16" />
            <line x1="34" y1="52" x2="34" y2="60" />
            <line x1="8" y1="34" x2="16" y2="34" />
            <line x1="52" y1="34" x2="60" y2="34" />
          </g>
          <rect x="70" y="46" width="100" height="60" rx="6" fill="#1b3a8c" stroke={hue} strokeWidth="2" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1="70" y1={61 + i * 15} x2="170" y2={61 + i * 15} stroke={hue} strokeWidth="1.4" opacity="0.8" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={95 + i * 20} y1="46" x2={95 + i * 20} y2="106" stroke={hue} strokeWidth="1.4" opacity="0.8" />
          ))}
          <path d="M150 30 L120 46" stroke="#6ee7ff" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      )}

      {visual === 'satellite' && (
        <g>
          <rect x="82" y="54" width="36" height="34" rx="6" fill="#cfe0ff" />
          <rect x="34" y="60" width="40" height="22" rx="4" fill="#2f6bff" stroke="#6ee7ff" strokeWidth="1.5" />
          <rect x="126" y="60" width="40" height="22" rx="4" fill="#2f6bff" stroke="#6ee7ff" strokeWidth="1.5" />
          <line x1="74" y1="71" x2="82" y2="71" stroke="#9fb0d6" strokeWidth="2" />
          <line x1="118" y1="71" x2="126" y2="71" stroke="#9fb0d6" strokeWidth="2" />
          <path d="M100 54 L100 34" stroke="#9fb0d6" strokeWidth="2" />
          <path d="M84 34 A16 10 0 0 1 116 34 Z" fill="#35d4f2" />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${100 + i * 8} 22 a${20 + i * 10} ${14 + i * 8} 0 0 1 0 ${-(14 + i * 8)}`}
              fill="none"
              stroke="#6ee7ff"
              strokeWidth="2"
              opacity={0.7 - i * 0.2}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
