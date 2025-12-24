import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  useEffect(() => {
    if (revealed < heartPositions.length) {
      const timer = setTimeout(() => setRevealed(revealed + 1), 40);
      return () => clearTimeout(timer);
    }
  }, [revealed, heartPositions.length]);


  let heartCount = 0;
  // Generate a random delay for each heart for the rise animation
  const randomDelays = Array(heartPositions.length)
    .fill(0)
    .map(() => 0.5 + Math.random() * 1.5); // delays between 0.5s and 2s
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '12vh', zIndex: 2, border: '2px dashed #e91e63', padding: '2rem' }}>
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
                      style={{ fontSize: '2rem', color: '#e91e63', display: 'inline-block', minWidth: '1em' }}
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
                    <span key={cIdx} style={{ fontSize: '2rem', color: 'transparent', display: 'inline-block', minWidth: '1em' }}> </span>
                  );
                }
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AngelaHeartsName;
