import React, { useState } from 'react';
import './FindTheTree.css';

const FindTheTree = ({ onComplete }) => {
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState("Find the Christmas Tree in this busy scene!");
  const [hints, setHints] = useState(3);

  const handleSceneClick = (e) => {
    if (found) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Tree position as percentage (matches CSS: left: 65%, top: 35%)
    const treeX = 0.65 * width;
    const treeY = 0.35 * height;
    const treeWidth = 60; // approximate width of the emoji
    const treeHeight = 80; // approximate height

    if (x >= treeX && x <= treeX + treeWidth && y >= treeY && y <= treeY + treeHeight) {
      setFound(true);
      setMessage("You found the Christmas Tree! 🎄");
      setTimeout(onComplete, 3000);
    } else {
      if (hints > 0) {
        setHints(hints - 1);
        setMessage(`Not quite! ${hints - 1} hints left. Look carefully!`);
        setTimeout(() => setMessage("Find the Christmas Tree in this busy scene!"), 2000);
      } else {
        setMessage("No more hints! Keep looking...");
      }
    }
  };

  return (
    <div className="find-tree-container">
      <h2 className="find-tree-title">{message}</h2>
      <div className="hints">Hints left: {hints}</div>
      <div className="christmas-scene" onClick={handleSceneClick}>
        {/* Background */}
        <div className="scene-background"></div>

        {/* Snow */}
        <div className="snow-layer">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                fontSize: `${Math.random() * 10 + 5}px`,
              }}
            >
              ❄️
            </div>
          ))}
        </div>

        {/* Christmas decorations and items */}
        <div className="scene-elements">
          {/* Houses */}
          <div className="house house1">🏠</div>
          <div className="house house2">🏘️</div>
          <div className="house house3">🏠</div>

          {/* People */}
          <div className="person person1">🎅</div>
          <div className="person person2">👨‍👩‍👧‍👦</div>
          <div className="person person3">👩‍🎄</div>
          <div className="person person4">🧑‍🎄</div>

          {/* Decorations */}
          <div className="decoration wreath1">🌿</div>
          <div className="decoration lights1">✨</div>
          <div className="decoration lights2">🎇</div>
          <div className="decoration bell1">🔔</div>
          <div className="decoration bell2">🔔</div>
          <div className="decoration star1">⭐</div>
          <div className="decoration star2">⭐</div>

          {/* Gifts */}
          <div className="gift gift1">🎁</div>
          <div className="gift gift2">🎁</div>
          <div className="gift gift3">🎁</div>
          <div className="gift gift4">📦</div>

          {/* Food */}
          <div className="food cookie1">🍪</div>
          <div className="food cookie2">🍪</div>
          <div className="food candy1">🍬</div>
          <div className="food candy2">🍭</div>

          {/* Animals */}
          <div className="animal reindeer1">🦌</div>
          <div className="animal reindeer2">🦌</div>
          <div className="animal penguin1">🐧</div>

          {/* The hidden Christmas Tree */}
          <div className="hidden-tree">🎄</div>

          {/* More decorations to clutter */}
          <div className="decoration ornament1">🎈</div>
          <div className="decoration ornament2">🎈</div>
          <div className="decoration ornament3">🎈</div>
          <div className="decoration snowman1">☃️</div>
          <div className="decoration snowman2">⛄</div>
          <div className="decoration candle1">🕯️</div>
          <div className="decoration candle2">🕯️</div>
        </div>
      </div>
      {found && (
        <div className="celebration">
          <div className="sparkles">✨🎉✨</div>
          <p>Christmas is saved forever! 🎄❤️</p>
        </div>
      )}
    </div>
  );
};

export default FindTheTree;