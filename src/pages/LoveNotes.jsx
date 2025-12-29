import React from 'react';

const LoveNotes = ({ onClose, onContinue }) => (
  <div className="love-notes-page" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem', textAlign: 'center'}}>
    <h2 style={{fontSize: '2rem', margin: 0}}>Happy Anniversary ❤️</h2>
    <p style={{maxWidth: '48ch'}}>
      Happy Anniversary Babe — every heart that rose was for you. Thank you for the laughs, the warmth,
      and the countless little moments that make life beautiful. Here's to us, today and always.
    </p>

    <div style={{maxWidth: '48ch', textAlign: 'left'}}>
      <strong>Five things I love about you:</strong>
      <ul>
        <li>Your laugh that brightens the room</li>
        <li>Your kindness and gentle heart</li>
        <li>Our quiet moments together</li>
        <li>The way you make ordinary days special</li>
        <li>The warmth you bring to my life</li>
      </ul>
    </div>

    <div style={{display: 'flex', gap: '0.5rem'}}>
      <button onClick={onClose} style={{padding: '0.5rem 1rem', borderRadius: 6, border: 'none', background: '#e91e63', color: '#fff'}}>Replay hearts</button>
      <button onClick={onContinue} style={{padding: '0.5rem 1rem', borderRadius: 6, border: '1px solid #e91e63', background: '#fff', color: '#e91e63'}}>View Timeline</button>
    </div>
  </div>
);

export default LoveNotes;
