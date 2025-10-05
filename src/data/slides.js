import { nasaSpaceWeatherData } from './nasaEducationalData.js';

const slides = [
  {
    id: 1,
    title: "",
    content: "Hey! Who's that?",
    background: "space-scene",
    interactive: false,
    narration: "welcome",
    specialComponent: "FourSuns"
  },
  {
    id: 2,
    title: "Meet Our Amazing Sun ☀️",
    content: nasaSpaceWeatherData.sunFacts[0].fact + " " + nasaSpaceWeatherData.sunFacts[0].kidExplanation,
    background: "space-scene",
    interactive: true,
    characterState: "waving",
    interactions: ["click-flicker-wave", "sun-facts-popup"],
    narration: "meet-flicker",
    nasaFact: nasaSpaceWeatherData.sunFacts[0],
    showFunFacts: true,
    funFactType: "sun"
  },
  {
    id: 3,
    title: "Solar Flares - The Sun's Super Burps! 🔥",
    content: nasaSpaceWeatherData.solarFlares[0].fact + " " + nasaSpaceWeatherData.solarFlares[0].kidExplanation,
    background: "space-scene",
    interactive: true,
    characterState: "solar-flare",
    narration: "flicker-excited",
    miniGame: "SolarFlareGame",
    nasaFact: nasaSpaceWeatherData.solarFlares[0],
    showFunFacts: true,
    funFactType: "solar-flares"
  },
  {
    id: 4,
    title: "Earth's Amazing Protective Shields 🛡️",
    content: nasaSpaceWeatherData.earthProtection[0].fact + " " + nasaSpaceWeatherData.earthProtection[0].kidExplanation,
    background: "space-scene",
    interactive: false,
    narration: "earth-protection",
    nasaFact: nasaSpaceWeatherData.earthProtection[0],
    showFunFacts: true,
    funFactType: "earth-protection"
  },
  {
    id: 5,
    title: "Auroras - Nature's Magical Light Show! 🌌",
    content: nasaSpaceWeatherData.auroras[0].fact + " " + nasaSpaceWeatherData.auroras[0].kidExplanation,
    background: "aurora-scene",
    interactive: false,
    narration: "aurora-creation",
    miniGame: "SparkleJourneyGame",
    nasaFact: nasaSpaceWeatherData.auroras[0],
    showFunFacts: true,
    funFactType: "aurora"
  },
  {
    id: 6,
    title: "What is Space Weather? 🌦️",
    content: "Space weather is like Earth's weather, but in space! It includes solar flares, CMEs (the Sun's big burps), and solar wind particles that can affect our technology!",
    background: "space-scene",
    interactive: false,
    narration: "space-weather-definition",
    showFunFacts: true,
    funFactType: "general"
  },
  {
    id: 7,
    title: "CMEs - The Sun's Biggest Burps! 💨",
    content: nasaSpaceWeatherData.coronalMassEjections[0].fact + " " + nasaSpaceWeatherData.coronalMassEjections[0].kidExplanation,
    background: "space-scene",
    interactive: false,
    characterState: "solar-flare",
    narration: "solar-flares-cme",
    nasaFact: nasaSpaceWeatherData.coronalMassEjections[0],
    showFunFacts: true,
    funFactType: "cme"
  },
  {
    id: 8,
    title: "Earth's Invisible Magnetic Shield 🧲",
    content: nasaSpaceWeatherData.earthProtection[1].fact + " " + nasaSpaceWeatherData.earthProtection[1].kidExplanation,
    background: "space-scene",
    interactive: false,
    narration: "earth-protection",
    nasaFact: nasaSpaceWeatherData.earthProtection[1],
    showFunFacts: true,
    funFactType: "magnetic-field"
  },
  {
    id: 9,
    title: "Aurora Colors - Nature's Rainbow! 🌈",
    content: nasaSpaceWeatherData.auroras[1].fact + " " + nasaSpaceWeatherData.auroras[1].kidExplanation,
    background: "aurora-scene",
    interactive: false,
    narration: "aurora-creation",
    nasaFact: nasaSpaceWeatherData.auroras[1],
    showFunFacts: true,
    funFactType: "aurora-colors"
  },
  {
    id: 10,
    title: "Space Weather Affects Our Technology! 📱",
    content: nasaSpaceWeatherData.solarFlares[2].fact + " " + nasaSpaceWeatherData.solarFlares[2].kidExplanation,
    background: "space-scene",
    interactive: false,
    narration: "technology-impacts",
    nasaFact: nasaSpaceWeatherData.solarFlares[2],
    showFunFacts: true,
    funFactType: "technology-impacts"
  },
  {
    id: 11,
    title: "NASA's Space Weather Watchdogs! 🛰️",
    content: nasaSpaceWeatherData.nasaMonitoring[0].fact + " " + nasaSpaceWeatherData.nasaMonitoring[0].kidExplanation,
    background: "space-scene",
    interactive: false,
    narration: "scientists",
    nasaFact: nasaSpaceWeatherData.nasaMonitoring[0],
    showFunFacts: true,
    funFactType: "nasa-monitoring"
  },
  {
    id: 12,
    title: "Test Your Space Weather Knowledge! 🧠",
    content: "Let's see how much you've learned about space weather! Take this fun quiz to test your knowledge!",
    background: "space-scene",
    interactive: false,
    narration: "quiz-intro",
    miniGame: "SpaceWeatherQuiz"
  },
  {
    id: 13,
    title: "You're a Space Weather Expert! 🎓",
    content: "Congratulations! You've learned about solar flares, CMEs, Earth's magnetic field, auroras, and how NASA monitors space weather. You're now ready to explore the amazing universe!",
    background: "space-scene",
    interactive: false,
    characterState: "excited",
    narration: "completion",
    showCelebration: true
  }
];

export default slides;


