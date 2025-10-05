import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import earthImage from '../../assets/images/earth.png';
import auroraImage from '../../assets/images/aurora.png';

const Level4AuroraCreation = ({ onComplete, onProgress, levelData }) => {
  const [auroraColors, setAuroraColors] = useState({ oxygen: 0, nitrogen: 0, highOxygen: 0 });
  const [targetColors, setTargetColors] = useState({ oxygen: 0.7, nitrogen: 0.3, highOxygen: 0.2 });
  const [isMixing, setIsMixing] = useState(false);
  const [instructions, setInstructions] = useState("Mix colors to create beautiful auroras! Click the particles!");
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Generate random target colors that add up to 100%
    const total = 1.0; // 100%
    const oxygen = Math.random() * 0.4 + 0.3; // 30-70%
    const remaining = total - oxygen;
    const nitrogen = Math.random() * remaining * 0.7; // 0-70% of remaining
    const highOxygen = remaining - nitrogen; // rest to make 100%
    
    const newTargets = {
      oxygen: oxygen,
      nitrogen: nitrogen,
      highOxygen: highOxygen
    };
    setTargetColors(newTargets);
    
    // Generate particles
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        type: ['oxygen', 'nitrogen', 'highOxygen'][Math.floor(Math.random() * 3)],
        collected: false,
        size: Math.random() * 10 + 5
      });
    }
    setParticles(newParticles);
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
      
      // Draw Earth with image
      const earthX = canvas.width - 100;
      const earthY = canvas.height / 2;
      const earthSize = 120;
      
      // Draw Earth's atmosphere glow
      ctx.shadowColor = 'rgba(74, 144, 226, 0.5)';
      ctx.shadowBlur = 25;
      ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthSize + 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw Earth image
      const earthImg = new Image();
      earthImg.src = earthImage;
      ctx.drawImage(earthImg, earthX - earthSize/2, earthY - earthSize/2, earthSize, earthSize);
      
      // Draw aurora based on current colors with enhanced effects
      const auroraHeight = 250;
      const auroraY = canvas.height - auroraHeight;
      const time = Date.now() * 0.001;
      
      // Create aurora layers with different opacities and effects
      for (let layer = 0; layer < 3; layer++) {
        const layerOpacity = 0.3 + layer * 0.2;
        const layerHeight = auroraHeight - layer * 20;
        
        // Oxygen aurora (green) - main layer
        if (auroraColors.oxygen > 0) {
          const gradient = ctx.createLinearGradient(0, auroraY + layer * 20, 0, canvas.height);
          gradient.addColorStop(0, `rgba(0, 255, 0, ${auroraColors.oxygen * layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(0, 255, 100, ${auroraColors.oxygen * layerOpacity * 0.7})`);
          gradient.addColorStop(1, `rgba(0, 255, 0, ${auroraColors.oxygen * layerOpacity * 0.3})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, auroraY + layer * 20, canvas.width, layerHeight);
        }
        
        // Nitrogen aurora (purple/blue) - secondary layer
        if (auroraColors.nitrogen > 0) {
          const gradient = ctx.createLinearGradient(0, auroraY + layer * 20, 0, canvas.height);
          gradient.addColorStop(0, `rgba(128, 0, 255, ${auroraColors.nitrogen * layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(100, 0, 200, ${auroraColors.nitrogen * layerOpacity * 0.7})`);
          gradient.addColorStop(1, `rgba(128, 0, 255, ${auroraColors.nitrogen * layerOpacity * 0.3})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, auroraY + layer * 20, canvas.width, layerHeight);
        }
        
        // High altitude oxygen aurora (red) - top layer
        if (auroraColors.highOxygen > 0) {
          const gradient = ctx.createLinearGradient(0, auroraY + layer * 20, 0, canvas.height);
          gradient.addColorStop(0, `rgba(255, 0, 0, ${auroraColors.highOxygen * layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(255, 100, 0, ${auroraColors.highOxygen * layerOpacity * 0.7})`);
          gradient.addColorStop(1, `rgba(255, 0, 0, ${auroraColors.highOxygen * layerOpacity * 0.3})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, auroraY + layer * 20, canvas.width, layerHeight);
        }
      }
      
      // Draw particles
      particles.forEach(particle => {
        if (!particle.collected) {
          let color;
          switch (particle.type) {
            case 'oxygen':
              color = '#00FF00';
              break;
            case 'nitrogen':
              color = '#8000FF';
              break;
            case 'highOxygen':
              color = '#FF0000';
              break;
            default:
              color = '#FFFFFF';
          }
          
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow effect
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      
      // Draw aurora dancing effect
      for (let i = 0; i < 5; i++) {
        const x = (i * canvas.width) / 5;
        const waveHeight = Math.sin(time + i) * 20;
        ctx.strokeStyle = `rgba(0, 255, 0, ${auroraColors.oxygen * 0.5})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, auroraY + waveHeight);
        ctx.quadraticCurveTo(x + canvas.width / 10, auroraY + waveHeight + 30, x + canvas.width / 5, auroraY + waveHeight);
        ctx.stroke();
      }
    };

    draw();
  }, [auroraColors, particles]);

  const handleParticleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    particles.forEach(particle => {
      if (!particle.collected) {
        const distance = Math.sqrt(
          Math.pow(clickX - particle.x, 2) + Math.pow(clickY - particle.y, 2)
        );
        
        if (distance < particle.size + 10) {
          // Collect particle
          setParticles(prev => prev.map(p => 
            p.id === particle.id ? { ...p, collected: true } : p
          ));
          
          // Add to aurora colors (smaller increments to prevent exceeding 100%)
          setAuroraColors(prev => {
            const newColors = { ...prev };
            const increment = 0.05; // 5% per particle instead of 10%
            newColors[particle.type] = Math.min(1, prev[particle.type] + increment);
            
            // Ensure total doesn't exceed 100%
            const total = newColors.oxygen + newColors.nitrogen + newColors.highOxygen;
            if (total > 1.0) {
              const scale = 1.0 / total;
              newColors.oxygen *= scale;
              newColors.nitrogen *= scale;
              newColors.highOxygen *= scale;
            }
            
            return newColors;
          });
          
          setScore(prev => prev + 10);
          setInstructions(`Great! Added ${particle.type} particles to the aurora!`);
          
          // Check if we've reached the target
          const totalProgress = (auroraColors.oxygen + auroraColors.nitrogen + auroraColors.highOxygen) / 3;
          onProgress(totalProgress * 100);
          
          // Check if level is complete (within 10% of target)
          const tolerance = 0.1; // 10% tolerance
          if (Math.abs(auroraColors.oxygen - targetColors.oxygen) <= tolerance && 
              Math.abs(auroraColors.nitrogen - targetColors.nitrogen) <= tolerance && 
              Math.abs(auroraColors.highOxygen - targetColors.highOxygen) <= tolerance) {
            onComplete(200 + score);
            setInstructions("Perfect! You've created a beautiful aurora!");
          }
        }
      }
    });
  };

  const resetAurora = () => {
    setAuroraColors({ oxygen: 0, nitrogen: 0, highOxygen: 0 });
    setInstructions("Mix colors to create beautiful auroras! Click the particles!");
  };

  return (
    <div style={containerStyle}>
      {/* Canvas for game elements */}
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        onClick={handleParticleClick}
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
        
        {/* Color Mixing Interface */}
        <div style={colorMixingStyle}>
          <div style={colorItemStyle}>
            <div style={oxygenColorStyle}></div>
            <span style={colorLabelStyle}>Oxygen (Green): {Math.round(auroraColors.oxygen * 100)}%</span>
          </div>
          <div style={colorItemStyle}>
            <div style={nitrogenColorStyle}></div>
            <span style={colorLabelStyle}>Nitrogen (Purple): {Math.round(auroraColors.nitrogen * 100)}%</span>
          </div>
          <div style={colorItemStyle}>
            <div style={highOxygenColorStyle}></div>
            <span style={colorLabelStyle}>High Oxygen (Red): {Math.round(auroraColors.highOxygen * 100)}%</span>
          </div>
        </div>
        
        <div style={buttonContainerStyle}>
          <button style={resetButtonStyle} onClick={resetAurora}>
            Reset Aurora
          </button>
          <span style={scoreStyle}>Score: {score}</span>
        </div>
      </motion.div>

      {/* Educational Facts */}
      <motion.div
        style={factsStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 style={factsTitleStyle}>Aurora Facts! 🌌</h3>
        <ul style={factsListStyle}>
          <li>Oxygen gives off green and red light</li>
          <li>Nitrogen glows purple or blue!</li>
          <li>Auroras are nature's most beautiful light show!</li>
        </ul>
      </motion.div>

      {/* Target Colors */}
      <motion.div
        style={targetStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <h4 style={targetTitleStyle}>Target Colors:</h4>
        <div style={targetItemStyle}>
          <div style={targetColorStyle}></div>
          <span style={targetTextStyle}>Oxygen: {Math.round(targetColors.oxygen * 100)}%</span>
        </div>
        <div style={targetItemStyle}>
          <div style={targetColorStyle}></div>
          <span style={targetTextStyle}>Nitrogen: {Math.round(targetColors.nitrogen * 100)}%</span>
        </div>
        <div style={targetItemStyle}>
          <div style={targetColorStyle}></div>
          <span style={targetTextStyle}>High Oxygen: {Math.round(targetColors.highOxygen * 100)}%</span>
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
  cursor: 'crosshair',
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

const colorMixingStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '20px'
};

const colorItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const oxygenColorStyle = {
  width: '20px',
  height: '20px',
  background: '#00FF00',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
};

const nitrogenColorStyle = {
  width: '20px',
  height: '20px',
  background: '#8000FF',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(128, 0, 255, 0.5)'
};

const highOxygenColorStyle = {
  width: '20px',
  height: '20px',
  background: '#FF0000',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)'
};

const colorLabelStyle = {
  color: 'white',
  fontSize: '16px',
  fontFamily: 'Schoolbell, cursive'
};

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px'
};

const resetButtonStyle = {
  background: 'linear-gradient(45deg, #ffb300, #ff7043)',
  color: 'white',
  border: 'none',
  borderRadius: '16px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Schoolbell, cursive',
  boxShadow: '0 4px 16px rgba(255, 179, 0, 0.3)',
  transition: 'all 0.3s ease'
};

const scoreStyle = {
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

const targetStyle = {
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

const targetTitleStyle = {
  color: 'white',
  fontSize: '16px',
  margin: '0 0 12px 0',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: 'bold'
};

const targetItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px'
};

const targetColorStyle = {
  width: '16px',
  height: '16px',
  background: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '50%'
};

const targetTextStyle = {
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Schoolbell, cursive'
};

export default Level4AuroraCreation;
