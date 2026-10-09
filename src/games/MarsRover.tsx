import { useCallback, useEffect, useState } from 'react';

const SIZE = 6;
const ENERGY_START = 16;

const MAP_ROWS = [
  'R..#..',
  '.#.#..',
  '.#...#',
  '...#..',
  '#.#...',
  '.T..T.',
];

interface Vec {
  x: number;
  y: number;
}

function parseMap() {
  const rocks: Vec[] = [];
  const targets: Vec[] = [];
  let start: Vec = { x: 0, y: 0 };
  MAP_ROWS.forEach((row, y) => {
    row.split('').forEach((ch, x) => {
      if (ch === '#') rocks.push({ x, y });
      if (ch === 'T') targets.push({ x, y });
      if (ch === 'R') start = { x, y };
    });
  });
  return { rocks, targets, start };
}

const { rocks: ROCKS, targets: TARGETS, start: START } = parseMap();

const ROCK_SET = new Set(ROCKS.map((r) => `${r.x},${r.y}`));

const keyOf = (v: Vec) => `${v.x},${v.y}`;

interface Props {
  onComplete: () => void;
  onExit: () => void;
}

export default function MarsRover({ onComplete, onExit }: Props) {
  const [rover, setRover] = useState<Vec>(START);
  const [collected, setCollected] = useState<string[]>([]);
  const [energy, setEnergy] = useState(ENERGY_START);
  const [phase, setPhase] = useState<'play' | 'win' | 'lose'>('play');
  const [log, setLog] = useState('Use the arrow keys or the on-screen pad to drive.');

  const move = useCallback(
    (dx: number, dy: number) => {
      if (phase !== 'play') return;
      const nx = rover.x + dx;
      const ny = rover.y + dy;
      const next = { x: nx, y: ny };

      if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) {
        setLog('⚠️ Edge of the mapped area — turn back to stay on course.');
        return;
      }
      if (ROCK_SET.has(keyOf(next))) {
        setLog('⚠️ A big rock blocks the way. Try another route.');
        return;
      }

      const key = keyOf(next);
      let newCollected = collected;
      if (TARGETS.some((t) => keyOf(t) === key) && !collected.includes(key)) {
        newCollected = [...collected, key];
        setCollected(newCollected);
        setLog(
          `✅ Science sample collected! ${newCollected.length}/${TARGETS.length} gathered.`,
        );
      } else {
        setLog('🧭 Rover rolling… keep an eye on the energy bar.');
      }

      const remaining = energy - 1;
      setEnergy(remaining);
      setRover(next);

      if (newCollected.length === TARGETS.length) {
        setPhase('win');
        onComplete();
      } else if (remaining <= 0) {
        setPhase('lose');
        setLog('🔋 Out of energy! The rover stopped before finishing.');
      }
    },
    [phase, rover, collected, energy, onComplete],
  );

  useEffect(() => {
    if (phase !== 'play') return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        move(d[0], d[1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, phase]);

  function restart() {
    setRover(START);
    setCollected([]);
    setEnergy(ENERGY_START);
    setPhase('play');
    setLog('Use the arrow keys or the on-screen pad to drive.');
  }

  if (phase !== 'play') {
    const win = phase === 'win';
    return (
      <div className="panel">
        <div className={`result-screen ${win ? 'success' : 'retry'}`}>
          <div className="big">{win ? '🏁' : '🔋'}</div>
          <h2>{win ? 'Both Samples Collected!' : 'The Rover Ran Out of Energy'}</h2>
          <p>
            {win
              ? 'Great driving! Your rover navigated the rocks, reached both science targets, and sent fresh data about Mars back to the team.'
              : 'Mission planning matters. Real rovers use a limited power budget each day, so every move and every drill has to count.'}
          </p>

          <div className="fact-box">
            <strong>Science fact: </strong>
            {win
              ? 'NASA\u2019s Curiosity and Perseverance rovers are nuclear-powered robot geologists. They drive a few dozen metres a day, avoid hazards using cameras and software, and study rocks to learn whether Mars once supported life.'
              : 'Perseverance runs on a radioisotope power system that must last for years. Engineers plan each day\u2019s activities carefully so the rover never gets stranded far from a safe spot.'}
          </div>

          <div className="result-actions">
            <button className="btn" onClick={restart}>
              {win ? 'Drive Again' : 'Try the Route Again'}
            </button>
            <button className="btn ghost" onClick={onExit}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const roverKey = keyOf(rover);
  const low = energy <= 5;

  return (
    <div>
      <div className="mission-brief">
        <h3>🎯 Mission: Collect Two Samples on Mars</h3>
        <p>
          Drive the rover to both blue science targets. Rocks block the way, you
          cannot leave the map, and every move uses energy — so choose a smart
          route before the battery runs out.
        </p>
      </div>

      <div className="rover-layout">
        <div className="board-wrap">
          <div className="board" role="grid" aria-label="Mars rover map">
            {Array.from({ length: SIZE * SIZE }, (_, i) => {
              const x = i % SIZE;
              const y = Math.floor(i / SIZE);
              const key = `${x},${y}`;
              let cls = 'tile';
              let content = '';
              if (roverKey === key) {
                cls += ' rover';
                content = '🤖';
              } else if (ROCK_SET.has(key)) {
                cls += ' rock';
                content = '🪨';
              } else if (
                TARGETS.some((t) => keyOf(t) === key) &&
                !collected.includes(key)
              ) {
                cls += ' target';
                content = '🔬';
              }
              return (
                <div key={key} className={cls} role="gridcell">
                  <span aria-hidden="true">{content}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rover-side">
          <div className={`energy-meter ${low ? 'low' : ''}`}>
            <div className="row">
              <span>🔋 Energy</span>
              <span>
                {energy}/{ENERGY_START}
              </span>
            </div>
            <div className="bar">
              <span style={{ width: `${(energy / ENERGY_START) * 100}%` }} />
            </div>
          </div>

          <div className="targets-left">
            <span>Samples:</span>
            {TARGETS.map((t) => (
              <span
                key={keyOf(t)}
                className={`mini-star ${collected.includes(keyOf(t)) ? 'on' : ''}`}
              >
                🔬
              </span>
            ))}
          </div>

          <div className="dpad" aria-label="Rover controls">
            <button className="up" onClick={() => move(0, -1)} aria-label="Move up">
              ▲
            </button>
            <button className="left" onClick={() => move(-1, 0)} aria-label="Move left">
              ◀
            </button>
            <span className="center" aria-hidden="true">
              🧭
            </span>
            <button className="right" onClick={() => move(1, 0)} aria-label="Move right">
              ▶
            </button>
            <button className="down" onClick={() => move(0, 1)} aria-label="Move down">
              ▼
            </button>
          </div>

          <div className="rover-log" role="status">
            {log}
          </div>
          <p className="center-note">Tip: arrow keys work too!</p>
        </div>
      </div>
    </div>
  );
}
