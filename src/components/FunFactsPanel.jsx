import React from 'react';
import { motion } from 'framer-motion';
import { nasaSpaceWeatherData } from '../data/nasaEducationalData.js';

const FunFactsPanel = ({ isOpen, onClose, factType = 'general' }) => {
  const facts = {
    general: [
      nasaSpaceWeatherData.funFacts[0].fact + " " + nasaSpaceWeatherData.funFacts[0].kidExplanation,
      nasaSpaceWeatherData.funFacts[1].fact + " " + nasaSpaceWeatherData.funFacts[1].kidExplanation,
      nasaSpaceWeatherData.funFacts[2].fact + " " + nasaSpaceWeatherData.funFacts[2].kidExplanation,
      "NASA monitors space weather 24/7 to keep our technology safe! 🛰️",
      "Space weather can affect GPS signals, radio, and power grids! 📡"
    ],
    aurora: [
      nasaSpaceWeatherData.auroras[1].fact + " " + nasaSpaceWeatherData.auroras[1].kidExplanation,
      nasaSpaceWeatherData.auroras[2].fact + " " + nasaSpaceWeatherData.auroras[2].kidExplanation,
      "Auroras can be seen from the International Space Station! 🚀",
      "The strongest auroras happen during solar maximum years! 🌟",
      "Auroras occur 80-640 km above Earth's surface! 🌈"
    ],
    sun: [
      nasaSpaceWeatherData.sunFacts[1].fact + " " + nasaSpaceWeatherData.sunFacts[1].kidExplanation,
      nasaSpaceWeatherData.sunFacts[2].fact + " " + nasaSpaceWeatherData.sunFacts[2].kidExplanation,
      nasaSpaceWeatherData.funFacts[0].fact + " " + nasaSpaceWeatherData.funFacts[0].kidExplanation,
      "The Sun converts 4 million tons of matter into energy every second! ⚖️",
      "The Sun's core temperature is 15 million°C - hot enough to fuse hydrogen! 🔥"
    ],
    'earth-protection': [
      nasaSpaceWeatherData.earthProtection[0].fact + " " + nasaSpaceWeatherData.earthProtection[0].kidExplanation,
      nasaSpaceWeatherData.earthProtection[1].fact + " " + nasaSpaceWeatherData.earthProtection[1].kidExplanation,
      nasaSpaceWeatherData.earthProtection[2].fact + " " + nasaSpaceWeatherData.earthProtection[2].kidExplanation,
      "Earth's magnetic field extends 65,000 km into space! 🛡️",
      "Our atmosphere blocks 99% of harmful UV radiation! ☢️"
    ],
    'solar-flares': [
      nasaSpaceWeatherData.solarFlares[0].fact + " " + nasaSpaceWeatherData.solarFlares[0].kidExplanation,
      nasaSpaceWeatherData.solarFlares[1].fact + " " + nasaSpaceWeatherData.solarFlares[1].kidExplanation,
      nasaSpaceWeatherData.solarFlares[2].fact + " " + nasaSpaceWeatherData.solarFlares[2].kidExplanation,
      "Solar flares can travel at speeds up to 6 million mph! ⚡",
      "Solar flares release energy equivalent to millions of nuclear bombs! 💥"
    ],
    'cme': [
      nasaSpaceWeatherData.coronalMassEjections[0].fact + " " + nasaSpaceWeatherData.coronalMassEjections[0].kidExplanation,
      nasaSpaceWeatherData.coronalMassEjections[1].fact + " " + nasaSpaceWeatherData.coronalMassEjections[1].kidExplanation,
      nasaSpaceWeatherData.coronalMassEjections[2].fact + " " + nasaSpaceWeatherData.coronalMassEjections[2].kidExplanation,
      "CMEs can travel at speeds up to 3,000 km/s! 💨",
      "CMEs can create geomagnetic storms that affect Earth! 🌍"
    ],
    'magnetic-field': [
      nasaSpaceWeatherData.earthProtection[0].fact + " " + nasaSpaceWeatherData.earthProtection[0].kidExplanation,
      nasaSpaceWeatherData.earthProtection[2].fact + " " + nasaSpaceWeatherData.earthProtection[2].kidExplanation,
      "Earth's magnetic field extends 65,000 km into space! 🧲",
      "The magnetosphere deflects most harmful solar particles! 🛡️",
      "Earth's magnetic north pole moves about 25 miles per year! 🧭"
    ],
    'aurora-colors': [
      nasaSpaceWeatherData.auroras[1].fact + " " + nasaSpaceWeatherData.auroras[1].kidExplanation,
      "Green and red auroras come from oxygen atoms! 🟢🔴",
      "Blue and purple auroras come from nitrogen atoms! 🔵🟣",
      "Auroras can be seen from 80-640 km above Earth! 🌈",
      "The best aurora viewing is near the North and South Poles! 🌍"
    ],
    'technology-impacts': [
      nasaSpaceWeatherData.solarFlares[2].fact + " " + nasaSpaceWeatherData.solarFlares[2].kidExplanation,
      "Space weather can affect GPS accuracy by up to 100 meters! 📱",
      "Radio communications can be disrupted during solar storms! 📡",
      "Power grids can be affected by geomagnetic storms! ⚡",
      "Satellite operations need space weather monitoring! 🛰️"
    ],
    'nasa-monitoring': [
      nasaSpaceWeatherData.nasaMonitoring[0].fact + " " + nasaSpaceWeatherData.nasaMonitoring[0].kidExplanation,
      nasaSpaceWeatherData.nasaMonitoring[1].fact + " " + nasaSpaceWeatherData.nasaMonitoring[1].kidExplanation,
      nasaSpaceWeatherData.nasaMonitoring[2].fact + " " + nasaSpaceWeatherData.nasaMonitoring[2].kidExplanation,
      "GOES satellites orbit 35,786 km above Earth! 🛰️",
      "DSCOVR is located 1.5 million km from Earth at L1 point! 🌌"
    ]
  };

  const currentFacts = facts[factType] || facts.general;
  const getTitle = () => {
    switch(factType) {
      case 'aurora': return 'Aurora Fun Facts 🌌';
      case 'sun': return 'Sun Fun Facts ☀️';
      case 'earth': return 'Earth Fun Facts 🌍';
      case 'earth-protection': return 'Earth\'s Protection Fun Facts 🛡️';
      case 'solar-flares': return 'Solar Flare Fun Facts 🔥';
      case 'cme': return 'CME Fun Facts 💨';
      case 'magnetic-field': return 'Magnetic Field Fun Facts 🧲';
      case 'aurora-colors': return 'Aurora Colors Fun Facts 🌈';
      case 'technology-impacts': return 'Technology Impact Fun Facts 📱';
      case 'nasa-monitoring': return 'NASA Monitoring Fun Facts 🛰️';
      default: return 'Space Weather Fun Facts 🌟';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      style={overlayStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={panelStyle}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={headerStyle}>
          <h2 style={titleStyle}>{getTitle()}</h2>
          <button 
            onClick={onClose}
            style={closeButtonStyle}
            aria-label="Close fun facts"
          >
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          <p style={introStyle}>
            Did you know? Here are some amazing facts about space weather and our amazing universe!
          </p>
          
          <div style={factsListStyle}>
            {currentFacts.map((fact, index) => (
              <motion.div
                key={index}
                style={factItemStyle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div style={factNumberStyle}>
                  {index + 1}
                </div>
                <p style={factTextStyle}>{fact}</p>
              </motion.div>
            ))}
          </div>

          <div style={footerStyle}>
            <p style={footerTextStyle}>
              🎉 <strong>Wow!</strong> Space weather is full of amazing surprises!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px'
};

const panelStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  padding: '0',
  maxWidth: '500px',
  width: '100%',
  maxHeight: '80vh',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0 24px',
  borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
  marginBottom: '24px'
};

const titleStyle = {
  fontSize: '24px',
  color: '#1a237e',
  margin: 0,
  fontWeight: 'bold'
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666'
};

const contentStyle = {
  padding: '0 24px 24px 24px',
  maxHeight: '60vh',
  overflowY: 'auto'
};

const introStyle = {
  fontSize: '16px',
  color: '#333',
  margin: '0 0 20px 0',
  lineHeight: '1.6',
  textAlign: 'center',
  fontStyle: 'italic'
};

const factsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const factItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  background: 'rgba(26, 35, 126, 0.05)',
  borderRadius: '12px',
  padding: '16px',
  border: '2px solid rgba(26, 35, 126, 0.1)'
};

const factNumberStyle = {
  background: 'linear-gradient(45deg, #ffd54f, #ff7043)',
  color: '#1b1b1b',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  flexShrink: 0
};

const factTextStyle = {
  fontSize: '16px',
  color: '#333',
  margin: 0,
  lineHeight: '1.6'
};

const footerStyle = {
  marginTop: '20px',
  padding: '16px',
  background: 'rgba(255, 235, 59, 0.1)',
  borderRadius: '12px',
  border: '2px solid rgba(255, 235, 59, 0.2)'
};

const footerTextStyle = {
  fontSize: '16px',
  color: '#333',
  margin: 0,
  textAlign: 'center',
  lineHeight: '1.5'
};

export default FunFactsPanel;
