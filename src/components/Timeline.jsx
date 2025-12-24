
import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const milestones = [
  {
    title: 'How We Met',
    description: 'A brief story about how we first met.',
    date: 'Nov 1, 2025',
  },
  {
    title: 'Our First Date',
    description: 'Where we went and what made it special.',
    date: 'Nov 5, 2025',
  },
  {
    title: 'First Impressions',
    description: 'What we thought of each other.',
    date: 'Nov 6, 2025',
  },
  {
    title: 'Memorable Moments',
    description: 'A highlight from the month.',
    date: 'Nov 15, 2025',
  },
  {
    title: 'Funny/Chaotic Moments',
    description: 'The time we argued about… 😂',
    date: 'Nov 20, 2025',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateY: -20 },
  visible: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.7, type: 'spring' } },
};

const Timeline = () => (
  <div className="timeline">
    {milestones.map((m, idx) => (
      <motion.div
        className="timeline-card"
        key={idx}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={cardVariants}
      >
        <div className="timeline-date">{m.date}</div>
        <div className="timeline-content">
          <h3>{m.title}</h3>
          <p>{m.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default Timeline;
