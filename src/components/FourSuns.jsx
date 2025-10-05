import React from 'react';
import { motion } from 'framer-motion';
import sunImage from '../assets/images/sun.png';

const FourSuns = () => {
  return (
    <div style={containerStyle}>
      {/* Top-Left Sun - Happy, winking */}
      <motion.div
        style={{
          ...sunStyle,
          position: 'absolute',
          top: '10%',
          left: '15%',
          transform: 'scale(0.8)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.8 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <img src={sunImage} alt="Happy sun" style={sunImageStyle} />
        <div style={{
          ...faceStyle,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* Winking left eye */}
          <div style={{
            position: 'absolute',
            left: '30%',
            top: '35%',
            width: '8px',
            height: '3px',
            background: '#000',
            borderRadius: '2px'
          }} />
          {/* Right eye */}
          <div style={{
            position: 'absolute',
            right: '30%',
            top: '35%',
            width: '6px',
            height: '6px',
            background: '#000',
            borderRadius: '50%'
          }} />
          {/* Smile */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '60%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '10px',
            border: '2px solid #000',
            borderTop: 'none',
            borderRadius: '0 0 20px 20px'
          }} />
          {/* Blush */}
          <div style={{
            position: 'absolute',
            left: '15%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            right: '15%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
        </div>
      </motion.div>

      {/* Top-Right Sun - Inquisitive */}
      <motion.div
        style={{
          ...sunStyle,
          position: 'absolute',
          top: '10%',
          right: '15%',
          transform: 'scale(0.8)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.8 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <img src={sunImage} alt="Curious sun" style={sunImageStyle} />
        <div style={{
          ...faceStyle,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* Both eyes open, looking left */}
          <div style={{
            position: 'absolute',
            left: '25%',
            top: '35%',
            width: '6px',
            height: '6px',
            background: '#000',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            right: '25%',
            top: '35%',
            width: '6px',
            height: '6px',
            background: '#000',
            borderRadius: '50%'
          }} />
          {/* Small smile */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '60%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '8px',
            border: '2px solid #000',
            borderTop: 'none',
            borderRadius: '0 0 16px 16px'
          }} />
          {/* Blush */}
          <div style={{
            position: 'absolute',
            left: '10%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
        </div>
      </motion.div>

      {/* Bottom-Left Sun - Speaking */}
      <motion.div
        style={{
          ...sunStyle,
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          transform: 'scale(0.8)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.8 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <img src={sunImage} alt="Speaking sun" style={sunImageStyle} />
        <div style={{
          ...faceStyle,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* Eyes looking right */}
          <div style={{
            position: 'absolute',
            left: '25%',
            top: '35%',
            width: '6px',
            height: '6px',
            background: '#000',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            right: '25%',
            top: '35%',
            width: '6px',
            height: '6px',
            background: '#000',
            borderRadius: '50%'
          }} />
          {/* Speaking mouth */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '60%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '8px',
            border: '2px solid #000',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px'
          }} />
          {/* Blush */}
          <div style={{
            position: 'absolute',
            left: '10%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
        </div>
        
        {/* Speech bubble */}
        <motion.div
          style={{
            position: 'absolute',
            right: '-80px',
            top: '20%',
            width: '60px',
            height: '40px',
            background: '#fff',
            borderRadius: '20px',
            border: '2px solid #000'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div style={{
            position: 'absolute',
            right: '-8px',
            bottom: '10px',
            width: '0',
            height: '0',
            borderLeft: '8px solid #fff',
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent'
          }} />
          <div style={{
            position: 'absolute',
            right: '-10px',
            bottom: '10px',
            width: '0',
            height: '0',
            borderLeft: '10px solid #000',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent'
          }} />
        </motion.div>
      </motion.div>

      {/* Bottom-Right Sun - Excited/Laughing */}
      <motion.div
        style={{
          ...sunStyle,
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          transform: 'scale(0.8)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.8 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <img src={sunImage} alt="Excited sun" style={sunImageStyle} />
        <div style={{
          ...faceStyle,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* Closed eyes (V shapes) */}
          <div style={{
            position: 'absolute',
            left: '30%',
            top: '35%',
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '8px solid #000'
          }} />
          <div style={{
            position: 'absolute',
            right: '30%',
            top: '35%',
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '8px solid #000'
          }} />
          {/* Big laughing mouth */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '55%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '16px',
            background: '#ff7043',
            borderRadius: '50%'
          }} />
          {/* Blush */}
          <div style={{
            position: 'absolute',
            left: '15%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            right: '15%',
            top: '50%',
            width: '8px',
            height: '6px',
            background: '#ff69b4',
            borderRadius: '50%'
          }} />
        </div>
      </motion.div>
    </div>
  );
};

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  pointerEvents: 'none'
};

const sunStyle = {
  width: '120px',
  height: '120px',
  position: 'relative'
};

const sunImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};

const faceStyle = {
  width: '100%',
  height: '100%',
  pointerEvents: 'none'
};

export default FourSuns;
