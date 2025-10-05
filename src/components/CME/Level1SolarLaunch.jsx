import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FlickerCharacter from '../FlickerCharacter.jsx';

const Level1SolarLaunch = ({ onComplete, onProgress, levelData }) => {
  const [magneticPressure, setMagneticPressure] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [cmeEjected, setCmeEjected] = useState(false);
  const [instructions, setInstructions] = useState("Click and drag to build up magnetic pressure!");
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawMagneticField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw magnetic field lines
      ctx.strokeStyle = `rgba(255, 107, 53, ${0.3 + magneticPressure * 0.7})`;
      ctx.lineWidth = 2 + magneticPressure * 3;
      
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const startX = canvas.width / 2 + Math.cos(angle) * 100;
        const startY = canvas.height / 2 + Math.sin(angle) * 100;
        const endX = canvas.width / 2 + Math.cos(angle) * (200 + magneticPressure * 100);
        const endY = canvas.height / 2 + Math.sin(angle) * (200 + magneticPressure * 100);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(
          startX + (endX - startX) / 2 + Math.sin(angle) * 50,
          startY + (endY - startY) / 2 - Math.cos(angle) * 50,
          endX, endY
        );
        ctx.stroke();
      }

      // Draw CME when ejected
      if (cmeEjected) {
        ctx.fillStyle = `rgba(255, 235, 59, 0.8)`;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50 + magneticPressure * 20, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawMagneticField();
  }, [magneticPressure, cmeEjected]);

  const handleMouseDown = () => {
    setIsBuilding(true);
    setInstructions("Keep holding to build more pressure...");
  };

  const handleMouseUp = () => {
    if (isBuilding && magneticPressure > 0.3) {
      setIsReleased(true);
      setInstructions("Great! CME ejected! Watch it travel...");
      setCmeEjected(true);
      
      // Simulate CME ejection
      setTimeout(() => {
        onComplete(100);
      }, 2000);
    } else {
      setIsBuilding(false);
      setInstructions("Not enough pressure! Try again - hold longer!");
      setMagneticPressure(0);
    }
  };

  const handleMouseMove = (e) => {
    if (isBuilding && !isReleased) {
      const newPressure = Math.min(magneticPressure + 0.02, 1);
      setMagneticPressure(newPressure);
      onProgress(newPressure * 50); // Half progress for building
    }
  };

  useEffect(() => {
    if (isBuilding && !isReleased) {
      const interval = setInterval(() => {
        setMagneticPressure(prev => Math.min(prev + 0.01, 1));
        onProgress(magneticPressure * 50);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isBuilding, magneticPressure, onProgress]);

  return (
    <div style={containerStyle}>
      {/* Background Sun */}
      <div style={sunStyle}>
        <FlickerCharacter 
          state={magneticPressure > 0.5 ? "excited" : "default"} 
          onClick={() => {}} 
        />
      </div>

      {/* Magnetic Field Canvas */}
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      />

      {/* Instructions */}
      <motion.div
        style={instructionsStyle}
        className="cme-instructions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 style={levelTitleStyle} className="cme-level-title">{levelData.title}</h2>
        <p style={instructionTextStyle} className="cme-instruction-text">{instructions}</p>
        <div style={pressureBarStyle} className="cme-pressure-bar">
          <div style={pressureBarFillStyle}>
            <motion.div
              style={pressureIndicatorStyle}
              animate={{ width: `${magneticPressure * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span style={pressureTextStyle}>
            Magnetic Pressure: {Math.round(magneticPressure * 100)}%
          </span>
        </div>
      </motion.div>

      {/* Educational Facts */}
      <motion.div
        style={factsStyle}
        className="cme-facts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 style={factsTitleStyle} className="cme-facts-title">Did You Know? 🌟</h3>
        <ul style={factsListStyle} className="cme-facts-list">
          <li>CMEs form when magnetic field lines on the Sun twist and snap!</li>
          <li>A CME can travel at millions of km per hour!</li>
          <li>The Sun's corona is 1 million times hotter than its surface!</li>
        </ul>
      </motion.div>
    </div>
  );
};

// Styles
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'radial-gradient(circle at center, #ff6b35 0%, #ff8a50 30%, #1a237e 70%, #0d1b4a 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
};

const sunStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 5,
  filter: 'drop-shadow(0 0 30px rgba(255, 107, 53, 0.8))'
};

const canvasStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  zIndex: 2
};

const instructionsStyle = {
  position: 'absolute',
  top: '50%', // Center vertically
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '24px 32px',
  borderRadius: '24px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  minWidth: '400px'
};

const levelTitleStyle = {
  color: 'white',
  fontSize: '36px',
  margin: '0 0 16px 0',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: 'bold',
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  lineHeight: '1.2',
  letterSpacing: '-0.5px'
};

const instructionTextStyle = {
  color: 'white',
  fontSize: '22px',
  margin: '0 0 20px 0',
  fontFamily: 'Schoolbell, cursive',
  lineHeight: '1.7',
  textAlign: 'center',
  whiteSpace: 'pre-line',
  textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
  fontWeight: '500'
};

const pressureBarStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
};

const pressureBarFillStyle = {
  width: '300px',
  height: '20px',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '10px',
  overflow: 'hidden',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
};

const pressureIndicatorStyle = {
  height: '100%',
  background: 'linear-gradient(90deg, #ffb300, #ff7043)',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(255, 179, 0, 0.5)'
};

const pressureTextStyle = {
  color: 'white',
  fontSize: '16px',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: '600'
};

const factsStyle = {
  position: 'absolute',
  bottom: '20px', // Safe zone from bottom
  right: '20px', // Safe zone from right
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '20px',
  borderRadius: '16px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  maxWidth: '300px',
  zIndex: 10,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
};

const factsTitleStyle = {
  color: '#ffb300',
  fontSize: '18px',
  margin: '0 0 12px 0',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: 'bold'
};

const factsListStyle = {
  color: 'white',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: 0,
  paddingLeft: '16px',
  fontFamily: 'Schoolbell, cursive'
};

export default Level1SolarLaunch;
