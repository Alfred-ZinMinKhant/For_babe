import React, { useEffect } from 'react';
import './AnimatedHearts.css';

const AnimatedHearts = () => {
  useEffect(() => {
    // Optionally add JS for more dynamic heart animations
  }, []);

  return (
    <div className="hearts-bg">
      {[...Array(12)].map((_, i) => (
        <span key={i} className={`heart heart-${i}`}>❤️</span>
      ))}
    </div>
  );
};

export default AnimatedHearts;
