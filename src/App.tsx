import { useState } from 'react';
import Starfield from './components/Starfield';
import Home from './components/Home';
import GameShell from './components/GameShell';
import SpacecraftBuilder from './games/SpacecraftBuilder';
import MarsRover from './games/MarsRover';
import LearnHub from './features/learn-hub/LearnHub';
import { useProgress } from './hooks/useProgress';
import type { GameId, Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [gameKey, setGameKey] = useState(0);
  const [missionReminder, setMissionReminder] = useState<string | null>(null);
  const [learnTopic, setLearnTopic] = useState<string | null>(null);
  const [learnKey, setLearnKey] = useState(0);
  const {
    progress,
    learn,
    dailyCompletedToday,
    complete,
    reset,
    resetLearn,
    discoverTopic,
    toggleSave,
    recordQuiz,
    recordDailyChallenge,
    completedCount,
  } = useProgress();

  const openGame = (game: GameId, reminder: string | null = null) => {
    setGameKey((k) => k + 1);
    setMissionReminder(reminder);
    setScreen(game);
  };

  const openLearn = (topicId?: string) => {
    setLearnTopic(topicId ?? null);
    setLearnKey((k) => k + 1);
    setScreen('learn');
  };

  const goHome = () => setScreen('home');
  const restart = () => setGameKey((k) => k + 1);

  return (
    <div className="app-shell">
      <Starfield />

      <header className="topbar container">
        <div className="brand">
          <button onClick={goHome} aria-label="Go to home">
            <span className="brand-badge" aria-hidden="true">
              🧑‍🚀
            </span>
            Junior Astronaut
          </button>
        </div>
        <nav className="topnav" aria-label="Main navigation">
          <button
            className={`nav-link ${screen === 'home' ? 'active' : ''}`}
            onClick={goHome}
          >
            Home
          </button>
          <button
            className={`nav-link ${screen === 'learn' ? 'active' : ''}`}
            onClick={() => openLearn()}
          >
            Learn Hub
          </button>
        </nav>
        <span className="pill">{completedCount}/2 missions complete</span>
      </header>

      <main className="container">
        {screen === 'home' ? (
          <Home
            progress={progress}
            learn={learn}
            completedCount={completedCount}
            dailyCompletedToday={dailyCompletedToday}
            onOpenGame={openGame}
            onOpenLearn={openLearn}
            onDailyReward={recordDailyChallenge}
            onReset={reset}
          />
        ) : null}

        {screen === 'learn' ? (
          <LearnHub
            key={`learn-${learnKey}`}
            learn={learn}
            progress={progress}
            onOpenGame={openGame}
            onDiscover={discoverTopic}
            onToggleSave={toggleSave}
            onRecordQuiz={recordQuiz}
            onResetLearn={resetLearn}
            initialTopicId={learnTopic}
          />
        ) : null}

        {screen === 'spacecraft' ? (
          <GameShell
            key={`sc-${gameKey}`}
            title="Build Your Spacecraft"
            subtitle="Mission 1 · Design a probe for a distant planet"
            icon="🛠️"
            reminder={missionReminder}
            instructions={[
              'Read the mission brief: explore a distant planet and send data back to Earth.',
              'Pick ONE component from each of the three groups: power, science, and communication.',
              'Watch the spacecraft update as you choose. Tapping a selected part removes it.',
              'When all three are installed, press Launch Mission. Mission Control will check your build!',
            ]}
            onExit={goHome}
            onRestart={restart}
          >
            <SpacecraftBuilder onComplete={() => complete('spacecraft')} onExit={goHome} />
          </GameShell>
        ) : null}

        {screen === 'rover' ? (
          <GameShell
            key={`rv-${gameKey}`}
            title="Mars Rover Explorer"
            subtitle="Mission 2 · Navigate a 6×6 grid of Mars"
            icon="🤖"
            reminder={missionReminder}
            instructions={[
              'Drive the rover to BOTH blue science targets on the map.',
              'Move with the arrow keys on your keyboard or the on-screen direction pad.',
              'Gray rocks block your path and you cannot drive off the map.',
              'Every move uses 1 energy. Plan a smart route before the battery runs out!',
            ]}
            onExit={goHome}
            onRestart={restart}
          >
            <MarsRover onComplete={() => complete('rover')} onExit={goHome} />
          </GameShell>
        ) : null}
      </main>

      <footer className="footer container">
        Junior Astronaut: Explore Space! · An educational space game · Progress is
        saved on this device.
      </footer>
    </div>
  );
}
