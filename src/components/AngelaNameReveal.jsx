import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const name = 'Angela';
const colors = ['#e91e63', '#f06292', '#ba68c8', '#64b5f6', '#4db6ac', '#ffd54f'];

const AngelaNameReveal = () => {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed < name.length) {
      const timer = setTimeout(() => setRevealed(revealed + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [revealed]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '18vh', zIndex: 2 }}>
      {name.split('').map((letter, i) => (
        <motion.div
          key={i}
          initial={{ y: 80, opacity: 0 }}
          animate={revealed > i ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 120, delay: i * 0.6 }}
          style={{ position: 'relative', fontSize: '5rem', fontFamily: 'Pacifico, cursive', color: colors[i % colors.length], minWidth: '1em' }}
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={revealed > i ? { scale: 1.2, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: i * 0.6 }}
            style={{ position: 'absolute', top: '-2.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '2.5rem' }}
          >
            {revealed > i ? '❤️' : ''}
          </motion.span>
          {revealed > i ? letter : ''}
        </motion.div>
      ))}
    </div>
  );
};

export default AngelaNameReveal;
