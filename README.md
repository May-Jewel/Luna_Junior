# Luna-Junior
a simple web app for students to learn and explore concepts
Here's the README content — not written to the project folder, just for you to copy:

# 🧑🚀 Junior Astronaut: Explore Space!

An educational space web app where students (ages 13–16) learn real space science
by **playing missions** and **exploring topics**, earning XP, ranks, and badges as
they go. Runs entirely in the browser — no backend, no accounts, no API keys.

## ✨ Features

### 🏠 Home — Mission Control
- Hero welcome with your current rank and XP
- **Daily Space Challenge** — a new challenge every day, deterministic by local date:
  Planet Order, Spacecraft Engineer, Mars Scientist, Cosmic Detective
- **Mission Control panel** — rank, XP progress bar, missions/topics/badges counters
- **Choose Your Mission** — quick cards for both games plus the Learn Hub
- **Achievements showcase** — all badges, earned ones unlocked
- **Space Fact of the Day** — a rotating science fact with a linked topic
- **Continue Your Journey** — resume your last topic or take a recommendation

### 🚀 Mission 1 — Build Your Spacecraft
Choose a power source, science instrument, and communication system.
Mission Control validates your build, explains what works, and shares a science fact.

### 🛰️ Mission 2 — Mars Rover Explorer
Drive a rover across a 6×6 Mars grid (arrow keys or on-screen D-pad) to reach both
science targets while avoiding rocks and managing limited energy.

### 📚 Learn Hub
- 10 topics across 5 categories (The Solar System, Rocky vs Gas, Planets & Moons, etc.)
- 7 topic quizzes with instant feedback and explanations
- Solar System Explorer with 9 celestial bodies and a planet-ordering challenge
- Search + category filters, "My Discoveries", quizzes completed, and smart recommendations
- Deep-links so challenges/facts open the exact related topic

## 🎮 Progression System
- **XP**: +10 topic discovered, +20 first quiz completion, +10 quiz improvement,
  +30 daily challenge. Repeating content can't be farmed.
- **Ranks**: Space Rookie → Planet Explorer → Junior Scientist → Galactic Expert
- **Badges**: First Launch, Mars Pathfinder, Curious Explorer, Space Learner, Planet Expert

All progress is saved in the browser via localStorage.

## 🛠️ Tech Stack
- React 18
- TypeScript 5.6 (strict)
- Vite 5
- Plain CSS (design tokens + responsive layout)
- No third-party UI, state, or backend libraries

## 📁 Project Structure
src/
  components/        # Shared UI (Home, GameShell, Starfield, icons, art)
  games/             # SpacecraftBuilder, MarsRover
  features/
    home/            # Daily challenge, panels, daily data/utils
    learn-hub/       # Learn Hub page, data, components, utils
  hooks/             # useProgress (persistence, XP, badges)
  types.ts           # Shared types + empty state constants
  styles.css         # Design tokens and all styles

## 🎯 Target Audience & Design Goals
- Ages 13–16, usable in a classroom or at home
- Short sessions (missions take ~3–5 minutes)
- Real science behind every interaction
- Accessible: keyboard controls, focus states, reduced-motion support, responsive layout
