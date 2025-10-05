import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlickerCharacter from './FlickerCharacter.jsx';
import Level1SolarLaunch from './CME/Level1SolarLaunch.jsx';
import Level2Interplanetary from './CME/Level2Interplanetary.jsx';
import Level3Magnetosphere from './CME/Level3Magnetosphere.jsx';
import Level4AuroraCreation from './CME/Level4AuroraCreation.jsx';
import GameUI from './CME/GameUI.jsx';
import '../styles/cmeGame.css';

const CMEGame = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameState, setGameState] = useState('playing'); // playing, paused, completed
  const [score, setScore] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [showEducationalPopup, setShowEducationalPopup] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(null);

  const levels = [
    {
      id: 1,
      title: "The Solar Launch",
      description: "Break free from the Sun's magnetic field!",
      component: Level1SolarLaunch,
      educationalFacts: [
        "CMEs form when magnetic field lines on the Sun twist and snap!",
        "A CME can travel at millions of km per hour!",
        "The Sun's corona is 1 million times hotter than its surface!"
      ]
    },
    {
      id: 2,
      title: "Through Interplanetary Space",
      description: "Navigate through space toward Earth!",
      component: Level2Interplanetary,
      educationalFacts: [
        "CMEs travel through the solar wind — a constant flow of charged particles",
        "It takes about 1–3 days for a CME to reach Earth!",
        "Solar wind particles are like tiny invisible bullets!"
      ]
    },
    {
      id: 3,
      title: "The Magnetosphere Barrier",
      description: "Interact with Earth's magnetic shield!",
      component: Level3Magnetosphere,
      educationalFacts: [
        "Earth's magnetosphere deflects most charged particles",
        "When particles follow magnetic field lines near the poles, they excite atmospheric gases, creating auroras!",
        "The magnetosphere is like Earth's invisible force field!"
      ]
    },
    {
      id: 4,
      title: "Aurora Creation",
      description: "Create beautiful auroras by mixing colors!",
      component: Level4AuroraCreation,
      educationalFacts: [
        "Oxygen gives off green and red light",
        "Nitrogen glows purple or blue!",
        "Auroras are nature's most beautiful light show!"
      ]
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  const handleLevelComplete = (levelScore) => {
    setScore(prev => prev + levelScore);
    setLevelProgress(100);
    
    // Show educational popup
    const randomFact = currentLevelData.educationalFacts[
      Math.floor(Math.random() * currentLevelData.educationalFacts.length)
    ];
    setCurrentPopup(randomFact);
    setShowEducationalPopup(true);
  };

  const handleNextLevel = () => {
    setShowEducationalPopup(false);
    setCurrentPopup(null);
    
    if (currentLevel < levels.length) {
      setCurrentLevel(prev => prev + 1);
      setLevelProgress(0);
    } else {
      // Game completed
      setGameState('completed');
    }
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    setScore(0);
    setLevelProgress(0);
    setGameState('playing');
    setShowEducationalPopup(false);
    setCurrentPopup(null);
  };

  const handleBackToStory = () => {
    navigate('/story-continue');
  };

  const LevelComponent = currentLevelData.component;

  return (
    <div style={containerStyle} className="cme-game-container">
      {/* Background */}
      <div style={backgroundStyle} />
      
      {/* Game UI */}
      <GameUI
        currentLevel={currentLevel}
        totalLevels={levels.length}
        score={score}
        levelProgress={levelProgress}
        onBack={handleBackToStory}
        onRestart={handleRestart}
      />

      {/* Educational Popup */}
      <AnimatePresence>
        {showEducationalPopup && currentPopup && (
          <motion.div
            style={popupOverlayStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleNextLevel}
          >
            <motion.div
              style={popupStyle}
              className="cme-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={popupHeaderStyle}>
                <FlickerCharacter state="excited" onClick={() => {}} />
                <h3 style={popupTitleStyle}>Did You Know? 🌟</h3>
              </div>
              <p style={popupTextStyle}>{currentPopup}</p>
              <button style={popupButtonStyle} onClick={handleNextLevel}>
                {currentLevel < levels.length ? "Next Level!" : "Complete Game!"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Completion Screen */}
      <AnimatePresence>
        {gameState === 'completed' && (
          <motion.div
            style={completionOverlayStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={completionStyle}
              className="cme-completion"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <FlickerCharacter state="excited" onClick={() => {}} />
              <h2 style={completionTitleStyle}>Congratulations! 🎉</h2>
              <p style={completionTextStyle}>
                You've successfully guided a CME from the Sun to Earth and created beautiful auroras! 
                You're now a Space Weather Expert!
              </p>
              <p style={completionScoreStyle}>Final Score: {score} points</p>
              <div style={completionButtonsStyle}>
                <button style={buttonStyle} onClick={handleRestart}>
                  Play Again
                </button>
                <button style={buttonStyle} onClick={handleBackToStory}>
                  Back to Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Level Component */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          style={levelContainerStyle}
        >
          <LevelComponent
            onComplete={handleLevelComplete}
            onProgress={setLevelProgress}
            levelData={currentLevelData}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Styles
const containerStyle = {
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(135deg, #0d1b4a 0%, #1a237e 30%, #283593 70%, #3949ab 100%)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: 'inset 0 0 100px rgba(0, 150, 255, 0.1)',
  minHeight: '600px',
  minWidth: '320px'
};

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(circle at 20% 80%, rgba(255, 235, 59, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 235, 59, 0.1) 0%, transparent 50%)
  `,
  zIndex: 1
};

const levelContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  cursor: 'pointer'
};

const popupStyle = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 245, 235, 0.95) 100%)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '600px',
  minWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  border: '3px solid #ff6b35',
  cursor: 'default',
  backdropFilter: 'blur(20px)'
};

const popupHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '20px'
};

const popupTitleStyle = {
  color: '#1a237e',
  fontSize: '28px',
  margin: 0,
  fontFamily: 'Schoolbell, cursive',
  fontWeight: 'bold'
};

const popupTextStyle = {
  color: '#333',
  fontSize: '20px',
  lineHeight: '1.6',
  margin: '0 0 24px 0',
  fontFamily: 'Schoolbell, cursive'
};

const popupButtonStyle = {
  background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
  color: 'white',
  border: 'none',
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Schoolbell, cursive',
  boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)',
  transition: 'all 0.3s ease'
};

const completionOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const completionStyle = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 245, 235, 0.95) 100%)',
  borderRadius: '32px',
  padding: '48px',
  textAlign: 'center',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  border: '4px solid #ff6b35',
  maxWidth: '700px',
  minWidth: '500px',
  backdropFilter: 'blur(20px)'
};

const completionTitleStyle = {
  color: '#1a237e',
  fontSize: '36px',
  margin: '20px 0',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: 'bold'
};

const completionTextStyle = {
  color: '#333',
  fontSize: '20px',
  lineHeight: '1.6',
  margin: '0 0 20px 0',
  fontFamily: 'Schoolbell, cursive'
};

const completionScoreStyle = {
  color: '#ff6b35',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 32px 0',
  fontFamily: 'Schoolbell, cursive'
};

const completionButtonsStyle = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center'
};

const buttonStyle = {
  background: 'linear-gradient(45deg, #1a237e, #3949ab)',
  color: 'white',
  border: 'none',
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Schoolbell, cursive',
  boxShadow: '0 4px 16px rgba(26, 35, 126, 0.3)',
  transition: 'all 0.3s ease'
};

export default CMEGame;
