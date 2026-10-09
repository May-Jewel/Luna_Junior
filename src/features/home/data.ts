import type { Difficulty } from './types';

export interface SpaceFact {
  id: string;
  fact: string;
  explanation: string;
  topicId: string;
}

export interface ChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DailyChallengeDef {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  minutes: number;
  xp: number;
  kind: 'order' | 'choice';
  questions?: ChallengeQuestion[];
  relatedTopicId?: string;
}

export const SPACE_FACTS: SpaceFact[] = [
  {
    id: 'venus-day',
    fact: 'Venus takes longer to rotate once on its axis than it takes to orbit the Sun.',
    explanation:
      'Venus spins backwards and so slowly that a single Venus day lasts about 243 Earth days \u2014 longer than its 225-day year.',
    topicId: 'rocky-vs-gas',
  },
  {
    id: 'sunlight',
    fact: 'Sunlight takes about 8 minutes and 20 seconds to reach Earth.',
    explanation:
      'Light travels at 300,000 km per second, so even at that speed it needs over 8 minutes to cross the 150 million km between the Sun and Earth.',
    topicId: 'sun-star',
  },
  {
    id: 'europa-water',
    fact: 'Jupiter\u2019s moon Europa may hold more water than all of Earth\u2019s oceans.',
    explanation:
      'Beneath Europa\u2019s icy shell scientists expect a salty global ocean, kept liquid by tidal heating from Jupiter\u2019s gravity.',
    topicId: 'ocean-moons',
  },
  {
    id: 'olympus-mons',
    fact: 'Mars is home to Olympus Mons, the tallest volcano in the Solar System.',
    explanation:
      'It rises about 22 km \u2014 roughly two and a half times the height of Mount Everest \u2014 because Mars has no plate tectonics to spread the lava out.',
    topicId: 'why-mars',
  },
  {
    id: 'solar-mass',
    fact: 'The Sun contains about 99.8% of all the mass in the Solar System.',
    explanation:
      'Everything else \u2014 all eight planets, moons, asteroids and comets \u2014 adds up to only about 0.2% of the total mass.',
    topicId: 'solar-system-formed',
  },
  {
    id: 'jupiter-earth',
    fact: 'About 1,300 Earths could fit inside Jupiter.',
    explanation:
      'Jupiter is the largest planet, with a diameter more than 11 times wider than Earth\u2019s and a mass over 300 times greater.',
    topicId: 'rocky-vs-gas',
  },
  {
    id: 'iss-orbit',
    fact: 'The International Space Station orbits Earth about every 90 minutes.',
    explanation:
      'Travelling at roughly 28,000 km/h, the ISS and its crew circle the planet around 16 times every day.',
    topicId: 'gravity-orbits',
  },
  {
    id: 'voyager-signal',
    fact: 'By the time Voyager 1\u2019s signal reaches Earth, it is billions of times fainter than a watch battery.',
    explanation:
      'The spacecraft is so far away that NASA\u2019s Deep Space Network needs huge 70-metre dishes to detect its very weak radio signal.',
    topicId: 'deep-space-comms',
  },
];

export const DAILY_CHALLENGES: DailyChallengeDef[] = [
  {
    id: 'planet-order',
    title: 'Planet Order',
    description:
      'Arrange the eight planets in the correct order, starting from the one closest to the Sun.',
    difficulty: 'Easy',
    minutes: 3,
    xp: 30,
    kind: 'order',
    relatedTopicId: 'rocky-vs-gas',
  },
  {
    id: 'spacecraft-engineer',
    title: 'Spacecraft Engineer',
    description:
      'Show what you know about the parts every science spacecraft needs to survive and send data home.',
    difficulty: 'Easy',
    minutes: 3,
    xp: 30,
    kind: 'choice',
    relatedTopicId: 'solar-panels',
    questions: [
      {
        id: 'se1',
        question: 'Which part turns sunlight into electricity for a spacecraft?',
        options: ['Solar panels', 'A flag', 'A megaphone'],
        correctIndex: 0,
        explanation:
          'Solar panels use the photovoltaic effect to convert sunlight into electrical power for the spacecraft.',
      },
      {
        id: 'se2',
        question: 'What does a science spacecraft need to send its data back to Earth?',
        options: ['A bigger engine', 'A communication antenna', 'More fuel'],
        correctIndex: 1,
        explanation:
          'A communication antenna aims radio signals at Earth so the mission\u2019s science data can be received.',
      },
      {
        id: 'se3',
        question: 'Why does a probe carry a science instrument?',
        options: [
          'To measure and study the target world',
          'To make it look nicer',
          'To help it fly faster',
        ],
        correctIndex: 0,
        explanation:
          'Instruments such as cameras and spectrometers are how a spacecraft actually gathers scientific measurements.',
      },
    ],
  },
  {
    id: 'mars-scientist',
    title: 'Mars Scientist',
    description:
      'Answer questions about the surface of Mars and how robot explorers study it.',
    difficulty: 'Medium',
    minutes: 4,
    xp: 30,
    kind: 'choice',
    relatedTopicId: 'why-mars',
    questions: [
      {
        id: 'ms1',
        question: 'What is a "sol" on Mars?',
        options: ['A Martian day', 'A rover wheel', 'A type of storm'],
        correctIndex: 0,
        explanation:
          'A sol is one day on Mars, about 24 hours and 37 minutes \u2014 slightly longer than an Earth day.',
      },
      {
        id: 'ms2',
        question: 'Why do rovers drive only a short distance each sol?',
        options: [
          'To conserve power and stay safe',
          'Because they are too heavy to move',
          'Because Mars has no sunlight',
        ],
        correctIndex: 0,
        explanation:
          'Rovers have a limited power budget and must avoid hazards, so engineers plan small, careful drives.',
      },
      {
        id: 'ms3',
        question: 'What can sedimentary rocks on Mars tell scientists?',
        options: [
          'Whether water once flowed there',
          'The rover\u2019s top speed',
          'How big the Sun is',
        ],
        correctIndex: 0,
        explanation:
          'Sedimentary rocks often form in water, so finding them is strong evidence that ancient Mars had liquid water.',
      },
    ],
  },
  {
    id: 'cosmic-detective',
    title: 'Cosmic Detective',
    description:
      'Use scientific clues to work out which planet is being described. Think like an astronomer!',
    difficulty: 'Challenging',
    minutes: 4,
    xp: 30,
    kind: 'choice',
    relatedTopicId: 'rocky-vs-gas',
    questions: [
      {
        id: 'cd1',
        question:
          'Clue: I am the hottest planet, wrapped in thick carbon-dioxide clouds. Which planet am I?',
        options: ['Venus', 'Mercury', 'Mars'],
        correctIndex: 0,
        explanation:
          'Venus traps heat in a runaway greenhouse effect, making it hotter than Mercury even though Mercury is closer to the Sun.',
      },
      {
        id: 'cd2',
        question:
          'Clue: I am the largest planet and have a giant storm called the Great Red Spot. Who am I?',
        options: ['Saturn', 'Jupiter', 'Neptune'],
        correctIndex: 1,
        explanation:
          'Jupiter is the biggest planet, and its Great Red Spot is a storm wider than the entire Earth.',
      },
      {
        id: 'cd3',
        question:
          'Clue: I spin on my side, so I roll around the Sun like a ball. Which planet am I?',
        options: ['Uranus', 'Earth', 'Saturn'],
        correctIndex: 0,
        explanation:
          'Uranus is tilted about 98 degrees, so it appears to spin on its side as it orbits the Sun.',
      },
    ],
  },
];
