import type { Category, Topic } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'solar-system',
    name: 'Solar System',
    icon: '🪐',
    blurb: 'How our neighbourhood in space formed and moves.',
  },
  {
    id: 'planets-moons',
    name: 'Planets and Moons',
    icon: '🌍',
    blurb: 'Rocky worlds, giant planets and icy ocean moons.',
  },
  {
    id: 'sun-weather',
    name: 'The Sun and Space Weather',
    icon: '☀️',
    blurb: 'Our star, solar storms and glowing auroras.',
  },
  {
    id: 'mars',
    name: 'Mars Exploration',
    icon: '🔴',
    blurb: 'Why we explore Mars and what its rocks tell us.',
  },
  {
    id: 'spacecraft',
    name: 'Spacecraft and Satellites',
    icon: '🛰️',
    blurb: 'Power, instruments and talking to Earth from space.',
  },
];

export const TOPICS: Topic[] = [
  {
    id: 'solar-system-formed',
    title: 'How the Solar System Formed',
    category: 'solar-system',
    visual: 'solar-system',
    hue: '#4d8bff',
    summary:
      'About 4.6 billion years ago, a giant cloud of gas and dust collapsed under gravity. Most of it formed the Sun, and the leftover material spun into a disc that became the planets.',
    facts: [
      'The Sun contains about 99.8% of all the mass in the Solar System.',
      'The oldest Solar System solids, found in meteorites, are dated to about 4.567 billion years.',
      'Planets grew by accretion: dust stuck into pebbles, then boulders, then larger "planetesimals".',
    ],
    didYouKnow:
      'Jupiter\u2019s strong gravity may have stopped some material from forming a planet between Mars and Jupiter, leaving the asteroid belt behind.',
    whyItMatters:
      'Knowing how our Solar System formed explains why the inner planets are rocky while the outer planets are gas and ice giants \u2014 and helps us understand the thousands of planetary systems we now find around other stars.',
    relatedTopicId: 'gravity-orbits',
    quiz: [
      {
        id: 'ssf1',
        question: 'What did most of the collapsing cloud of gas and dust become?',
        options: ['The planet Jupiter', 'The Sun', 'The asteroid belt'],
        correctIndex: 1,
        explanation:
          'The Sun captured the vast majority of the material, while the small remaining disc of material formed the planets.',
      },
      {
        id: 'ssf2',
        question: 'Roughly how old is the Solar System?',
        options: ['4.6 million years', '4.6 billion years', '460 million years'],
        correctIndex: 1,
        explanation:
          'Meteorite dating gives an age of about 4.567 billion years \u2014 so roughly 4.6 billion years.',
      },
    ],
  },
  {
    id: 'gravity-orbits',
    title: 'Gravity and Orbits',
    category: 'solar-system',
    visual: 'orbit',
    hue: '#6ee7ff',
    summary:
      'Gravity keeps the planets circling the Sun. An orbit is really a balance: a planet moves sideways fast enough that, as it falls toward the Sun, it keeps missing it.',
    facts: [
      'Planets follow slightly stretched circles called ellipses, not perfect circles.',
      'The farther a planet is from the Sun, the slower it travels and the longer its year.',
      'Astronauts on the ISS feel weightless because they are in constant free fall around Earth \u2014 gravity is still pulling them.',
    ],
    didYouKnow:
      'The International Space Station races around Earth at about 28,000 km/h and completes an orbit roughly every 90 minutes.',
    whyItMatters:
      'Engineers use orbital mechanics to place satellites, plan communication links and slingshot spacecraft toward other planets using gravity assists.',
    relatedTopicId: 'solar-system-formed',
    quiz: [
      {
        id: 'orb1',
        question: 'Why do astronauts on the ISS float?',
        options: [
          'There is no gravity in space',
          'They are in constant free fall around Earth',
          'Their suits cancel gravity',
        ],
        correctIndex: 1,
        explanation:
          'The station and everyone in it are continually falling toward Earth while also moving sideways \u2014 so they fall around it instead of into it.',
      },
      {
        id: 'orb2',
        question: 'Which planet takes the longest to orbit the Sun?',
        options: ['Mars', 'Jupiter', 'Neptune'],
        correctIndex: 2,
        explanation:
          'Neptune is the farthest planet, so it has the longest journey to travel and the slowest orbital speed.',
      },
    ],
  },
  {
    id: 'rocky-vs-gas',
    title: 'Rocky Worlds and Gas Giants',
    category: 'planets-moons',
    visual: 'gas-giant',
    hue: '#e0b878',
    summary:
      'The eight planets fall into two families. The inner four \u2014 Mercury, Venus, Earth and Mars \u2014 are small and rocky. The outer four are giants: the gas giants Jupiter and Saturn, and the ice giants Uranus and Neptune.',
    facts: [
      'Jupiter is so big that about 1,300 Earths could fit inside it.',
      'Saturn\u2019s rings are made mostly of water ice, from tiny grains to house-sized chunks.',
      'A single day on Venus lasts longer than its entire year.',
    ],
    didYouKnow:
      'Uranus and Neptune contain ices such as water, ammonia and methane. Methane absorbs red light, which is why both planets look blue.',
    whyItMatters:
      'Comparing the planets shows how size, distance and atmosphere shape a world, and helps scientists judge which distant planets might be habitable.',
    relatedTopicId: 'ocean-moons',
    quiz: [
      {
        id: 'rvg1',
        question: 'Which of these is a gas giant?',
        options: ['Earth', 'Jupiter', 'Mercury'],
        correctIndex: 1,
        explanation:
          'Jupiter is the largest gas giant, made mostly of hydrogen and helium. Earth and Mercury are rocky terrestrial planets.',
      },
      {
        id: 'rvg2',
        question: 'Saturn\u2019s rings are made mainly of\u2026',
        options: ['Rock', 'Water ice', 'Liquid metal'],
        correctIndex: 1,
        explanation:
          'The rings are billions of pieces of water ice, ranging from dust-sized grains to chunks as large as houses.',
      },
      {
        id: 'rvg3',
        question: 'Why is a day on Venus longer than its year?',
        options: [
          'Venus spins very slowly on its axis',
          'Venus is very close to the Sun',
          'Venus has no moons',
        ],
        correctIndex: 0,
        explanation:
          'Venus rotates so slowly that it takes about 243 Earth days to spin once, longer than its 225-day trip around the Sun.',
      },
    ],
  },
  {
    id: 'ocean-moons',
    title: 'Ocean Moons like Europa',
    category: 'planets-moons',
    visual: 'icy-moon',
    hue: '#9fe8ff',
    summary:
      'Some moons may hide warm, salty oceans beneath icy shells. These hidden seas are some of the best places to search for life beyond Earth.',
    facts: [
      'Jupiter\u2019s moon Europa likely holds more water than all of Earth\u2019s oceans combined.',
      'Saturn\u2019s moon Enceladus shoots geysers of water vapour and ice from its south pole.',
      'Jupiter\u2019s gravity squeezes and stretches Europa, and that tidal flexing helps keep its ocean liquid.',
    ],
    didYouKnow:
      'NASA\u2019s Europa Clipper spacecraft will study Europa\u2019s ice shell and hidden ocean to learn whether it could support life.',
    whyItMatters:
      'If life can survive in dark ocean worlds far from the Sun, it would change where we search for life in the universe.',
    relatedTopicId: 'why-mars',
  },
  {
    id: 'sun-star',
    title: 'The Sun: Our Star',
    category: 'sun-weather',
    visual: 'sun',
    hue: '#ffd23f',
    summary:
      'The Sun is a huge ball of hot plasma powered by nuclear fusion, turning hydrogen into helium in its core and releasing the light and heat that sustain life on Earth.',
    facts: [
      'The Sun\u2019s core is about 15 million \u00b0C and fuses around 600 million tonnes of hydrogen every second.',
      'Sunlight takes about 8 minutes and 20 seconds to travel to Earth.',
      'The Sun is about 4.6 billion years old \u2014 roughly halfway through its life.',
    ],
    didYouKnow:
      'The Sun\u2019s visible surface is about 5,500 \u00b0C, yet the corona above it is over a million degrees. Scientists still study why the outer atmosphere is so much hotter.',
    whyItMatters:
      'The Sun drives Earth\u2019s climate and nearly all life, and its activity creates space weather that can affect satellites, GPS and power grids.',
    relatedTopicId: 'space-weather',
    quiz: [
      {
        id: 'sun1',
        question: 'What powers the Sun?',
        options: ['Burning coal', 'Nuclear fusion', 'A giant battery'],
        correctIndex: 1,
        explanation:
          'In the Sun\u2019s core, hydrogen nuclei fuse into helium, releasing enormous amounts of energy.',
      },
      {
        id: 'sun2',
        question: 'About how long does sunlight take to reach Earth?',
        options: ['8 seconds', '8 minutes', '8 hours'],
        correctIndex: 1,
        explanation:
          'Light crosses the roughly 150 million km from the Sun to Earth in about 8 minutes and 20 seconds.',
      },
    ],
  },
  {
    id: 'space-weather',
    title: 'Solar Storms and Auroras',
    category: 'sun-weather',
    visual: 'aurora',
    hue: '#42e8a8',
    summary:
      'Solar flares and coronal mass ejections hurl charged particles and magnetic fields toward Earth. They paint the sky with auroras and can disrupt technology.',
    facts: [
      'Auroras glow when charged particles hit gases in our atmosphere and make them emit light.',
      'Earth\u2019s magnetic field deflects most of the solar wind, acting like a protective shield.',
      'The huge 1859 solar storm made telegraphs spark and let people see auroras near the equator.',
    ],
    didYouKnow:
      'NASA\u2019s Parker Solar Probe flies closer to the Sun than any spacecraft in history, sampling the corona to help forecast space weather.',
    whyItMatters:
      'Predicting space weather protects astronauts, satellites, GPS and power grids from damaging solar outbursts.',
    relatedTopicId: 'sun-star',
  },
  {
    id: 'why-mars',
    title: 'Why Do We Explore Mars?',
    category: 'mars',
    visual: 'mars',
    hue: '#c1502e',
    summary:
      'Mars is the most Earth-like planet and may once have had lakes, rivers and a thicker atmosphere. Robotic explorers are reading its history, rock by rock.',
    facts: [
      'One Mars day, called a "sol", lasts about 24 hours and 37 minutes.',
      'Mars has the tallest volcano in the Solar System: Olympus Mons, about 22 km high.',
      'Rovers drive only a few dozen metres per sol to stay safe and manage their limited power.',
    ],
    didYouKnow:
      'Orbiters map the whole planet from above while rovers study rocks up close \u2014 the two kinds of robot work as a team.',
    whyItMatters:
      'Mars may have once supported life, and studying it helps scientists understand Earth\u2019s climate and prepares for future human missions.',
    relatedTopicId: 'mars-rocks',
    mission: {
      game: 'rover',
      label: 'Try It in a Mission: Mars Rover Explorer',
      reminder:
        'Rover tip: real rovers follow carefully planned routes and conserve energy \u2014 just like in this mission!',
    },
    quiz: [
      {
        id: 'mars1',
        question: 'Why is Mars a key target for exploration?',
        options: [
          'It is the most Earth-like planet',
          'It is the closest planet to Earth',
          'It has big rings',
        ],
        correctIndex: 0,
        explanation:
          'Mars has a rocky surface, seasons and signs of ancient water, making it the most Earth-like planet \u2014 and the most likely to have had life.',
      },
      {
        id: 'mars2',
        question: 'What is a "sol"?',
        options: ['A Martian day', 'A rover tool', 'A type of rock'],
        correctIndex: 0,
        explanation:
          'A sol is one day on Mars, about 24 hours and 37 minutes long \u2014 slightly longer than an Earth day.',
      },
    ],
  },
  {
    id: 'mars-rocks',
    title: 'Reading the Rocks on Mars',
    category: 'mars',
    visual: 'mars-rock',
    hue: '#d98a5f',
    summary:
      'Rover geologists study Martian rocks and sediments for clues about ancient water, climate and whether the planet was ever habitable.',
    facts: [
      'Sedimentary rocks such as mudstone often form in water and can preserve organic molecules.',
      'Rovers drill rock powder and analyse it with small onboard laboratories.',
      'Scientists on Earth study daily images, then send driving and drilling commands to the rover.',
    ],
    didYouKnow:
      'NASA\u2019s Perseverance rover is collecting and caching rock samples for a future mission to bring them back to Earth.',
    whyItMatters:
      'Rocks are a record of Mars\u2019s climate history, and the best evidence for whether it ever supported life may be locked inside them.',
    relatedTopicId: 'why-mars',
    mission: {
      game: 'rover',
      label: 'Try It in a Mission: Mars Rover Explorer',
      reminder:
        'Geology in action: collecting samples is exactly what you will do in the Mars Rover Explorer mission.',
    },
  },
  {
    id: 'solar-panels',
    title: 'Solar Panels in Space',
    category: 'spacecraft',
    visual: 'solar-panel',
    hue: '#2f6bff',
    summary:
      'Spacecraft use solar panels to turn sunlight into electricity, powering their computers, instruments and communication systems.',
    facts: [
      'Solar cells use the photovoltaic effect: light knocks electrons loose and creates an electric current.',
      'Panels must face the Sun, so spacecraft slowly rotate or use pointing systems to keep them lit.',
      'The farther from the Sun, the weaker the sunlight \u2014 so some deep-space probes use nuclear power instead.',
    ],
    didYouKnow:
      'NASA\u2019s Juno spacecraft at Jupiter carries huge solar arrays, because sunlight there is about 25 times weaker than at Earth.',
    whyItMatters:
      'Power is the resource that limits every mission. No power means no instruments, no heaters and no way to send science home.',
    relatedTopicId: 'deep-space-comms',
    mission: {
      game: 'spacecraft',
      label: 'Try It in a Mission: Build Your Spacecraft',
      reminder:
        'Power matters! In this mission you must choose a power source that can keep the whole spacecraft running.',
    },
    quiz: [
      {
        id: 'sp1',
        question: 'How do solar panels make electricity?',
        options: ['The photovoltaic effect', 'Spinning magnets', 'Burning fuel'],
        correctIndex: 0,
        explanation:
          'In the photovoltaic effect, particles of light called photons knock electrons free inside the solar cell, creating an electric current.',
      },
      {
        id: 'sp2',
        question: 'Why do some deep-space probes use nuclear power instead of solar panels?',
        options: [
          'Panels are too heavy',
          'Sunlight is too weak far from the Sun',
          'Panels do not work in a vacuum',
        ],
        correctIndex: 1,
        explanation:
          'Beyond Mars, sunlight is very faint, so large solar arrays become impractical and nuclear power sources are more reliable.',
      },
    ],
  },
  {
    id: 'deep-space-comms',
    title: 'Talking to Earth: Deep Space Communication',
    category: 'spacecraft',
    visual: 'satellite',
    hue: '#6ee7ff',
    summary:
      'Spacecraft send their data to Earth using radio waves, received by giant dish antennas. Without this link, mission science would never reach scientists.',
    facts: [
      'Radio signals travel at the speed of light, but can still take minutes to hours to cross space.',
      'NASA\u2019s Deep Space Network uses 70-metre dishes on three continents so a spacecraft is always in view.',
      'Spacecraft point high-gain antennas precisely at Earth to send a strong, clear signal.',
    ],
    didYouKnow:
      'By the time Voyager 1\u2019s signal reaches Earth it is billions of times weaker than the power of a watch battery, yet engineers still receive it.',
    whyItMatters:
      'Communication turns a spacecraft\u2019s measurements into knowledge. A silent spacecraft cannot do science, so reliable antennas are essential.',
    relatedTopicId: 'solar-panels',
    mission: {
      game: 'spacecraft',
      label: 'Try It in a Mission: Build Your Spacecraft',
      reminder:
        'Stay in touch! Your spacecraft needs a communication antenna to send its data back to Earth.',
    },
    quiz: [
      {
        id: 'dsc1',
        question: 'What do spacecraft use to send data across space?',
        options: ['Sound waves', 'Radio waves', 'Smoke signals'],
        correctIndex: 1,
        explanation:
          'Radio waves travel through the vacuum of space at the speed of light, so they are ideal for sending data to Earth.',
      },
      {
        id: 'dsc2',
        question: 'Why does NASA use dish antennas on three continents?',
        options: [
          'To look impressive',
          'So a spacecraft is always in view',
          'To save electricity',
        ],
        correctIndex: 1,
        explanation:
          'As Earth rotates, a network of dishes spread around the world can keep continuous contact with a distant spacecraft.',
      },
    ],
  },
];

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
