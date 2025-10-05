import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/audioManager.js';
import VocabularyPanel from './VocabularyPanel.jsx';

const SettingsPanel = ({ isOpen, onClose }) => {
  const [audioEnabled, setAudioEnabled] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(18);
  const [showVocabulary, setShowVocabulary] = React.useState(false);

  React.useEffect(() => {
    const savedAudio = localStorage.getItem('flicker-audio-enabled');
    const savedFontSize = localStorage.getItem('flicker-font-size');
    
    if (savedAudio !== null) {
      const enabled = savedAudio === 'true';
      setAudioEnabled(enabled);
      audioManager.setEnabled(enabled);
    }
    
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);

  const handleAudioToggle = (enabled) => {
    setAudioEnabled(enabled);
    audioManager.setEnabled(enabled);
    localStorage.setItem('flicker-audio-enabled', enabled.toString());
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('flicker-font-size', size.toString());
    document.documentElement.style.setProperty('--base-font-size', `${size}px`);
  };

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
          <h2 style={titleStyle}>Settings ⚙️</h2>
          <button 
            onClick={onClose}
            style={closeButtonStyle}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          <div style={settingGroupStyle}>
            <h3 style={settingTitleStyle}>🔊 Audio</h3>
            <div style={toggleContainerStyle}>
              <label style={toggleLabelStyle}>
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={(e) => handleAudioToggle(e.target.checked)}
                  style={toggleInputStyle}
                />
                <span style={getToggleSliderStyle(audioEnabled)} />
                Sound Effects
              </label>
            </div>
          </div>

          <div style={settingGroupStyle}>
            <h3 style={settingTitleStyle}>📝 Text Size</h3>
            <div style={fontSizeContainerStyle}>
              <label style={fontSizeLabelStyle}>
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="16"
                max="24"
                value={fontSize}
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                style={fontSizeSliderStyle}
              />
              <div style={fontSizePreviewStyle}>
                <span style={{ fontSize: `${fontSize}px` }}>
                  Sample text at {fontSize}px
                </span>
              </div>
            </div>
          </div>

          <div style={settingGroupStyle}>
            <h3 style={settingTitleStyle}>♿ Accessibility</h3>
            <div style={accessibilityInfoStyle}>
              <p>• Large, touch-friendly buttons</p>
              <p>• Keyboard navigation support</p>
              <p>• High contrast colors</p>
              <p>• Screen reader compatible</p>
              <p>• Adjustable text sizes</p>
            </div>
          </div>

          <div style={settingGroupStyle}>
            <h3 style={settingTitleStyle}>📚 Learning</h3>
            <motion.button
              onClick={() => setShowVocabulary(true)}
              style={vocabularyButtonStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📖 Space Weather Dictionary
            </motion.button>
          </div>

          <div style={settingGroupStyle}>
            <h3 style={settingTitleStyle}>ℹ️ About</h3>
            <div style={aboutStyle}>
              <p><strong>Flicker: Space Weather Adventure</strong></p>
              <p>Educational game for ages 6-10</p>
              <p>Learn about space weather with Flicker!</p>
              <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.8 }}>
                Created with React, Framer Motion, and Web Audio API
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <VocabularyPanel 
        isOpen={showVocabulary} 
        onClose={() => setShowVocabulary(false)} 
      />
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
  maxWidth: '500px',
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

const settingGroupStyle = {
  marginBottom: '32px'
};

const settingTitleStyle = {
  fontSize: '20px',
  color: '#1a237e',
  margin: '0 0 16px 0',
  fontWeight: 'bold'
};

const toggleContainerStyle = {
  display: 'flex',
  alignItems: 'center'
};

const toggleLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '18px',
  color: '#333',
  gap: '12px'
};

const toggleInputStyle = {
  display: 'none'
};

const getToggleSliderStyle = (enabled) => ({
  width: '50px',
  height: '26px',
  background: enabled ? '#4caf50' : '#ccc',
  borderRadius: '26px',
  position: 'relative',
  transition: 'background 0.3s'
});

const fontSizeContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const fontSizeLabelStyle = {
  fontSize: '18px',
  color: '#333',
  fontWeight: 'bold'
};

const fontSizeSliderStyle = {
  width: '100%',
  height: '8px',
  background: '#ddd',
  borderRadius: '4px',
  outline: 'none',
  cursor: 'pointer'
};

const fontSizePreviewStyle = {
  padding: '12px',
  background: '#f5f5f5',
  borderRadius: '8px',
  textAlign: 'center',
  color: '#333'
};

const accessibilityInfoStyle = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '1.6'
};

const aboutStyle = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '1.6'
};

const vocabularyButtonStyle = {
  background: 'linear-gradient(45deg, #ffd54f, #ff7043)',
  color: '#1b1b1b',
  border: 'none',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '16px 24px',
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  width: '100%',
  marginBottom: '16px'
};

export default SettingsPanel;
