import React from 'react';
import { motion } from 'framer-motion';
import SettingsPanel from './SettingsPanel.jsx';

const FloatingSettings = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        style={settingsButtonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        ⚙️
      </motion.button>
      
      <SettingsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const settingsButtonStyle = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.2)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  color: '#ffffff',
  fontSize: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  zIndex: 100,
  transition: 'all 0.3s ease'
};

export default FloatingSettings;
