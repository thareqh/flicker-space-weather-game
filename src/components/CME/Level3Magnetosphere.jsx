import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import earthImage from '../../assets/images/earth.png';

const Level3Magnetosphere = ({ onComplete, onProgress, levelData }) => {
  const [cmePosition, setCmePosition] = useState({ x: 100, y: window.innerHeight / 2 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth - 200, y: window.innerHeight / 2 });
  const [magneticFieldStrength, setMagneticFieldStrength] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hitLocation, setHitLocation] = useState(null);
  const [instructions, setInstructions] = useState("Click near the poles to create auroras! Avoid the equator!");
  const canvasRef = useRef(null);
  const [earthPosition] = useState({ x: window.innerWidth - 150, y: window.innerHeight / 2 });

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
      for (let i = 0; i < 50; i++) {
        const x = (i * 37) % canvas.width;
        const y = (i * 41) % canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(x, y, 1, 1);
      }
      
      // Draw Earth with image
      const earthSize = 120;
      
      // Draw Earth's atmosphere glow
      ctx.shadowColor = 'rgba(74, 144, 226, 0.5)';
      ctx.shadowBlur = 25;
      ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
      ctx.beginPath();
      ctx.arc(earthPosition.x, earthPosition.y, earthSize + 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw Earth image
      const earthImg = new Image();
      earthImg.src = earthImage;
      ctx.drawImage(earthImg, earthPosition.x - earthSize/2, earthPosition.y - earthSize/2, earthSize, earthSize);
      
      // Draw Earth's magnetosphere with glow effect
      ctx.shadowColor = `rgba(0, 150, 255, ${0.5 + magneticFieldStrength * 0.5})`;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = `rgba(0, 150, 255, ${0.3 + magneticFieldStrength * 0.7})`;
      ctx.lineWidth = 3 + magneticFieldStrength * 2;
      ctx.beginPath();
      ctx.arc(earthPosition.x, earthPosition.y, 150 + magneticFieldStrength * 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw magnetic field lines
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        const startX = earthPosition.x + Math.cos(angle) * 60;
        const startY = earthPosition.y + Math.sin(angle) * 60;
        const endX = earthPosition.x + Math.cos(angle) * (120 + magneticFieldStrength * 30);
        const endY = earthPosition.y + Math.sin(angle) * (120 + magneticFieldStrength * 30);
        
        ctx.strokeStyle = `rgba(0, 150, 255, ${0.4 + magneticFieldStrength * 0.6})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(
          startX + (endX - startX) / 2 + Math.sin(angle) * 20,
          startY + (endY - startY) / 2 - Math.cos(angle) * 20,
          endX, endY
        );
        ctx.stroke();
      }
      
      // Draw CME
      ctx.fillStyle = 'rgba(255, 235, 59, 0.8)';
      ctx.beginPath();
      ctx.arc(cmePosition.x, cmePosition.y, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 235, 59, 1)';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw hit location indicator
      if (hitLocation) {
        const isGoodHit = Math.abs(hitLocation.y - earthPosition.y) > 40; // Near poles
        ctx.fillStyle = isGoodHit ? 'rgba(0, 255, 0, 0.6)' : 'rgba(255, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(hitLocation.x, hitLocation.y, 15, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw pole indicators
      ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(earthPosition.x, earthPosition.y - 40, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(earthPosition.x, earthPosition.y + 40, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw equator warning
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(earthPosition.x, earthPosition.y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    draw();
  }, [cmePosition, magneticFieldStrength, hitLocation, earthPosition]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Check if click is near Earth
    const distanceToEarth = Math.sqrt(
      Math.pow(clickX - earthPosition.x, 2) + Math.pow(clickY - earthPosition.y, 2)
    );
    
    if (distanceToEarth < 150) {
      setHitLocation({ x: clickX, y: clickY });
      setIsInteracting(true);
      
      // Check if it's a good hit (near poles)
      const isGoodHit = Math.abs(clickY - earthPosition.y) > 40;
      
      if (isGoodHit) {
        setInstructions("Great! You hit near the poles! Auroras will form!");
        setMagneticFieldStrength(1);
        onProgress(100);
        
        // Complete level after a delay
        setTimeout(() => {
          onComplete(150);
        }, 2000);
      } else {
        setInstructions("Oops! You hit the equator - this causes geomagnetic storms! Try again!");
        setMagneticFieldStrength(0.3);
        onProgress(20);
        
        // Reset after a delay
        setTimeout(() => {
          setHitLocation(null);
          setIsInteracting(false);
          setInstructions("Click near the poles to create auroras! Avoid the equator!");
        }, 2000);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isInteracting) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Move CME toward mouse
      const dx = mouseX - cmePosition.x;
      const dy = mouseY - cmePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        setCmePosition(prev => ({
          x: prev.x + (dx / distance) * 3,
          y: prev.y + (dy / distance) * 3
        }));
      }
      
      // Update progress based on distance to Earth
      const distanceToEarth = Math.sqrt(
        Math.pow(mouseX - earthPosition.x, 2) + Math.pow(mouseY - earthPosition.y, 2)
      );
      const progress = Math.max(0, Math.min(80, (200 - distanceToEarth) / 2));
      onProgress(progress);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Canvas for game elements */}
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
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
        <div style={magneticFieldStyle}>
          <span style={fieldLabelStyle}>Magnetic Field Strength:</span>
          <div style={fieldBarStyle}>
            <motion.div
              style={fieldBarFillStyle}
              animate={{ width: `${magneticFieldStrength * 100}%` }}
              transition={{ duration: 0.5 }}
            />
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
        <h3 style={factsTitleStyle}>Magnetosphere Facts! 🛡️</h3>
        <ul style={factsListStyle}>
          <li>Earth's magnetosphere deflects most charged particles</li>
          <li>When particles follow magnetic field lines near the poles, they excite atmospheric gases, creating auroras!</li>
          <li>The magnetosphere is like Earth's invisible force field!</li>
        </ul>
      </motion.div>

      {/* Hit Zones Guide */}
      <motion.div
        style={zonesStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <h4 style={zonesTitleStyle}>Hit Zones:</h4>
        <div style={zoneItemStyle}>
          <div style={goodZoneStyle}></div>
          <span style={zoneTextStyle}>Good - Creates Auroras! 🌌</span>
        </div>
        <div style={zoneItemStyle}>
          <div style={badZoneStyle}></div>
          <span style={zoneTextStyle}>Bad - Geomagnetic Storm! ⚡</span>
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

const magneticFieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
};

const fieldLabelStyle = {
  color: 'white',
  fontSize: '16px',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: '600'
};

const fieldBarStyle = {
  width: '300px',
  height: '20px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
  overflow: 'hidden',
  border: '2px solid rgba(255, 255, 255, 0.3)'
};

const fieldBarFillStyle = {
  height: '100%',
  background: 'linear-gradient(90deg, #0099ff, #00ccff)',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 153, 255, 0.5)'
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

const zonesStyle = {
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

const zonesTitleStyle = {
  color: 'white',
  fontSize: '16px',
  margin: '0 0 12px 0',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: 'bold'
};

const zoneItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px'
};

const goodZoneStyle = {
  width: '16px',
  height: '16px',
  background: 'rgba(0, 255, 0, 0.6)',
  borderRadius: '50%'
};

const badZoneStyle = {
  width: '16px',
  height: '16px',
  background: 'rgba(255, 0, 0, 0.6)',
  borderRadius: '50%'
};

const zoneTextStyle = {
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Schoolbell, cursive'
};

export default Level3Magnetosphere;
