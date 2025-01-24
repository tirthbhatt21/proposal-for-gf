// src/App.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Fade from 'react-reveal/Fade';
import { HeartTwoTone } from '@ant-design/icons';
import Confetti from 'react-confetti';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3e5f5, #e1bee7);
  text-align: center;
  position: relative;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #4a148c;
  margin-bottom: 1rem;
  text-shadow: 2px 2px #e1bee7;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 2rem;
  text-shadow: 1px 1px #f3e5f5;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeartIcon = styled(HeartTwoTone)`
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.5rem;
  color: white;
  background-color: #e91e63;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(233, 30, 99, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background-color: #d81b60;
    box-shadow: 0 12px 20px rgba(233, 30, 99, 0.6);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem 2rem;
  }
`;

const NoButton = styled(Button)`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: #ff4081;

  &:hover {
    background-color: #f50057;
    transform: translateY(0);
  }
`;

const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showButtons, setShowButtons] = useState(true); // Add state to toggle button visibility
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 300, left: 300 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickYes = () => {
    setShowConfetti(true); // Show confetti animation
    setShowButtons(false); // Hide both buttons
  };

  const moveNoButton = () => {
    const newTop = Math.random() * (windowSize.height - 50);
    const newLeft = Math.random() * (windowSize.width - 100);
    setNoButtonPosition({ top: newTop, left: newLeft });
  };

  return (
    <PageContainer>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      <Fade top>
        <Title>Will You Be My Lover🥰🌹?</Title>
      </Fade>
      <Fade bottom>
        <Subtitle>You complete my world.</Subtitle>
      </Fade>
      <Fade bottom delay={500}>
        <HeartIcon twoToneColor="#eb2f96" />
      </Fade>
      {showButtons && ( // Conditional rendering for buttons
        <>
          <Fade bottom delay={1000}>
            <Button onClick={handleClickYes}>Yes, I Will! 😘</Button>
          </Fade>
          <NoButton
            top={noButtonPosition.top}
            left={noButtonPosition.left}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
          >
            No, Sorry! 😫
          </NoButton>
        </>
      )}
      {!showButtons && ( // Display a sweet message after the buttons are hidden
        <Fade bottom delay={500}>
          <Subtitle>Thank you for saying yes! You’ve made my day! ❤️</Subtitle>
        </Fade>
      )}
    </PageContainer>
  );
};

export default App;

