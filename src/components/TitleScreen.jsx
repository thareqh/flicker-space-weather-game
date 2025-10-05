import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import rocketImage from '../assets/images/rocket.png';
import earthImage from '../assets/images/earth.png';
import asteroidImage from '../assets/images/asteroid.png';
import sunImage from '../assets/images/sun.png';
import satelliteImage from '../assets/images/satellite.png';
import playButtonImage from '../assets/images/play button.png';

const TitleScreen = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/story');
  };

  return (
    <motion.div 
      className="title-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={containerStyle}
    >
      {/* Background with stars */}
      <div style={backgroundStyle}>
        <div style={starsStyle}>
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: Math.random() > 0.5 ? '#ffffff' : '#ffd54f',
                borderRadius: '50%',
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
              }}
            />
          ))}
        </div>
      </div>

      {/* Central Title */}
      <div style={titleContainerStyle} className="title-container">
        <motion.h1 
          style={mainTitleStyle}
          className="title-screen"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          FLICKER
        </motion.h1>
        
        <motion.p 
          style={subtitleStyle}
          className="title-screen"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          A Space Weather Adventure
        </motion.p>
        


        {/* Start Game Button */}
        <motion.button
          onClick={startGame}
          style={startButtonStyle}
          className="title-screen"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={playButtonImage} alt="Start Adventure" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </motion.button>

      </div>

      {/* Rocket - Orbiting Earth */}
      <motion.div
        className="rocket-container"
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '12%',
          width: '100px',
          height: '120px',
          zIndex: 6,
          transformOrigin: 'center center'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          rotate: [360, 0]
        }}
        transition={{ 
          delay: 1, 
          duration: 1,
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <motion.img 
          src={rocketImage} 
          alt="Rocket" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 12px rgba(244, 67, 54, 0.6))',
            position: 'absolute',
            left: '0px',
            top: '-350px'
          }}
          animate={{
            rotate: [-360, 0]
          }}
          transition={{
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      </motion.div>

      {/* Asteroids - Mid Left */}
      <motion.div
        className="asteroids-container"
        style={asteroidsContainerStyle}
        initial={{ x: -50, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          delay: 1.3, 
          duration: 0.8,
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <img src={asteroidImage} alt="Asteroids" style={asteroidImageStyle} />
      </motion.div>

      {/* Earth - Bottom Left (Large) */}
      <motion.div
        className="earth-container"
        style={earthContainerStyle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: [0, 360]
        }}
        transition={{ 
          delay: 1.6, 
          duration: 0.8,
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <img src={earthImage} alt="Earth" style={earthImageStyle} />
      </motion.div>

      {/* Satellite - Upper Right */}
      <motion.div
        className="satellite-container"
        style={satelliteContainerStyle}
        initial={{ x: 50, y: -50, opacity: 0 }}
        animate={{ 
          x: [0, 20, -10, 0],
          y: [0, -15, 10, 0],
          opacity: 1
        }}
        transition={{ 
          delay: 1.4, 
          duration: 1,
          x: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <img src={satelliteImage} alt="Satellite" style={satelliteImageStyle} />
      </motion.div>

      {/* Sun - Upper Right (Single Large Sun) */}
      <motion.div
        className="sun-container"
        style={sunsContainerStyle}
        initial={{ x: 100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          delay: 1.2, 
          duration: 1,
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <img src={sunImage} alt="Sun" style={singleSunStyle} />
      </motion.div>
    </motion.div>
  );
};

// Styles
const containerStyle = {
  width: '100%',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 30%, #3949ab 70%, #3f51b5 100%)',
  boxShadow: 'inset 0 0 100px rgba(0, 150, 255, 0.1)'
};

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)',
  zIndex: -1
};

const starsStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

const titleContainerStyle = {
  textAlign: 'center',
  zIndex: 10,
  maxWidth: '600px',
  padding: '0 20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: '-40px'
};

const mainTitleStyle = {
  fontSize: '80px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0 0 16px 0',
  fontFamily: 'Schoolbell, cursive',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  letterSpacing: '4px'
};

const subtitleStyle = {
  fontSize: '24px',
  color: '#ffffff',
  margin: '0 0 32px 0',
  fontFamily: 'Schoolbell, cursive',
  fontWeight: '300',
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
};

const starIconStyle = {
  width: '60px',
  height: '60px',
  margin: '0 auto 40px',
  position: 'relative',
  zIndex: 10
};

const starOuterStyle = {
  width: '100%',
  height: '100%',
  background: '#ffd54f',
  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  position: 'absolute'
};

const starInnerStyle = {
  width: '40px',
  height: '40px',
  background: '#ffffff',
  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  position: 'absolute',
  top: '10px',
  left: '10px'
};

const startButtonStyle = {
  background: 'transparent',
  border: 'none',
  width: '120px',
  height: '120px',
  cursor: 'pointer',
  padding: 0,
  borderRadius: '50%',
  position: 'relative',
  zIndex: 10
};

// Rocket - Upper Left (Improved placement)
const rocketContainerStyle = {
  position: 'absolute',
  top: '12%',
  left: '12%',
  width: '100px',
  height: '120px',
  zIndex: 6
};

const rocketImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: 'drop-shadow(0 0 12px rgba(244, 67, 54, 0.6))'
};

// Asteroids - Mid Left (Better positioned above Earth, left of title)
const asteroidsContainerStyle = {
  position: 'absolute',
  top: '35%',
  left: '18%',
  width: '120px',
  height: '100px',
  zIndex: 5
};

const asteroidImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: 'drop-shadow(0 0 8px rgba(158, 158, 158, 0.5))'
};

// Earth - Bottom Left (Large but reasonable size, half visible at edge)
const earthContainerStyle = {
  position: 'absolute',
  bottom: '-15%',
  left: '-10%',
  width: '600px',
  height: '600px',
  zIndex: 3
};

const earthImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: 'drop-shadow(0 0 25px rgba(33, 150, 243, 0.7))'
};

// Sun - Upper Right (Visible on screen with edge effect)
const sunsContainerStyle = {
  position: 'absolute',
  top: '-15%',
  right: '-10%',
  width: '2000px',
  height: '2000px',
  zIndex: 4
};

const singleSunStyle = {
  position: 'absolute',
  top: '-10%',
  right: '-8%',
  width: '800px',
  height: '800px',
  objectFit: 'contain',
  filter: 'drop-shadow(0 0 30px rgba(255, 235, 59, 0.9))'
};

// Satellite - Upper Right (orbiting motion)
const satelliteContainerStyle = {
  position: 'absolute',
  top: '20%',
  right: '25%',
  width: '80px',
  height: '80px',
  zIndex: 7
};

const satelliteImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: 'drop-shadow(0 0 10px rgba(100, 181, 246, 0.8))'
};


export default TitleScreen;