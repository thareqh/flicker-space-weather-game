import React from 'react';
import { motion } from 'framer-motion';
import defaultImage from '../assets/images/default.png';
import excitedImage from '../assets/images/excited.png';
import sneezeImage from '../assets/images/sneeze.png';
import wavingImage from '../assets/images/waving.png';
import { audioManager } from '../utils/audioManager.js';

const FlickerCharacter = ({ state = 'idle', onClick }) => {
  const [emotion, setEmotion] = React.useState('default');
  const [sparkles, setSparkles] = React.useState([]);

  const getImageForState = () => {
    switch (state) {
      case 'solar-flare':
        return sneezeImage;
      case 'sneeze':
        return sneezeImage;
      case 'excited':
        return excitedImage;
      case 'waving':
        return wavingImage;
      default:
        return defaultImage;
    }
  };

  const handleClick = () => {
    audioManager.playSound('click');
    setEmotion('excited');
    if (state === 'solar-flare') {
      triggerSolarFlare();
    } else {
      triggerSparklePulse();
    }
    onClick && onClick();
  };

  const triggerSparklePulse = () => {
    audioManager.playSound('sparkle');
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 120 - 60,
      y: Math.random() * 120 - 60,
      size: Math.random() * 8 + 6,
      color: ['#ffd54f', '#ff7043', '#ffeb3b', '#ffffff'][Math.floor(Math.random() * 4)]
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  };

  const triggerSolarFlare = () => {
    audioManager.playSound('solarFlare');
    const newSparkles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      size: Math.random() * 12 + 8,
      color: ['#ff5722', '#ff9800', '#ffc107', '#ffeb3b'][Math.floor(Math.random() * 4)]
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2500);
  };

  return (
    <div style={{ position:'relative', width: 240, height: 240 }}>
      <motion.button
        aria-label="Flicker the friendly sun"
        onClick={handleClick}
        style={buttonStyle}
        animate={{ 
          scale: emotion === 'excited' ? [1, 1.06, 1] : [1, 1.02, 1],
          rotate: emotion === 'excited' ? [0, 4, -4, 0] : 0
        }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={getImageForState()} 
          alt="Flicker, the friendly sun character"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%'
          }}
        />
      </motion.button>
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0,1,0], scale: [0,1,0], x: s.x, y: s.y }}
          transition={{ duration: 1.2 }}
          style={{ 
            position:'absolute', 
            left: 120, 
            top: 120, 
            width: s.size, 
            height: s.size, 
            borderRadius: 999, 
            background: s.color || 'white', 
            boxShadow:`0 0 15px ${s.color || '#ffffff'}`,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

const buttonStyle = {
  width: 240,
  height: 240,
  borderRadius: 999,
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 0 40px rgba(255, 179, 0, 0.35)',
};

export default FlickerCharacter;


