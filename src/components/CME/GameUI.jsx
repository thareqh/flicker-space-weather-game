import React from 'react';
import { motion } from 'framer-motion';

const GameUI = ({ currentLevel, totalLevels, score, levelProgress, onBack, onRestart }) => {
  return (
    <div style={uiContainerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <button style={backButtonStyle} onClick={onBack}>
          ← Back to Story
        </button>
        <div style={titleStyle}>
          <h1 style={gameTitleStyle}>Flicker's CME Adventure</h1>
          <p style={subtitleStyle}>Level {currentLevel} of {totalLevels}</p>
        </div>
        <button style={restartButtonStyle} onClick={onRestart}>
          🔄 Restart
        </button>
      </div>

      {/* Progress Bar */}
      <div style={progressContainerStyle}>
        <div style={progressBarStyle}>
          <motion.div
            style={progressFillStyle}
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span style={progressTextStyle}>{levelProgress}% Complete</span>
      </div>

      {/* Score */}
      <div style={scoreStyle}>
        <span style={scoreLabelStyle}>Score:</span>
        <span style={scoreValueStyle}>{score}</span>
      </div>
    </div>
  );
};

// Styles
const uiContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(15px)',
  padding: '20px 40px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  maxHeight: '120px'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '10px',
  flexWrap: 'wrap',
  gap: '10px'
};

const backButtonStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '16px',
  padding: '12px 24px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Schoolbell, cursive',
  transition: 'all 0.3s ease'
};

const titleStyle = {
  textAlign: 'center',
  flex: 1
};

const gameTitleStyle = {
  color: 'white',
  fontSize: '22px',
  margin: '0 0 4px 0',
  fontWeight: 'bold',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
  fontFamily: 'Schoolbell, cursive'
};

const subtitleStyle = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  margin: 0,
  fontFamily: 'Schoolbell, cursive'
};

const restartButtonStyle = {
  background: 'rgba(255, 179, 0, 0.8)',
  color: 'white',
  border: '2px solid rgba(255, 179, 0, 0.9)',
  borderRadius: '16px',
  padding: '12px 24px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Schoolbell, cursive',
  transition: 'all 0.3s ease'
};

const progressContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '8px',
  flexWrap: 'wrap'
};

const progressBarStyle = {
  flex: 1,
  height: '12px',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '6px',
  overflow: 'hidden',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
};

const progressFillStyle = {
  height: '100%',
  background: 'linear-gradient(90deg, #ffb300, #ff7043)',
  borderRadius: '4px',
  boxShadow: '0 0 10px rgba(255, 179, 0, 0.5)'
};

const progressTextStyle = {
  color: 'white',
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: 'Schoolbell, cursive',
  minWidth: '100px'
};

const scoreStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '8px 16px',
  borderRadius: '20px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  alignSelf: 'flex-start'
};

const scoreLabelStyle = {
  color: 'white',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Schoolbell, cursive'
};

const scoreValueStyle = {
  color: '#ffb300',
  fontSize: '20px',
  fontWeight: 'bold',
  fontFamily: 'Schoolbell, cursive'
};

export default GameUI;
