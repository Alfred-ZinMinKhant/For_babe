import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Gallery from './pages/Gallery';
import LoveNotes from './pages/LoveNotes';
import Interactive from './pages/Interactive';
import Wishlist from './pages/Wishlist';
import Secret from './pages/Secret';
import FinalMessage from './pages/FinalMessage';
import Timeline from './pages/Timeline';
import FullScreenToggle from './components/FullScreenToggle';
// TODO: Add global styles, heart cursor, background animation, music toggle

const App = () => (
  <Router>
    <FullScreenToggle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/our-story" element={<OurStory />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/love-notes" element={<LoveNotes />} />
      <Route path="/interactive" element={<Interactive />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="/final-message" element={<FinalMessage />} />
    </Routes>
  </Router>
);
export default App;
