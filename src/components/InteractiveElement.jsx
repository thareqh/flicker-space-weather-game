import React from 'react';
import { motion } from 'framer-motion';

const InteractiveElement = ({ children, onActivate, label }) => {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate && onActivate();
    }
  };
  return (
    <motion.div 
      role="button"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={onActivate}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{ cursor:'pointer' }}
    >
      {children}
    </motion.div>
  );
};

export default InteractiveElement;


