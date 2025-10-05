import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlickerCharacter from './FlickerCharacter.jsx';

const StoryQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What are solar flares?",
      options: ["Explosions of energy from the Sun", "Rain on the Sun", "Sunspots", "Solar wind"],
      correct: 0,
      explanation: "Exactly! Solar flares are huge explosions of energy from my surface! 🌟"
    },
    {
      id: 2,
      question: "What does CME stand for?",
      options: ["Coronal Mass Ejection", "Coronal Magnetic Energy", "Cosmic Matter Emission", "Charged Material Event"],
      correct: 0,
      explanation: "Correct! CME stands for Coronal Mass Ejection - giant clouds of charged particles! ☁️"
    },
    {
      id: 3,
      question: "How fast can CMEs travel through space?",
      options: ["100 km/h", "1,000 km/h", "1 million km/h", "3 million km/h"],
      correct: 3,
      explanation: "That's right! CMEs can travel up to 3 million km/h - super fast! 🚀"
    },
    {
      id: 4,
      question: "What creates auroras on Earth?",
      options: ["Moonlight", "Sun's charged particles hitting Earth's atmosphere", "Lightning", "Reflected sunlight"],
      correct: 1,
      explanation: "Perfect! My charged particles create beautiful auroras when they hit Earth's atmosphere! 🌌"
    },
    {
      id: 5,
      question: "What is space weather?",
      options: ["Weather in space", "Conditions in space caused by the Sun's activity", "Rain in space", "Clouds in space"],
      correct: 1,
      explanation: "Yes! Space weather is conditions in space caused by my solar activity! ☀️"
    },
    {
      id: 6,
      question: "How long does it take for solar wind to reach Earth?",
      options: ["1 hour", "1 day", "2-3 days", "1 week"],
      correct: 2,
      explanation: "Correct! My solar wind takes about 2-3 days to reach Earth! 🌍"
    },
    {
      id: 7,
      question: "What can strong solar storms affect on Earth?",
      options: ["Only auroras", "Satellites, power grids, and radio communications", "Only the weather", "Nothing"],
      correct: 1,
      explanation: "That's right! Strong solar storms can affect satellites, power grids, and radio communications! ⚡"
    },
    {
      id: 8,
      question: "What is the Sun's corona?",
      options: ["The Sun's surface", "The Sun's outer atmosphere", "Sunspots", "Solar flares"],
      correct: 1,
      explanation: "Exactly! The corona is my outer atmosphere where CMEs come from! 👑"
    },
    {
      id: 9,
      question: "How often do solar flares occur?",
      options: ["Never", "Once a year", "During solar maximum, several per day", "Only during eclipses"],
      correct: 2,
      explanation: "Correct! During solar maximum, I can have several flares per day! 🌟"
    },
    {
      id: 10,
      question: "What protects Earth from most solar radiation?",
      options: ["The Moon", "Earth's magnetic field and atmosphere", "Clouds", "Mountains"],
      correct: 1,
      explanation: "Perfect! Earth's magnetic field and atmosphere protect everyone from my radiation! 🛡️"
    }
  ];

  const currentQ = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  const handleBackToTitle = () => {
    navigate('/');
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return "Outstanding! You're a space weather expert! 🌟";
    if (percentage >= 70) return "Great job! You know your space weather! 🚀";
    if (percentage >= 50) return "Good work! You're learning about space weather! ☀️";
    return "Keep learning! Space weather is fascinating! 🌌";
  };

  const getFlickerState = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 70) return "excited";
    if (percentage >= 50) return "waving";
    return "default";
  };

  if (showResult) {
    return (
      <div style={containerStyle}>
        <div style={backgroundStyle} />
        
        <motion.div
          style={resultContainerStyle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FlickerCharacter 
            state={getFlickerState()}
            onClick={() => {}}
          />
          
          <div style={resultContentStyle}>
            <h1 style={resultTitleStyle}>Quiz Complete! 🎉</h1>
            <div style={scoreStyle}>
              <span style={scoreNumberStyle}>{score}</span>
              <span style={scoreTotalStyle}>/{quizQuestions.length}</span>
            </div>
            <p style={scoreMessageStyle}>{getScoreMessage()}</p>
            
            <div style={buttonContainerStyle}>
              <motion.button
                onClick={handleBackToTitle}
                style={primaryButtonStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Title Screen
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <div style={backgroundElementsStyle}>
          {Array.from({ length: 15 }, (_, i) => (
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
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle} />
      
      {/* Header */}
      <div style={headerStyle}>
        <button onClick={handleBackToTitle} style={backButtonStyle}>
          ← Back to Title
        </button>
      </div>

      {/* Main Content */}
      <div style={contentAreaStyle}>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={questionContainerStyle}
        >
          <h1 style={questionStyle}>{currentQ.question}</h1>
          
          <div style={optionsContainerStyle}>
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                style={{
                  ...optionButtonStyle,
                  ...(isAnswered && index === currentQ.correct && {
                    background: 'rgba(76, 175, 80, 0.3)',
                    borderColor: '#4CAF50'
                  }),
                  ...(isAnswered && selectedAnswer === index && index !== currentQ.correct && {
                    background: 'rgba(244, 67, 54, 0.3)',
                    borderColor: '#F44336'
                  })
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isAnswered}
              >
                <span style={optionTextStyle}>{option}</span>
                {isAnswered && index === currentQ.correct && (
                  <span style={correctIconStyle}>✓</span>
                )}
                {isAnswered && selectedAnswer === index && index !== currentQ.correct && (
                  <span style={incorrectIconStyle}>✗</span>
                )}
              </motion.button>
            ))}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={explanationStyle}
            >
              <p style={explanationTextStyle}>
                {selectedAnswer === currentQ.correct 
                  ? currentQ.explanation 
                  : `Not quite! The correct answer is: "${currentQ.options[currentQ.correct]}". ${currentQ.explanation}`
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Next Button */}
      {isAnswered && (
        <motion.div
          style={nextButtonContainerStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.button
            onClick={handleNext}
            style={nextButtonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </motion.button>
        </motion.div>
      )}

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

const backButtonStyle = {
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
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Schoolbell, cursive'
};

const contentAreaStyle = {
  position: 'absolute',
  top: '100px',
  left: 0,
  right: 0,
  bottom: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px 50px',
  zIndex: 5,
  overflow: 'hidden'
};

const questionContainerStyle = {
  width: '100%',
  maxWidth: '800px',
  textAlign: 'center'
};

const questionStyle = {
  color: 'white',
  fontSize: '28px',
  marginBottom: '40px',
  fontWeight: 'bold',
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  fontFamily: 'Schoolbell, cursive',
  lineHeight: '1.3'
};

const optionsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '30px'
};

const optionButtonStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '16px',
  padding: '20px 30px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: '600',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Schoolbell, cursive',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
};

const optionTextStyle = {
  flex: 1,
  textAlign: 'left'
};

const correctIconStyle = {
  color: '#4CAF50',
  fontSize: '24px',
  fontWeight: 'bold'
};

const incorrectIconStyle = {
  color: '#F44336',
  fontSize: '24px',
  fontWeight: 'bold'
};

const explanationStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '16px',
  padding: '20px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
};

const explanationTextStyle = {
  color: 'white',
  fontSize: '18px',
  margin: 0,
  textAlign: 'center',
  fontFamily: 'Schoolbell, cursive',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
};

const nextButtonContainerStyle = {
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10
};

const nextButtonStyle = {
  background: 'rgba(255, 235, 59, 0.9)',
  color: '#1a237e',
  border: 'none',
  borderRadius: '16px',
  padding: '16px 32px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  fontFamily: 'Schoolbell, cursive'
};

const resultContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '40px',
  zIndex: 5
};

const resultContentStyle = {
  textAlign: 'center',
  marginTop: '30px'
};

const resultTitleStyle = {
  color: 'white',
  fontSize: '36px',
  marginBottom: '20px',
  fontWeight: 'bold',
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  fontFamily: 'Schoolbell, cursive'
};

const scoreStyle = {
  marginBottom: '20px'
};

const scoreNumberStyle = {
  color: '#FFEB3B',
  fontSize: '48px',
  fontWeight: 'bold',
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  fontFamily: 'Schoolbell, cursive'
};

const scoreTotalStyle = {
  color: 'white',
  fontSize: '32px',
  fontWeight: 'bold',
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  fontFamily: 'Schoolbell, cursive'
};

const scoreMessageStyle = {
  color: 'white',
  fontSize: '20px',
  marginBottom: '30px',
  textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
  fontFamily: 'Schoolbell, cursive'
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center'
};

const primaryButtonStyle = {
  background: 'rgba(255, 235, 59, 0.9)',
  color: '#1a237e',
  border: 'none',
  borderRadius: '16px',
  padding: '16px 32px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  fontFamily: 'Schoolbell, cursive'
};

const secondaryButtonStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '16px',
  padding: '16px 32px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  backdropFilter: 'blur(15px)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Schoolbell, cursive'
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

export default StoryQuiz;
