import React, { useState, useEffect } from 'react';
import './GrinchWhackAMole.css';
import GrinchImage from '../assets/grinch.png';

const GrinchWhackAMole = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [grinchPositions, setGrinchPositions] = useState(Array(9).fill(false));
  const [gameActive, setGameActive] = useState(true);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      setTimeout(onComplete, 2000); // Delay before next game
    }
  }, [timeLeft, gameActive, onComplete]);

  // Grinch popping up
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newPositions = Array(9).fill(false);
      const randomIndex = Math.floor(Math.random() * 9);
      newPositions[randomIndex] = true;
      setGrinchPositions(newPositions);

      // Hide after 1.5 seconds
      setTimeout(() => {
        setGrinchPositions(Array(9).fill(false));
      }, 1500);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameActive]);

  const whackGrinch = (index) => {
    if (grinchPositions[index]) {
      setScore(score + 1);
      setGrinchPositions(prev => {
        const newPos = [...prev];
        newPos[index] = false;
        return newPos;
      });
    }
  };

  return (
    <div className="grinch-game-container">
      <div className="grinch-game-header">
        <h2>Whack the Grinch!</h2>
        <div className="grinch-stats">
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
        </div>
      </div>
      <div className="grinch-grid">
        {grinchPositions.map((hasGrinch, index) => (
          <div
            key={index}
            className={`grinch-hole ${hasGrinch ? 'active' : ''}`}
            onClick={() => whackGrinch(index)}
          >
            {hasGrinch && <img src={GrinchImage} alt="Grinch" className="grinch-image" />}
          </div>
        ))}
      </div>
      {!gameActive && (
        <div className="grinch-game-over">
          <h3>Hurrayyyy!!!</h3>
          <p>Final Score: {score}</p>
          <p>Great job saving Christmas! 🎄</p>
        </div>
      )}
    </div>
  );
};

export default GrinchWhackAMole;