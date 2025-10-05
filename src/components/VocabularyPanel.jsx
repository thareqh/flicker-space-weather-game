import React from 'react';
import { motion } from 'framer-motion';

const VocabularyPanel = ({ isOpen, onClose }) => {
  const vocabulary = [
    {
      term: "Space Weather",
      definition: "Changing conditions in space caused by solar activity that can affect Earth and our technology, including satellites and power grids.",
      emoji: "🌌"
    },
    {
      term: "Solar Flare",
      definition: "Intense bursts of radiation from the Sun's surface that release energy equivalent to millions of nuclear bombs!",
      emoji: "☀️"
    },
    {
      term: "Coronal Mass Ejection (CME)",
      definition: "Huge clouds of solar particles and magnetic field that the Sun ejects into space at speeds up to 7 million mph!",
      emoji: "💫"
    },
    {
      term: "Aurora",
      definition: "Beautiful light displays caused when solar particles collide with Earth's atmosphere. Colors depend on which gas particles are hit!",
      emoji: "🌌"
    },
    {
      term: "Magnetosphere",
      definition: "Earth's magnetic field that acts like a protective shield, deflecting most harmful solar particles away from our planet.",
      emoji: "🛡️"
    },
    {
      term: "Atmosphere",
      definition: "The layer of gases surrounding Earth that protects us from harmful radiation and provides the air we breathe.",
      emoji: "🌍"
    },
    {
      term: "Solar Wind",
      definition: "A continuous stream of charged particles flowing from the Sun at about 1 million mph, affecting the entire solar system.",
      emoji: "💨"
    },
    {
      term: "Geomagnetic Storm",
      definition: "Disturbances in Earth's magnetic field caused by solar activity that can affect power grids, GPS, and radio communications.",
      emoji: "⚡"
    }
  ];

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
          <h2 style={titleStyle}>Space Weather Dictionary 📚</h2>
          <button 
            onClick={onClose}
            style={closeButtonStyle}
            aria-label="Close vocabulary"
          >
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          <p style={introStyle}>
            Learn all the cool space weather words! These are the special terms scientists use to talk about what happens in space.
          </p>
          
          <div style={vocabularyListStyle}>
            {vocabulary.map((item, index) => (
              <motion.div
                key={index}
                style={vocabularyItemStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div style={termHeaderStyle}>
                  <span style={emojiStyle}>{item.emoji}</span>
                  <h3 style={termStyle}>{item.term}</h3>
                </div>
                <p style={definitionStyle}>{item.definition}</p>
              </motion.div>
            ))}
          </div>

          <div style={footerStyle}>
            <p style={footerTextStyle}>
              💡 <strong>Fun Fact:</strong> Scientists use these special words to help us understand space weather better!
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
  maxWidth: '600px',
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
  fontSize: '28px',
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
  fontSize: '18px',
  color: '#333',
  margin: '0 0 24px 0',
  lineHeight: '1.6',
  textAlign: 'center',
  fontStyle: 'italic'
};

const vocabularyListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const vocabularyItemStyle = {
  background: 'rgba(26, 35, 126, 0.05)',
  borderRadius: '12px',
  padding: '20px',
  border: '2px solid rgba(26, 35, 126, 0.1)'
};

const termHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px'
};

const emojiStyle = {
  fontSize: '24px'
};

const termStyle = {
  fontSize: '20px',
  color: '#1a237e',
  margin: 0,
  fontWeight: 'bold'
};

const definitionStyle = {
  fontSize: '16px',
  color: '#333',
  margin: 0,
  lineHeight: '1.6'
};

const footerStyle = {
  marginTop: '24px',
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

export default VocabularyPanel;
