import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlickerCharacter from './FlickerCharacter.jsx';
import playButtonImage from '../assets/images/play button.png';
import nextButtonImage from '../assets/images/next button.png';
import previousButtonImage from '../assets/images/previous button.png';
import earthImage from '../assets/images/earth.png';
import auroraImage from '../assets/images/aurora.png';
import rocketImage from '../assets/images/rocket.png';
import asteroidImage from '../assets/images/asteroid.png';
import satelliteImage from '../assets/images/satellite.png';
import spacecraftImage from '../assets/images/spacecraft.png';
import moonImage from '../assets/images/moon.png';
import saturnImage from '../assets/images/saturn.png';
import sunImage from '../assets/images/sun.png';
import cClassImage from '../assets/images/c-class.png';
import mClassImage from '../assets/images/m-class.png';
import xClassImage from '../assets/images/x-class.png';

const StoryContinue = () => {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const storyScenes = [
    {
      id: 1,
      title: "Welcome to My Solar System!",
      flickerMessage: "Oh hi, I'm Flicker again! 🌟 I'm the center of everything here in our solar system. I provide light and warmth to all my planets!",
      background: "space-scene",
      flickerState: "waving",
      assets: ["earth", "moon", "saturn"]
    },
    {
      id: 2,
      title: "My Solar Family",
      flickerMessage: "I have 8 amazing planets that orbit around me! But Earth is my absolute favorite! 🌍 It's where all the life is, and I love watching over it!",
      background: "space-scene",
      flickerState: "excited",
      assets: ["earth", "moon", "asteroid", "saturn"]
    },
    {
      id: 3,
      title: "When I Get Excited - Solar Flares!",
      flickerMessage: "Sometimes I get so excited that I just can't contain my energy! 🌟 When that happens, I burst out with huge solar flares - like when you're so happy you just have to jump around!",
      background: "space-scene",
      flickerState: "excited",
      assets: ["earth"]
    },
    {
      id: 4,
      title: "Solar Flare Classes — from A to X",
      flickerMessage: "Did you know my flares come in different strengths? Scientists measure them like earthquakes! 📊 A-class flares are the weakest - almost hidden above my background light. B, C, M, and X-class flares get stronger and stronger!",
      background: "space-scene",
      flickerState: "excited",
      assets: ["sun"],
      customElements: [
        { type: "a-class", text: "A-class: weakest flares", emoji: "🔸", class: "a-class" },
        { type: "b-class", text: "B-class: slightly stronger", emoji: "🔹", class: "b-class" },
        { type: "c-class", text: "C-class: moderate flares", emoji: "🔷", class: "c-class" },
        { type: "m-class", text: "M-class: major flares", emoji: "🔶", class: "m-class" },
        { type: "x-class", text: "X-class: most powerful!", emoji: "🔴", class: "x-class" }
      ],
      educationalContent: {
        title: "Solar Flare Scale",
        description: "Think of it like the Richter scale for earthquakes: each class is 10× stronger than the one before it!",
        facts: [
          "An X flare is 10 times stronger than an M flare",
          "An X flare is 100× stronger than a C flare",
          "X-class flares can cause radio blackouts on Earth!"
        ]
      }
    },
    {
      id: 5,
      title: "When I Sneeze - CMEs!",
      flickerMessage: "And sometimes I sneeze! ☁️ When I sneeze, I send out giant clouds of charged particles called CMEs (Coronal Mass Ejections). It's like when you sneeze and everything around you gets a little messy!",
      background: "space-scene",
      flickerState: "sneeze",
      assets: ["earth"]
    },
    {
      id: 6,
      title: "My Energy Travels to Earth!",
      flickerMessage: "My solar flares and CMEs travel all the way to Earth! 🌍 They don't mean to cause trouble - they're just naturally flowing outward from me! It's like when you blow bubbles and they float away!",
      background: "space-scene",
      flickerState: "excited",
      assets: ["earth", "satellite", "spacecraft"],
      customElements: [
        { type: "satellite", text: "My energy makes satellites shake", emoji: "🛰️" },
        { type: "spacecraft", text: "Astronauts take shelter", emoji: "👩‍🚀" },
        { type: "earth", text: "Power grids get excited too", emoji: "⚡" }
      ]
    },
    {
      id: 7,
      title: "Earth's Amazing Protection!",
      flickerMessage: "But don't worry! Earth has amazing shields to protect everyone! 🛡️ Earth's magnetic field acts like a giant protective bubble that deflects most of my energy!",
      background: "space-scene",
      flickerState: "waving",
      assets: ["earth"]
    },
    {
      id: 8,
      title: "The Magic of Auroras!",
      flickerMessage: "When my energy reaches Earth's atmosphere, something magical happens! My charged particles create the most beautiful auroras! 🌌 It's like I'm painting the sky with colorful lights!",
      background: "aurora-scene",
      flickerState: "excited",
      assets: ["aurora"]
    },
    {
      id: 9,
      title: "NASA Scientists Watch Everything!",
      flickerMessage: "Scientists on Earth watch me 24/7 with special satellites! 🛰️ The closest one to me is the Parker Solar Probe - it gets so close it can almost touch my surface! It's like having a brave explorer right next to me!",
      background: "space-scene",
      flickerState: "waving",
      assets: ["satellite", "earth", "moon"],
      customElements: [
        { type: "satellite", text: "Parker Solar Probe - closest to me!", emoji: "🛰️", orbit: true },
        { type: "earth", text: "Other satellites watch from far away", emoji: "🌍" },
        { type: "moon", text: "All working together to study me!", emoji: "🌙" }
      ]
    },
    {
      id: 10,
      title: "Ready for Your Space Weather Adventure?",
      flickerMessage: "Now you're ready to explore space weather with me! 🎮 You'll get to experience what it's like to be me - the Sun - creating solar flares and CMEs that travel through space! Let's have an amazing adventure together!",
      background: "space-scene",
      flickerState: "excited",
      assets: ["rocket"],
      showGameButton: true
    }
  ];

  const nextScene = () => {
    if (currentScene < storyScenes.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene(prev => prev + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      // End of story, go to game
      navigate('/cme-game');
    }
  };

  const startCMEGame = () => {
    navigate('/cme-game');
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene(prev => prev - 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      navigate('/story');
    }
  };

  const currentStoryScene = storyScenes[currentScene];

  // Helper functions for assets and custom elements
  const getAssetImage = (asset) => {
    switch (asset) {
      case 'earth': return earthImage;
      case 'aurora': return auroraImage;
      case 'rocket': return rocketImage;
      case 'asteroid': return asteroidImage;
      case 'satellite': return satelliteImage;
      case 'spacecraft': return spacecraftImage;
      case 'moon': return moonImage;
      case 'saturn': return saturnImage;
      case 'sun': return sunImage;
      case 'a-class': return sunImage; // Use sun image for A class
      case 'b-class': return sunImage; // Use sun image for B class
      case 'c-class': return cClassImage;
      case 'm-class': return mClassImage;
      case 'x-class': return xClassImage;
      default: return earthImage;
    }
  };

  const getAssetPosition = (asset, index) => {
    const positions = {
        'earth': { bottom: '12%', left: '5%', width: '280px', height: '280px' },
      'aurora': { bottom: '5%', left: '-5%', width: '800px', height: '400px' },
      'rocket': { top: '8%', right: '8%', width: '100px', height: '130px' },
      'asteroid': { top: '60%', left: '15%', width: '35px', height: '35px' },
      'satellite': { top: '18%', left: '85%', width: '50px', height: '50px' },
      'spacecraft': { top: '35%', right: '15%', width: '80px', height: '80px' },
      'moon': { top: '25%', left: '2%', width: '40px', height: '40px' },
      'saturn': { bottom: '3%', right: '3%', width: '350px', height: '350px' },
      'sun': { top: '1%', left: '50%', transform: 'translateX(-50%)', width: '65px', height: '65px' },
      'a-class': { top: '15%', left: '10%', width: '60px', height: '60px' },
      'b-class': { top: '25%', left: '20%', width: '60px', height: '60px' },
      'c-class': { top: '35%', left: '30%', width: '60px', height: '60px' },
      'm-class': { top: '45%', left: '40%', width: '60px', height: '60px' },
      'x-class': { top: '55%', left: '50%', width: '60px', height: '60px' }
    };
    return positions[asset] || { top: '50%', left: '50%', width: '100px', height: '100px' };
  };

  const getCustomElementPosition = (index) => {
    const positions = [
      { top: '20%', left: '10%' },
      { top: '40%', right: '15%' },
      { bottom: '25%', left: '20%' }
    ];
    return positions[index] || { top: '50%', left: '50%' };
  };

  return (
    <div style={containerStyle}>
      {/* Background */}
      <div style={backgroundStyle} />

      {/* Header */}
      <div style={headerStyle}>
        <button onClick={prevScene} style={navButtonStyle}>
          ← Back
        </button>
      </div>

      {/* Title Section */}
      <motion.div
        style={titleSectionStyle}
        key={`title-${currentScene}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={titleStyle}>{currentStoryScene.title}</h1>
      </motion.div>

      {/* Background Assets */}
      {currentStoryScene.assets && (
        <div style={assetsContainerStyle}>
          {currentStoryScene.assets.map((asset, index) => (
            <motion.img
              key={`${asset}-${currentScene}`}
              src={getAssetImage(asset)}
              alt={asset}
              style={{
                ...assetStyle,
                position: 'absolute',
                ...getAssetPosition(asset, index)
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            />
          ))}
        </div>
      )}

      {/* Custom Elements for Scene 5 */}
      {currentStoryScene.customElements && (
        <div style={customElementsContainerStyle}>
          {currentStoryScene.customElements.map((element, index) => (
            <motion.div
              key={`custom-${index}`}
              style={{
                ...customElementStyle,
                ...getCustomElementPosition(index)
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
            >
              {/* Regular custom element */}
              <div style={customElementTextStyle}>
                <span style={emojiStyle}>{element.emoji}</span>
                {element.text}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div style={contentAreaStyle}>
        {/* Flicker Character */}
        <motion.div
          style={characterContainerStyle}
          key={currentScene}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1,
            scale: isTransitioning ? 0.8 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <FlickerCharacter 
            key={currentStoryScene.id}
            state={currentStoryScene.flickerState}
            onClick={() => {}}
          />
          
          {/* Orbiting Satellite for NASA Scientists scene */}
          {currentStoryScene.id === 8 && currentStoryScene.customElements?.some(el => el.orbit) && (
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '300px',
                height: '300px',
                transformOrigin: 'center center',
                zIndex: 7,
                marginLeft: '-150px',
                marginTop: '-150px',
                pointerEvents: 'none'
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.img
                src={getAssetImage('satellite')}
                alt="Orbiting Satellite"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'contain',
                  position: 'absolute',
                  left: '125px', // Position on the orbit circle
                  top: '0px',
                  filter: 'drop-shadow(0 0 10px rgba(0, 150, 255, 0.8))'
                }}
                animate={{
                  rotate: [-360, 0] // Counter-rotation for the image
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Story Text Bubble */}
        <motion.div
          style={storyBubbleStyle}
          key={`bubble-${currentScene}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? 30 : 0
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div style={bubbleContentStyle}>
            <p style={storyTextStyle}>{currentStoryScene.flickerMessage}</p>
          </div>
          <div style={bubbleTailStyle} />
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div style={navigationContainerStyle}>
        {/* Previous Button */}
        <motion.button
          onClick={prevScene}
          style={navIconButtonStyle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <img 
            src={previousButtonImage} 
            alt="Previous" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </motion.button>

        {/* CME Game Button - only show on last scene */}
        {currentStoryScene.showGameButton && (
          <motion.button
            onClick={startCMEGame}
            style={gameButtonStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            🎮 Start CME Adventure!
          </motion.button>
        )}

        {/* Next Button */}
        <motion.button
          onClick={nextScene}
          style={navIconButtonStyle}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <img 
            src={nextButtonImage} 
            alt={currentScene < storyScenes.length - 1 ? "Next" : "Start Adventure"} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </motion.button>
      </div>

      {/* Background Elements */}
      <div style={backgroundElementsStyle}>
        {Array.from({ length: 20 }, (_, i) => (
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
        
        {/* Floating decorative elements */}
        <motion.div
          style={decorativeElement1Style}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360]
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        
        <motion.div
          style={decorativeElement2Style}
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0]
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>
    </div>
  );
};

// Styles
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
    radial-gradient(circle at 20% 80%, rgba(255, 235, 59, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 235, 59, 0.1) 0%, transparent 50%)
  `,
  zIndex: 1
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 40px',
  zIndex: 10,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0
};

const navButtonStyle = {
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

const titleSectionStyle = {
  position: 'absolute',
  top: '80px',
  left: 0,
  right: 0,
  zIndex: 10,
  textAlign: 'center',
  padding: '0 40px'
};

const titleStyle = {
  color: 'white',
  fontSize: '36px',
  margin: 0,
  fontWeight: 'bold',
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  fontFamily: 'Schoolbell, cursive',
  lineHeight: '1.2',
  letterSpacing: '-0.5px'
};

const progressStyle = {
  color: 'white',
  fontSize: '16px',
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '10px 20px',
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  fontWeight: '600',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
};

const contentAreaStyle = {
  position: 'absolute',
  top: '150px',
  left: 0,
  right: 0,
  bottom: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px 50px',
  zIndex: 5,
  overflow: 'hidden'
};

const characterContainerStyle = {
  position: 'relative',
  zIndex: 4,
  marginBottom: '25px',
  filter: 'drop-shadow(0 0 25px rgba(255, 179, 0, 0.3))'
};

const storyBubbleStyle = {
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '24px',
  padding: '24px 32px',
  maxWidth: '600px',
  marginBottom: '30px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  zIndex: 3
};

const bubbleContentStyle = {
  fontSize: '18px',
  color: '#ffffff',
  lineHeight: '1.6',
  margin: 0,
  textAlign: 'left',
  whiteSpace: 'pre-line'
};

const storyTextStyle = {
  fontSize: '22px',
  color: '#ffffff',
  lineHeight: '1.7',
  margin: 0,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
  fontWeight: '500',
  fontFamily: 'Schoolbell, cursive'
};

const bubbleTailStyle = {
  position: 'absolute',
  bottom: '-15px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '15px solid transparent',
  borderRight: '15px solid transparent',
  borderTop: '15px solid rgba(255, 255, 255, 0.1)'
};

const navigationContainerStyle = {
  position: 'absolute',
  bottom: '60px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '50px',
  alignItems: 'center',
  zIndex: 10
};

const navIconButtonStyle = {
  background: 'transparent',
  border: 'none',
  width: '80px',
  height: '80px',
  cursor: 'pointer',
  padding: 0,
  borderRadius: '50%',
  transition: 'none'
};

const gameButtonStyle = {
  background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Schoolbell, cursive',
  boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)',
  transition: 'all 0.3s ease',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
};

const backgroundElementsStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  pointerEvents: 'none'
};

const starStyle = {
  position: 'absolute',
  width: '3px',
  height: '3px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
};

// New styles for assets and custom elements
const assetsContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  pointerEvents: 'none'
};

const assetStyle = {
  objectFit: 'contain',
  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))',
  transition: 'all 0.3s ease',
  opacity: 0.8
};

const customElementsContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 6,
  pointerEvents: 'none'
};

const customElementStyle = {
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '12px 16px',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  maxWidth: '180px'
};

const customElementTextStyle = {
  fontSize: '16px',
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: '1.4',
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  fontFamily: 'Schoolbell, cursive'
};

const emojiStyle = {
  fontSize: '16px',
  marginRight: '6px'
};

// Decorative floating elements
const decorativeElement1Style = {
  position: 'absolute',
  top: '20%',
  right: '5%',
  width: '8px',
  height: '8px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
  zIndex: 1
};

const decorativeElement2Style = {
  position: 'absolute',
  bottom: '30%',
  left: '5%',
  width: '12px',
  height: '12px',
  background: 'rgba(255, 235, 59, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 20px rgba(255, 235, 59, 0.6)',
  zIndex: 1
};

export default StoryContinue;
