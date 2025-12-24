import React, { useEffect, useRef } from 'react';
import './ParallaxBackground.css';

const ParallaxBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.3;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={bgRef} className="parallax-bg">
      {/* Soft sparkles or glow effects can be added here */}
    </div>
  );
};

export default ParallaxBackground;
