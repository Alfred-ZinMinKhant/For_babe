import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoveNotes from '../pages/LoveNotes';
import Timeline from '../pages/Timeline';

// Simple heart letter maps (A, N, G, E, L)
const heartMaps = {
  A: [
    ['', '', '❤️', '❤️', '❤️', '', ''],
    ['', '❤️', '', '', '', '❤️', ''],
    ['❤️', '', '', '', '', '', '❤️'],
    ['❤️', '', '', '', '', '', '❤️'],
    ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️'],
    ['❤️', '', '', '', '', '', '❤️'],
    ['❤️', '', '', '', '', '', '❤️'],
  ],
  N: [
    ['❤️', '', '', '', '', '', '❤️'],
    ['❤️', '❤️', '', '', '', '', '❤️'],
    ['❤️', '', '❤️', '', '', '', '❤️'],
    ['❤️', '', '', '❤️', '', '', '❤️'],
    ['❤️', '', '', '', '❤️', '', '❤️'],
    ['❤️', '', '', '', '', '❤️', '❤️'],
    ['❤️', '', '', '', '', '', '❤️'],
  ],
  G: [
    ['', '❤️', '❤️', '❤️', '❤️', '❤️', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '❤️', '❤️', '❤️', ''],
    ['❤️', '', '', '', '', '❤️', ''],
    ['❤️', '', '', '', '', '❤️', ''],
    ['', '❤️', '❤️', '❤️', '❤️', '❤️', ''],
  ],
  E: [
    ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '❤️', '❤️', '❤️', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', ''],
  ],
  L: [
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '', '', '', '', '', ''],
    ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', ''],
  ],
};

const name = 'ANGELA';


const AngelaHeartsName = () => {
  // Calculate total hearts
  const heartPositions = [];
  name.split('').forEach((letter, i) => {
    heartMaps[letter].forEach((row, rIdx) => {
      row.forEach((char, cIdx) => {
        if (char === '❤️') {
          heartPositions.push({ letter, i, rIdx, cIdx });
        }
      });
    });
  });

  const [revealed, setRevealed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);
  useEffect(() => {
    if (revealed < heartPositions.length) {
      const timer = setTimeout(() => setRevealed(revealed + 1), 40);
      return () => clearTimeout(timer);
    }
  }, [revealed, heartPositions.length]);

  useEffect(() => {
    if (!allRevealed && revealed >= heartPositions.length && heartPositions.length > 0) {
      setAllRevealed(true);
    }
  }, [revealed, allRevealed, heartPositions.length]);


  let heartCount = 0;
  // Generate a random delay for each heart for the rise animation
  const randomDelays = Array(heartPositions.length)
    .fill(0)
    .map(() => 0.5 + Math.random() * 1.5); // delays between 0.5s and 2s
  const handleReplay = () => {
    setFinished(false);
    setRevealed(0);
    setShowTimeline(false);
    setAllRevealed(false);
  };

  const handleContinue = () => {
    setShowTimeline(true);
  };

  if (showTimeline) {
    return <Timeline />;
  }

  if (finished) {
    return <LoveNotes onClose={handleReplay} onContinue={handleContinue} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '10vh', zIndex: 2, border: '2px dashed #e91e63', padding: '1rem' }}>
        {name.split('').map((letter, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
          {heartMaps[letter].map((row, rIdx) => (
            <div key={rIdx} style={{ display: 'flex', justifyContent: 'center', gap: '0.1em' }}>
              {row.map((char, cIdx) => {
                if (char === '❤️') {
                  heartCount++;
                  const randomDelay = randomDelays[heartCount - 1];
                  return (
                    <motion.span
                      key={cIdx}
                      initial={{ y: typeof window !== 'undefined' ? window.innerHeight : 400, opacity: 0, scale: 0.5 }}
                      animate={
                        revealed > heartCount - 1
                          ? {
                              y: 0,
                              opacity: 1,
                              scale: 1,
                            }
                          : {}
                      }
                      transition={{
                        y: {
                          type: 'spring',
                          stiffness: 80,
                          damping: 18,
                          delay: randomDelay,
                        },
                        opacity: {
                          type: 'spring',
                          stiffness: 80,
                          damping: 18,
                          delay: randomDelay,
                        },
                        scale: {
                          type: 'spring',
                          stiffness: 80,
                          damping: 18,
                          delay: randomDelay,
                        },
                      }}
                      style={{ fontSize: '1.4rem', color: '#e91e63', display: 'inline-block', minWidth: '0.8em' }}
                    >
                      <motion.span
                        initial={false}
                        animate={{ y: [0, -10, 0, 10, 0] }}
                        transition={{
                          type: 'tween',
                          ease: 'easeInOut',
                          duration: 4 + (cIdx % 3),
                          repeat: Infinity,
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        ❤️
                      </motion.span>
                    </motion.span>
                  );
                } else {
                  return (
                    <span key={cIdx} style={{ fontSize: '1.4rem', color: 'transparent', display: 'inline-block', minWidth: '1em' }}> </span>
                  );
                }
              })}
            </div>
          ))}
        </div>
      ))}
      </div>

      {allRevealed && !finished && (
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1.2rem' }}>
          <button onClick={() => setFinished(true)} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: '1px solid #e91e63', background: '#fff', color: '#e91e63' }}>
            Continue
          </button>
          <button onClick={handleReplay} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: 'none', background: '#e91e63', color: '#fff' }}>
            Replay
          </button>
        </div>
      )}

    </div>
  );
};

export default AngelaHeartsName;
