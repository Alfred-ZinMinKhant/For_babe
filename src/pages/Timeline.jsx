import React, { useState } from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    title: 'How we met',
    details: 'We met in a way that felt like fate, and our story began with a simple hello.',
  },
  {
    title: 'Our first date',
    details: 'Our first date was full of laughter, nerves, and a spark that started it all.',
  },
  {
    title: 'First impressions',
    details: 'We both had butterflies, but quickly realized how much we enjoyed each other’s company.',
  },
  {
    title: 'Memorable moments',
    details: 'From late-night talks to spontaneous adventures, every moment became a cherished memory.',
  },
  {
    title: 'Funny/chaotic moments',
    details: 'Remember the time we argued about… 😂 It was chaotic, but it made us stronger!',
  },
];

const Timeline = () => {
  const [flipped, setFlipped] = useState(Array(milestones.length).fill(false));

  const handleFlip = idx => {
    setFlipped(f => f.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#e91e63' }}>Our Story</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {milestones.map((m, idx) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              onClick={() => handleFlip(idx)}
              animate={{ rotateY: flipped[idx] ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(233,30,99,0.12)',
                padding: '1.5rem',
                cursor: 'pointer',
                minHeight: 120,
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  inset: 0,
                  display: flipped[idx] ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  color: '#e91e63',
                }}
              >
                {m.title}
              </div>
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  inset: 0,
                  display: flipped[idx] ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  color: '#333',
                  padding: '0 1rem',
                  textAlign: 'center',
                }}
              >
                {m.details}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
