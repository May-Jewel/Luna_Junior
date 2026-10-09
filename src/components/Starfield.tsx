import { useMemo } from 'react';

interface Star {
  top: string;
  left: string;
  size: number;
  delay: string;
}

export default function Starfield({ count = 70 }: { count?: number }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.4 + 1,
        delay: `${Math.random() * 4}s`,
      })),
    [count],
  );

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
