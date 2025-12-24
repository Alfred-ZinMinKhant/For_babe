import React, { useState, useEffect } from 'react';
import './GrinchStealsTree.css';
import GrinchGif from '../assets/grinch.gif';

const GrinchStealsTree = ({ onComplete }) => {
  const [showTree, setShowTree] = useState(true);
  const [showGrinch, setShowGrinch] = useState(false);

  useEffect(() => {
    // Show tree for 2 seconds
    const treeTimer = setTimeout(() => {
      setShowTree(false);
      setShowGrinch(true);
    }, 2000);

    // Show Grinch stealing for 3 seconds, then complete
    const grinchTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(treeTimer);
      clearTimeout(grinchTimer);
    };
  }, [onComplete]);

  return (
    <div className="grinch-steals-container">
      {showTree && (
        <div className="tree-back">
          <div className="tree-icon">🎄</div>
          <h2>The Christmas Tree is Back!</h2>
          <p>Yay! Christmas is saved... for now!</p>
        </div>
      )}
      {showGrinch && (
        <div className="grinch-stealing">
          <img src={GrinchGif} alt="Grinch stealing tree" className="grinch-gif" />
          <h2>Oh no! The Grinch strikes again!</h2>
          <p>The Grinch stole the tree again!</p>
        </div>
      )}
    </div>
  );
};

export default GrinchStealsTree;