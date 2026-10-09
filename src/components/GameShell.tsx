import { useState, type ReactNode } from 'react';

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  instructions: string[];
  reminder?: string | null;
  onExit: () => void;
  onRestart: () => void;
  children: ReactNode;
}

export default function GameShell({
  title,
  subtitle,
  icon,
  instructions,
  reminder,
  onExit,
  onRestart,
  children,
}: Props) {
  const [started, setStarted] = useState(false);

  return (
    <div className="game-page">
      <div className="game-head">
        <div>
          <h1>
            {icon} {title}
          </h1>
          <p className="sub">{subtitle}</p>
        </div>
        <div className="head-actions">
          {started ? (
            <button className="btn ghost small" onClick={onRestart}>
              ↻ Restart
            </button>
          ) : null}
          <button className="btn ghost small" onClick={onExit}>
            ← Home
          </button>
        </div>
      </div>

      {started ? (
        children
      ) : (
        <div className="panel">
          {reminder ? (
            <div className="reminder-box" role="note">
              <span aria-hidden="true">📘</span>
              <p>
                <strong>Learning reminder:</strong> {reminder}
              </p>
            </div>
          ) : null}
          <div className="instructions">
            <span className="ico" aria-hidden="true">
              🚀
            </span>
            <div>
              <h4>How to Play</h4>
              <ul>
                {instructions.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <button className="btn" onClick={() => setStarted(true)}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
