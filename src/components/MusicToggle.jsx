import React, { useRef, useState } from 'react';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import '../assets/love-track.mp3';

const MusicToggle = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="music-toggle" style={{ position: 'fixed', top: 24, right: 24, zIndex: 10 }}>
      <button onClick={toggleMusic} aria-label="Toggle music" style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
        <FaMusic style={{ marginRight: 8 }} />
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <audio ref={audioRef} src={require('../assets/love-track.mp3')} loop preload="auto" />
    </div>
  );
};

export default MusicToggle;
