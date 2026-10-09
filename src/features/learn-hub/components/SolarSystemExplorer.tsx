import { useMemo, useState } from 'react';
import { ORDER_PLANETS, PLANETS } from '../data/planets';
import type { Planet } from '../types';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function SolarSystemExplorer() {
  const [selectedId, setSelectedId] = useState('earth');
  const [mode, setMode] = useState<'explore' | 'challenge'>('explore');
  const [pool, setPool] = useState<Planet[]>(ORDER_PLANETS);
  const [placed, setPlaced] = useState<string[]>([]);
  const [wrongId, setWrongId] = useState<string | null>(null);

  const selected = useMemo(
    () => PLANETS.find((p) => p.id === selectedId) ?? PLANETS[0],
    [selectedId],
  );
  const selectedIndex = PLANETS.findIndex((p) => p.id === selected.id);

  function step(delta: number) {
    const next = (selectedIndex + delta + PLANETS.length) % PLANETS.length;
    setSelectedId(PLANETS[next].id);
  }

  function startChallenge() {
    setPool(shuffle(ORDER_PLANETS));
    setPlaced([]);
    setWrongId(null);
    setMode('challenge');
  }

  function pick(planet: Planet) {
    if (placed.includes(planet.id)) return;
    if (planet.order === placed.length + 1) {
      setPlaced((prev) => [...prev, planet.id]);
    } else {
      setWrongId(planet.id);
      window.setTimeout(() => setWrongId(null), 600);
    }
  }

  const challengeDone = placed.length === ORDER_PLANETS.length;

  return (
    <div className="explorer">
      <div className="explorer-head">
        <div>
          <h2>Interactive Solar System</h2>
          <p className="center-note" style={{ textAlign: 'left' }}>
            Simplified and <strong>not to scale</strong> — sizes and distances are
            shown for clarity, not accuracy.
          </p>
        </div>
        {mode === 'explore' ? (
          <button className="btn ghost small" onClick={startChallenge}>
            🎯 Planet Order Challenge
          </button>
        ) : (
          <button className="btn ghost small" onClick={() => setMode('explore')}>
            ← Back to Explorer
          </button>
        )}
      </div>

      {mode === 'explore' ? (
        <>
          <div className="orbit-strip" role="tablist" aria-label="Planets">
            {PLANETS.map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={p.id === selected.id}
                className={`orbit-body ${p.id === selected.id ? 'active' : ''}`}
                onClick={() => setSelectedId(p.id)}
              >
                <span
                  className="orbit-dot"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                  }}
                />
                <span className="orbit-label">{p.name}</span>
              </button>
            ))}
          </div>

          <div className="planet-detail">
            <div
              className="planet-detail-art"
              style={{ background: selected.color }}
              aria-hidden="true"
            >
              <span style={{ width: selected.size + 40, height: selected.size + 40 }} />
            </div>
            <div className="planet-detail-copy">
              <div className="planet-detail-top">
                <h3>
                  {selected.order === 0 ? '☀️' : '🪐'} {selected.name}
                </h3>
                <span className="tag">{selected.classification}</span>
              </div>
              <dl className="planet-stats">
                <div>
                  <dt>Approx. diameter</dt>
                  <dd>{selected.diameterKm.toLocaleString('en-US')} km</dd>
                </div>
                <div>
                  <dt>Orbital period</dt>
                  <dd>{selected.orbitalPeriod}</dd>
                </div>
              </dl>
              <p>{selected.fact}</p>
              <div className="planet-nav">
                <button className="btn ghost small" onClick={() => step(-1)}>
                  ← Previous
                </button>
                <span className="planet-nav-index">
                  {selectedIndex + 1} / {PLANETS.length}
                </span>
                <button className="btn ghost small" onClick={() => step(1)}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="challenge">
          <p>
            Click the planets in order, starting from the one closest to the Sun.
          </p>
          <div className="challenge-chips">
            {pool.map((p) => {
              const order = placed.indexOf(p.id);
              return (
                <button
                  key={p.id}
                  className={`challenge-chip ${order >= 0 ? 'done' : ''} ${
                    wrongId === p.id ? 'wrong' : ''
                  }`}
                  onClick={() => pick(p)}
                  disabled={order >= 0}
                >
                  <span
                    className="orbit-dot"
                    style={{ width: 18, height: 18, background: p.color }}
                  />
                  {order >= 0 ? `${order + 1}. ` : ''}
                  {p.name}
                </button>
              );
            })}
          </div>
          {challengeDone ? (
            <div className="challenge-result">
              <strong>🎉 Perfect order!</strong> You lined up all eight planets
              from Mercury out to Neptune. Press the button to shuffle and try
              again.
            </div>
          ) : (
            <p className="center-note">
              {placed.length === 0
                ? 'Waiting for your first pick…'
                : `Correct so far: ${placed.length} of ${ORDER_PLANETS.length}`}
            </p>
          )}
          <button className="btn small" onClick={startChallenge}>
            ↻ Shuffle &amp; Restart
          </button>
        </div>
      )}
    </div>
  );
}
