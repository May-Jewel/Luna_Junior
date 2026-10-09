import { useState } from 'react';
import SpacecraftSvg from '../components/SpacecraftSvg';
import type {
  CommsChoice,
  PowerChoice,
  ScienceChoice,
} from '../components/SpacecraftSvg';

type Phase = 'build' | 'success' | 'retry';

interface Option<T extends string> {
  id: T;
  label: string;
  emoji: string;
  desc: string;
  good: boolean;
}

const POWER: Option<Exclude<PowerChoice, 'none'>>[] = [
  {
    id: 'solar',
    label: 'Solar Panels',
    emoji: '🔆',
    desc: 'Turn sunlight into electricity for the whole mission.',
    good: true,
  },
  {
    id: 'battery',
    label: 'A Single Battery',
    emoji: '🔋',
    desc: 'Runs out of power after a few hours.',
    good: false,
  },
  {
    id: 'banner',
    label: 'Bright Banner',
    emoji: '🎏',
    desc: 'Looks fun, but it generates no power at all.',
    good: false,
  },
];

const SCIENCE: Option<Exclude<ScienceChoice, 'none'>>[] = [
  {
    id: 'instrument',
    label: 'Science Instrument',
    emoji: '🔬',
    desc: 'Measures the planet and records the data.',
    good: true,
  },
  {
    id: 'tank',
    label: 'Spare Fuel Tank',
    emoji: '🛢️',
    desc: 'Useful for flying, but it cannot study the planet.',
    good: false,
  },
  {
    id: 'snacks',
    label: 'Snack Crate',
    emoji: '🍪',
    desc: 'Tasty for the crew, but it gathers no science.',
    good: false,
  },
];

const COMMS: Option<Exclude<CommsChoice, 'none'>>[] = [
  {
    id: 'antenna',
    label: 'Communication Antenna',
    emoji: '📡',
    desc: 'Sends the science data back to Earth.',
    good: true,
  },
  {
    id: 'megaphone',
    label: 'Megaphone',
    emoji: '📣',
    desc: 'Far too quiet to reach Earth across space.',
    good: false,
  },
  {
    id: 'flag',
    label: 'Signal Flag',
    emoji: '🚩',
    desc: 'A nice marker, but nobody on Earth can see it.',
    good: false,
  },
];

interface Props {
  onComplete: () => void;
  onExit: () => void;
}

export default function SpacecraftBuilder({ onComplete, onExit }: Props) {
  const [power, setPower] = useState<PowerChoice>('none');
  const [science, setScience] = useState<ScienceChoice>('none');
  const [comms, setComms] = useState<CommsChoice>('none');
  const [phase, setPhase] = useState<Phase>('build');

  const ready = power !== 'none' && science !== 'none' && comms !== 'none';

  function launch() {
    const win = power === 'solar' && science === 'instrument' && comms === 'antenna';
    if (win) {
      setPhase('success');
      onComplete();
    } else {
      setPhase('retry');
    }
  }

  function restart() {
    setPower('none');
    setScience('none');
    setComms('none');
    setPhase('build');
  }

  if (phase !== 'build') {
    const win = phase === 'success';
    const missing: string[] = [];
    if (power !== 'solar') missing.push('solar panels for power');
    if (science !== 'instrument') missing.push('a science instrument to gather data');
    if (comms !== 'antenna') missing.push('a communication antenna to send data home');

    return (
      <div className="panel">
        <div className={`result-screen ${win ? 'success' : 'retry'}`}>
          <div className="big">{win ? '🛰️' : '🛠️'}</div>
          <h2>{win ? 'Mission Launch Successful!' : 'Mission Not Ready Yet'}</h2>
          {win ? (
            <p>
              Your spacecraft launched, studied the distant planet, and beamed
              its findings back home. Every component did its job!
            </p>
          ) : (
            <p>
              Mission Control spotted a problem before launch. Your craft still
              needs: <strong>{missing.join(', ')}</strong>. Fix the build and
              try again.
            </p>
          )}

          <div className="fact-box">
            <strong>Science fact: </strong>
            {win ? (
              <>
                Real deep-space probes like NASA&apos;s Voyager 1 rely on solar
                panels or nuclear power, a suite of instruments, and a large
                dish antenna. The antenna&#39;s signal takes hours to reach
                Earth because radio waves travel at the speed of light across
                billions of kilometres.
              </>
            ) : (
              <>
                Engineers check and re-check every subsystem before launch.
                Without power a spacecraft goes silent, without instruments it
                has nothing to study, and without an antenna its data can never
                reach Earth.
              </>
            )}
          </div>

          <div className="result-actions">
            <button className="btn" onClick={restart}>
              {win ? 'Build Another Craft' : 'Back to the Workshop'}
            </button>
            <button className="btn ghost" onClick={onExit}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mission-brief">
        <h3>🎯 Mission: Explore a Distant Planet</h3>
        <p>
          Fly to a faraway planet, study it with scientific instruments, and
          send the data back to Earth. Choose one component from each group,
          then launch when your craft is mission-ready.
        </p>
      </div>

      <div className="spacecraft-layout">
        <div className="build-stage">
          <SpacecraftSvg power={power} science={science} comms={comms} />
        </div>

        <div className="option-list">
          <p className="option-group-label">1 · Power source</p>
          {POWER.map((o) => (
            <button
              key={o.id}
              className={`option-card ${power === o.id ? 'selected' : ''}`}
              onClick={() => setPower(power === o.id ? 'none' : o.id)}
            >
              <span className="opt-emoji" aria-hidden="true">
                {o.emoji}
              </span>
              <span className="opt-text">
                <strong>{o.label}</strong>
                <span>{o.desc}</span>
              </span>
              <span className="tick" aria-hidden="true">
                ✓
              </span>
            </button>
          ))}

          <p className="option-group-label">2 · Science payload</p>
          {SCIENCE.map((o) => (
            <button
              key={o.id}
              className={`option-card ${science === o.id ? 'selected' : ''}`}
              onClick={() => setScience(science === o.id ? 'none' : o.id)}
            >
              <span className="opt-emoji" aria-hidden="true">
                {o.emoji}
              </span>
              <span className="opt-text">
                <strong>{o.label}</strong>
                <span>{o.desc}</span>
              </span>
              <span className="tick" aria-hidden="true">
                ✓
              </span>
            </button>
          ))}

          <p className="option-group-label">3 · Communication</p>
          {COMMS.map((o) => (
            <button
              key={o.id}
              className={`option-card ${comms === o.id ? 'selected' : ''}`}
              onClick={() => setComms(comms === o.id ? 'none' : o.id)}
            >
              <span className="opt-emoji" aria-hidden="true">
                {o.emoji}
              </span>
              <span className="opt-text">
                <strong>{o.label}</strong>
                <span>{o.desc}</span>
              </span>
              <span className="tick" aria-hidden="true">
                ✓
              </span>
            </button>
          ))}

          <div className={`status-line ${ready ? 'ok' : 'warn'}`} role="status">
            {ready ? '✓ All systems installed — ready to launch!' : 'Select one component from each group.'}
          </div>

          <button className="btn blue" onClick={launch} disabled={!ready} style={{ width: '100%' }}>
            🚀 Launch Mission
          </button>
        </div>
      </div>
    </div>
  );
}
