import React, { useState, useEffect } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';

const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fullscreen-toggle" style={{ position: 'fixed', top: 24, right: 40, zIndex: 1001 }}>
      <button 
        onClick={toggleFullScreen} 
        aria-label="Toggle fullscreen" 
        style={{ 
          fontSize: '1.5rem', 
          background: 'rgba(255,255,255,0.9)', 
          border: '2px solid #e91e63', 
          borderRadius: '8px', 
          padding: '3px', 
          cursor: 'pointer', 
          color: '#e91e63',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(233, 30, 99, 0.1)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.9)'}
      >
        {isFullScreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
};

export default FullScreenToggle;