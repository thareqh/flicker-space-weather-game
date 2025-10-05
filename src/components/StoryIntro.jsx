import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlickerCharacter from './FlickerCharacter.jsx';
import cloudImage from '../assets/images/cloud.png';
import playButtonImage from '../assets/images/play.png';

const StoryIntro = () => {
  const navigate = useNavigate();
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [conversationStep, setConversationStep] = React.useState(0);

  const conversationSteps = [
    "Hello there! I'm Flicker, your friendly Sun! 🌟 I'm so excited to meet you!",
    "I have an amazing story to tell you about space weather and how my energy travels through space! ☀️",
    "Ready to learn about solar flares, CMEs, and the beautiful auroras I create? Let's begin our adventure! 🚀"
  ];

  const handleCloudTap = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setConversationStep(1);
    }
  };

  const handleDialogTap = () => {
    if (conversationStep < conversationSteps.length) {
      setConversationStep(prev => prev + 1);
    } else {
      navigate('/story-continue');
    }
  };

  const continueStory = () => {
    navigate('/story-continue');
  };

  return (
    <div style={containerStyle}>
      {/* Background */}
      <div style={backgroundStyle} />


      {/* Background Stars */}
      <div style={starsBackgroundStyle}>
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            style={{
              ...starStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>


      {/* Title Section */}
      <motion.div
        style={titleSectionStyle}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={mainTitleStyle}>
          {isRevealed ? "CME Space Weather Adventure!" : "Hey! Who's that?"}
        </h1>
        <p style={subtitleStyle}>
          {isRevealed ? "Explore Coronal Mass Ejections with Flicker!" : "Tap the cloud to discover space weather!"}
        </p>
      </motion.div>

      {/* Central Character Area */}
      <div style={characterAreaStyle}>
        {/* Flicker Character */}
        <motion.div
          style={flickerContainerStyle}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ 
            scale: isRevealed ? 1.1 : 0.8,
            opacity: 1
          }}
          transition={{ duration: 0.8 }}
        >
          <FlickerCharacter 
            state="waving"
            onClick={() => {}}
          />
        </motion.div>


        {/* Multiple Clouds (tappable) - Positioned to cover Flicker */}
        <motion.div
          onClick={handleCloudTap}
          style={{
            ...cloud1Style,
            cursor: isRevealed ? 'default' : 'pointer',
            pointerEvents: isRevealed ? 'none' : 'auto'
          }}
          animate={{
            x: isRevealed ? 400 : 0,
            y: isRevealed ? -250 : 0,
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.8 : 1
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          whileHover={!isRevealed ? { scale: 1.05 } : {}}
          whileTap={!isRevealed ? { scale: 0.95 } : {}}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#ffffff',
              WebkitMaskImage: `url(${cloudImage})`,
              maskImage: `url(${cloudImage})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center'
            }}
          />
          <img
            src={cloudImage}
            alt="Cloud 1"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </motion.div>
        
        <motion.div
          onClick={handleCloudTap}
          style={{
            ...cloud2Style,
            cursor: isRevealed ? 'default' : 'pointer',
            pointerEvents: isRevealed ? 'none' : 'auto'
          }}
          animate={{
            x: isRevealed ? 450 : 0,
            y: isRevealed ? -230 : 0,
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.8 : 1
          }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
          whileHover={!isRevealed ? { scale: 1.05 } : {}}
          whileTap={!isRevealed ? { scale: 0.95 } : {}}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#ffffff',
              WebkitMaskImage: `url(${cloudImage})`,
              maskImage: `url(${cloudImage})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center'
            }}
          />
          <img
            src={cloudImage}
            alt="Cloud 2"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </motion.div>
        
        <motion.div
          onClick={handleCloudTap}
          style={{
            ...cloud3Style,
            cursor: isRevealed ? 'default' : 'pointer',
            pointerEvents: isRevealed ? 'none' : 'auto'
          }}
          animate={{
            x: isRevealed ? 350 : 0,
            y: isRevealed ? -270 : 0,
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.8 : 1
          }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          whileHover={!isRevealed ? { scale: 1.05 } : {}}
          whileTap={!isRevealed ? { scale: 0.95 } : {}}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#ffffff',
              WebkitMaskImage: `url(${cloudImage})`,
              maskImage: `url(${cloudImage})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center'
            }}
          />
          <img
            src={cloudImage}
            alt="Cloud 3"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Content Area */}
      <div style={bottomContentStyle}>
        {/* Conversation Text */}
        {isRevealed && conversationStep > 0 && (
          <motion.div
            style={conversationContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={conversationStep}
              style={conversationBubbleStyle}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={handleDialogTap}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p style={conversationTextStyle}>
                {conversationSteps[conversationStep - 1]}
              </p>
              <motion.p 
                style={tapHintStyle}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Tap to continue...
              </motion.p>
            </motion.div>
          </motion.div>
        )}


        {/* Skip Button */}
        {isRevealed && (
          <motion.div
            style={buttonContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              onClick={continueStory}
              style={skipButtonStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip to Story
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Styles - Improved design with consistent styling
const containerStyle = {
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(135deg, #0d1b4a 0%, #1a237e 30%, #283593 70%, #3949ab 100%)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: 'inset 0 0 100px rgba(0, 150, 255, 0.1)'
};

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(circle at 20% 80%, rgba(255, 235, 59, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 235, 59, 0.08) 0%, transparent 50%)
  `,
  zIndex: 1
};


const starsBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2
};

