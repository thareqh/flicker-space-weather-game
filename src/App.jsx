import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TitleScreen from './components/TitleScreen.jsx';
import StoryIntro from './components/StoryIntro.jsx';
import StoryContinue from './components/StoryContinue.jsx';
import StoryQuiz from './components/StoryQuiz.jsx';
import ConversationMode from './components/ConversationMode.jsx';
import CMEGame from './components/CMEGame.jsx';
import FloatingSettings from './components/FloatingSettings.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/themes.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container" role="application" aria-label="Flicker: Space Weather Adventure">
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/story" element={<StoryIntro />} />
          <Route path="/story-continue" element={<StoryContinue />} />
          <Route path="/quiz" element={<StoryQuiz />} />
          <Route path="/conversation" element={<ConversationMode />} />
          <Route path="/cme-game" element={<CMEGame />} />
          <Route path="*" element={<TitleScreen />} />
        </Routes>
        <FloatingSettings />
      </div>
    </ThemeProvider>
  );
};

export default App;


