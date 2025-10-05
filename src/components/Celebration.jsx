import React from 'react';
import { motion } from 'framer-motion';

const Celebration = ({ onComplete }) => {
  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        style={celebrationStyle}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <h1 style={titleStyle}>🎉 Congratulations! 🎉</h1>
        
        <motion.div
          style={messageStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p>You've completed the Flicker: Space Weather Adventure!</p>
          <p>You're now a space weather expert! 🌟</p>
        </motion.div>

        <motion.div
          style={starsContainerStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: '24px',
                color: '#ffd54f'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={() => onComplete && onComplete()}
          style={buttonStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again! 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Styles
const containerStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)',
  position: 'relative',
  overflow: 'hidden'
};

const celebrationStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: '40px',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  maxWidth: '600px',
  position: 'relative',
  zIndex: 10
};

const titleStyle = {
  fontSize: '48px',
  color: '#ffffff',
  margin: '0 0 24px 0',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
};

const messageStyle = {
  fontSize: '24px',
  color: '#ffffff',
  margin: '0 0 32px 0',
  lineHeight: '1.6'
};

const starsContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -1
};

const buttonStyle = {
  background: 'linear-gradient(45deg, #ffd54f, #ff7043)',
  color: '#1b1b1b',
  border: 'none',
  borderRadius: '16px',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '20px 40px',
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
};

export default Celebration;
