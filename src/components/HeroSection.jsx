
import React from 'react';
import './HeroSection.css';

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-content">
      <img
        src={require('../assets/couple-photo.jpg')} // Replace with your photo
        alt="Couple"
        className="hero-photo"
      />
      <h1>Happy 2-Month Anniversary</h1>
      <p className="tagline">Two month down, forever to go.</p>
    </div>
  </section>
);

export default HeroSection;
