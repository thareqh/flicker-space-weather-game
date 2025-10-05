import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import earthImage from '../../assets/images/earth.png';
import asteroidImage from '../../assets/images/asteroid.png';

const Level2Interplanetary = ({ onComplete, onProgress, levelData }) => {
  const [cmePosition, setCmePosition] = useState({ x: 100, y: window.innerHeight / 2 });
  const [speed, setSpeed] = useState(2);
  const [isMoving, setIsMoving] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const [score, setScore] = useState(0);
  const [instructions, setInstructions] = useState("Use arrow keys to navigate toward Earth!");
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Generate obstacles and boosts
    const newObstacles = [];
    const newBoosts = [];
    
    for (let i = 0; i < 5; i++) {
      newObstacles.push({
        id: i,
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * (window.innerHeight - 200) + 100,
        type: 'drag-zone'
      });
    }
    
    for (let i = 0; i < 3; i++) {
      newBoosts.push({
        id: i,
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * (window.innerHeight - 200) + 100,
        collected: false
      });
    }
    
    setObstacles(newObstacles);
    setBoosts(newBoosts);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw space background
      ctx.fillStyle = 'rgba(13, 27, 74, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      for (let i = 0; i < 100; i++) {
        const x = (i * 37) % canvas.width;
        const y = (i * 41) % canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x, y, 1, 1);
      }
      
      // Draw Earth (target) with image
      const earthX = canvas.width - 100;
      const earthY = canvas.height / 2;
      const earthSize = 80;
      
      // Draw Earth's atmosphere glow
      ctx.shadowColor = 'rgba(74, 144, 226, 0.5)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthSize + 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw Earth image
      const earthImg = new Image();
      earthImg.src = earthImage;
      ctx.drawImage(earthImg, earthX - earthSize/2, earthY - earthSize/2, earthSize, earthSize);
      
      // Draw obstacles (drag zones) with asteroid images
      obstacles.forEach(obstacle => {
        // Draw asteroid image
        const asteroidImg = new Image();
        asteroidImg.src = asteroidImage;
        ctx.drawImage(asteroidImg, obstacle.x - 25, obstacle.y - 25, 50, 50);
        
        // Draw warning glow
        ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, 35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
      
      // Draw boosts
      boosts.forEach(boost => {
        if (!boost.collected) {
          ctx.fillStyle = '#00FF00';
          ctx.beginPath();
          ctx.arc(boost.x, boost.y, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      // Draw CME
      ctx.fillStyle = 'rgba(255, 235, 59, 0.8)';
      ctx.beginPath();
      ctx.arc(cmePosition.x, cmePosition.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 235, 59, 1)';
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    draw();
  }, [cmePosition, obstacles, boosts]);

  const handleKeyDown = (e) => {
    if (!isMoving) {
      setIsMoving(true);
      setInstructions("Great! Keep navigating toward Earth!");
    }
    
    const moveAmount = 5;
    let newX = cmePosition.x;
    let newY = cmePosition.y;
    
    switch (e.key) {
      case 'ArrowLeft':
        newX = Math.max(20, cmePosition.x - moveAmount);
        break;
      case 'ArrowRight':
        newX = Math.min(window.innerWidth - 20, cmePosition.x + moveAmount);
        break;
      case 'ArrowUp':
        newY = Math.max(20, cmePosition.y - moveAmount);
        break;
      case 'ArrowDown':
        newY = Math.min(window.innerHeight - 20, cmePosition.y + moveAmount);
        break;
      default:
        return;
    }
    
    setCmePosition({ x: newX, y: newY });
    
    // Check for obstacle collisions
    obstacles.forEach(obstacle => {
      const distance = Math.sqrt(
        Math.pow(newX - obstacle.x, 2) + Math.pow(newY - obstacle.y, 2)
      );
      if (distance < 50) {
        setSpeed(prev => Math.max(0.5, prev - 0.1));
        setInstructions("Hit a drag zone! Speed reduced!");
      }
    });
    
    // Check for boost collections
    boosts.forEach(boost => {
      if (!boost.collected) {
        const distance = Math.sqrt(
          Math.pow(newX - boost.x, 2) + Math.pow(newY - boost.y, 2)
        );
        if (distance < 35) {
          setBoosts(prev => prev.map(b => 
            b.id === boost.id ? { ...b, collected: true } : b
          ));
          setSpeed(prev => Math.min(5, prev + 0.5));
          setScore(prev => prev + 50);
          setInstructions("Boost collected! Speed increased!");
        }
      }
    });
    
    // Check if reached Earth
    const distanceToEarth = Math.sqrt(
      Math.pow(newX - (window.innerWidth - 100), 2) + 
      Math.pow(newY - (window.innerHeight / 2), 2)
    );
    
    if (distanceToEarth < 60) {
      onComplete(200 + score);
      setInstructions("Excellent! You reached Earth!");
    }
    
    // Update progress
    const progress = Math.min(100, ((newX - 100) / (window.innerWidth - 200)) * 100);
    onProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cmePosition, obstacles, boosts, speed, score]);

  return (
    <div style={containerStyle}>
      {/* Canvas for game elements */}
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        tabIndex={0}
      />

      {/* Instructions */}
      <motion.div
        style={instructionsStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 style={levelTitleStyle}>{levelData.title}</h2>
        <p style={instructionTextStyle}>{instructions}</p>
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Speed:</span>
            <span style={statValueStyle}>{speed.toFixed(1)}x</span>
          </div>
          <div style={statItemStyle}>
            <span style={statLabelStyle}>Score:</span>
            <span style={statValueStyle}>{score}</span>
          </div>
        </div>
      </motion.div>

      {/* Educational Facts */}
      <motion.div
        style={factsStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 style={factsTitleStyle}>Space Facts! 🚀</h3>
        <ul style={factsListStyle}>
          <li>CMEs travel through the solar wind — a constant flow of charged particles</li>
          <li>It takes about 1–3 days for a CME to reach Earth!</li>
          <li>Solar wind particles are like tiny invisible bullets!</li>
        </ul>
      </motion.div>

      {/* Controls Help */}
      <motion.div
        style={controlsStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p style={controlsTextStyle}>Use Arrow Keys to Move</p>
        <div style={arrowKeysStyle}>
          <div style={arrowKeyStyle}>↑</div>
          <div style={arrowKeysRowStyle}>
            <div style={arrowKeyStyle}>←</div>
            <div style={arrowKeyStyle}>↓</div>
            <div style={arrowKeyStyle}>→</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Styles
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'linear-gradient(135deg, #0d1b4a 0%, #1a237e 50%, #283593 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
};

const canvasStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  outline: 'none'
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

const statsStyle = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center'
};

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px'
};

const statLabelStyle = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  fontFamily: 'Schoolbell, cursive'
};

const statValueStyle = {
  color: '#ffb300',
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'Schoolbell, cursive'
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

const controlsStyle = {
  position: 'absolute',
  bottom: '20px', // Safe zone from bottom
  left: '20px', // Safe zone from left
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '16px',
  borderRadius: '16px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  zIndex: 10,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
};

const controlsTextStyle = {
  color: 'white',
  fontSize: '14px',
  margin: '0 0 8px 0',
  fontFamily: 'Schoolbell, cursive',
  textAlign: 'center'
};

const arrowKeysStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px'
};

const arrowKeysRowStyle = {
  display: 'flex',
  gap: '4px'
};

const arrowKeyStyle = {
  width: '24px',
  height: '24px',
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '12px',
  fontFamily: 'monospace'
};

export default Level2Interplanetary;