const starStyle = {
  position: 'absolute',
  width: '3px',
  height: '3px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
};

// Clean, organized layout styles
const titleSectionStyle = {
  position: 'absolute',
  top: '80px',
  left: 0,
  right: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0 20px'
};

const mainTitleStyle = {
  fontSize: '52px',
  color: '#ffffff',
  margin: '0 0 12px 0',
  fontWeight: 'bold',
  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  fontFamily: 'Schoolbell, cursive',
  lineHeight: '1.1'
};

const subtitleStyle = {
  fontSize: '20px',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: 0,
  textShadow: '0 1px 4px rgba(0,0,0,0.3)',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: '400'
};

const characterAreaStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 5
};

const flickerContainerStyle = {
  width: '220px',
  height: '220px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 6,
  filter: 'drop-shadow(0 0 30px rgba(255, 179, 0, 0.4))'
};



const cloud1Style = {
  position: 'absolute',
  width: '320px',
  height: '240px',
  top: 'calc(50% - 140px)',
  left: 'calc(50% - 100px)',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  zIndex: 6
};

const cloud2Style = {
  position: 'absolute',
  width: '300px',
  height: '220px',
  top: 'calc(50% - 200px)',
  left: 'calc(50% - 60px)',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  zIndex: 5,
  opacity: 0.95
};

const cloud3Style = {
  position: 'absolute',
  width: '280px',
  height: '200px',
  top: 'calc(50% - 120px)',
  left: 'calc(50% - 180px)',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  zIndex: 4,
  opacity: 0.9
};

const bottomContentStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  zIndex: 10,
  padding: '0 20px'
};


const conversationContainerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
};

const conversationBubbleStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: '20px 30px',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  maxWidth: '450px',
  width: '100%',
  cursor: 'pointer'
};

const conversationTextStyle = {
  fontSize: '20px',
  color: '#ffffff',
  margin: '0 0 10px 0',
  textAlign: 'center',
  lineHeight: '1.4',
  fontWeight: 'bold',
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  fontFamily: 'Schoolbell, cursive'
};

const tapHintStyle = {
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.7)',
  margin: 0,
  textAlign: 'center',
  fontStyle: 'italic',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  fontFamily: 'Schoolbell, cursive'
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px'
};

const skipButtonStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '16px',
  padding: '12px 24px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Schoolbell, cursive'
};


export default StoryIntro;
