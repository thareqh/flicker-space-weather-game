import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlickerCharacter from './FlickerCharacter.jsx';
import { nasaSpaceWeatherData } from '../data/nasaEducationalData.js';

const ConversationMode = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = React.useState(0);
  const [userChoice, setUserChoice] = React.useState(null);

  const conversation = [
    {
      flicker: nasaSpaceWeatherData.sunFacts[0].fact + " I'm Flicker, your friendly sun! ☀️",
      user: null
    },
    {
      flicker: nasaSpaceWeatherData.sunFacts[1].fact + " " + nasaSpaceWeatherData.sunFacts[1].kidExplanation,
      user: null
    },
    {
      flicker: "What would you like to know about space weather? I have lots of amazing NASA facts to share! 🌟",
      user: [
        { text: "Tell me about solar flares! 🔥", action: "solar-flares" },
        { text: "What are auroras? 🌌", action: "auroras" },
        { text: "How does Earth stay protected? 🛡️", action: "protection" },
        { text: "What does NASA monitor? 🛰️", action: "nasa-monitoring" },
        { text: "Start the adventure game! 🎮", action: "game" }
      ]
    }
  ];

  const handleUserChoice = (action) => {
    setUserChoice(action);
    
    switch(action) {
      case 'solar-flares':
        setCurrentMessage(3);
        break;
      case 'auroras':
        setCurrentMessage(4);
        break;
      case 'protection':
        setCurrentMessage(5);
        break;
      case 'nasa-monitoring':
        setCurrentMessage(6);
        break;
      case 'game':
        navigate('/game');
        return;
      default:
        setCurrentMessage(prev => prev + 1);
    }
  };

  const getFlickerResponse = () => {
    if (userChoice === 'solar-flares') {
      return nasaSpaceWeatherData.solarFlares[0].fact + " " + nasaSpaceWeatherData.solarFlares[0].kidExplanation + " " + nasaSpaceWeatherData.solarFlares[1].fact;
    } else if (userChoice === 'auroras') {
      return nasaSpaceWeatherData.auroras[0].fact + " " + nasaSpaceWeatherData.auroras[0].kidExplanation + " " + nasaSpaceWeatherData.auroras[1].fact + " " + nasaSpaceWeatherData.auroras[1].kidExplanation;
    } else if (userChoice === 'protection') {
      return nasaSpaceWeatherData.earthProtection[0].fact + " " + nasaSpaceWeatherData.earthProtection[0].kidExplanation + " " + nasaSpaceWeatherData.earthProtection[1].fact + " " + nasaSpaceWeatherData.earthProtection[1].kidExplanation;
    } else if (userChoice === 'nasa-monitoring') {
      return nasaSpaceWeatherData.nasaMonitoring[0].fact + " " + nasaSpaceWeatherData.nasaMonitoring[0].kidExplanation + " " + nasaSpaceWeatherData.nasaMonitoring[1].fact + " " + nasaSpaceWeatherData.nasaMonitoring[1].kidExplanation;
    }
    return conversation[currentMessage]?.flicker || "Thanks for chatting with me! I love sharing NASA facts!";
  };

  const goBack = () => {
    navigate('/story');
  };

  const startAdventure = () => {
    navigate('/game');
  };

  return (
    <div style={containerStyle}>
      {/* Background */}
      <div style={backgroundStyle} />

      {/* Header */}
      <div style={headerStyle}>
        <button onClick={goBack} style={backButtonStyle}>
          ← Back
        </button>
        <h1 style={titleStyle}>Chat with Flicker 💬</h1>
      </div>

      {/* Conversation Area */}
      <div style={conversationAreaStyle}>
        {/* Flicker Character */}
        <div style={characterContainerStyle}>
          <FlickerCharacter 
            state="waving"
            onClick={() => {}}
          />
        </div>

        {/* Chat Bubble */}
        <motion.div
          style={chatBubbleStyle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={chatBubbleContentStyle}>
            {getFlickerResponse()}
          </div>
          <div style={chatBubbleTailStyle} />
        </motion.div>

        {/* User Choices */}
        {conversation[currentMessage]?.user && !userChoice && (
          <motion.div
            style={choicesContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h3 style={choicesTitleStyle}>What would you like to ask?</h3>
            {conversation[currentMessage].user.map((choice, index) => (
              <motion.button
                key={index}
                onClick={() => handleUserChoice(choice.action)}
                style={choiceButtonStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              >
                {choice.text}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Continue Button */}
        {currentMessage < conversation.length - 1 && !conversation[currentMessage]?.user && (
          <motion.button
            onClick={() => setCurrentMessage(prev => prev + 1)}
            style={continueButtonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Continue
          </motion.button>
        )}

        {/* Action Buttons */}
        <div style={actionButtonsStyle}>
          <motion.button
            onClick={startAdventure}
            style={actionButtonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Start Adventure
          </motion.button>
          <motion.button
            onClick={() => {
              setCurrentMessage(0);
              setUserChoice(null);
            }}
            style={actionButtonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 New Conversation
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
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
  padding: '20px',
  zIndex: 10,
  position: 'relative'
};

const backButtonStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '16px',
  marginRight: '20px'
};

const titleStyle = {
  color: 'white',
  fontSize: '28px',
  margin: 0,
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
};

const conversationAreaStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  position: 'relative',
  zIndex: 5
};

const characterContainerStyle = {
  marginBottom: '40px'
};

const chatBubbleStyle = {
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  padding: '20px 30px',
  maxWidth: '500px',
  marginBottom: '30px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)'
};

const chatBubbleContentStyle = {
  fontSize: '18px',
  color: '#333',
  lineHeight: '1.6',
  margin: 0
};

const chatBubbleTailStyle = {
  position: 'absolute',
  bottom: '-10px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
  borderTop: '10px solid rgba(255, 255, 255, 0.95)'
};

const choicesContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '30px'
};

const choicesTitleStyle = {
  color: 'white',
  fontSize: '20px',
  margin: '0 0 16px 0',
  textAlign: 'center',
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
};

const choiceButtonStyle = {
  background: 'linear-gradient(45deg, #ffd54f, #ff7043)',
  color: '#1b1b1b',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  minWidth: '250px'
};

const continueButtonStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom: '20px'
};

const actionButtonsStyle = {
  display: 'flex',
  gap: '16px',
  marginTop: '20px'
};

const actionButtonStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
  padding: '12px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  backdropFilter: 'blur(5px)'
};

export default ConversationMode;
