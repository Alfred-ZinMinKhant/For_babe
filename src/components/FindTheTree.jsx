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
          <div className="person person3">👩</div>
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
          <div className="decoration ornament4">🎈</div>
          <div className="decoration ornament5">🎈</div>
          <div className="decoration ornament6">🎈</div>
          <div className="decoration snowman3">☃️</div>
          <div className="decoration candle3">🕯️</div>
          <div className="decoration mistletoe1">🌿</div>
          <div className="decoration mistletoe2">🌿</div>
          <div className="decoration sleigh1">🛷</div>
          <div className="decoration elf1">🧝</div>
          <div className="decoration elf2">🧝</div>
          <div className="decoration stockings1">🧦</div>
          <div className="decoration stockings2">🧦</div>
          <div className="decoration fireplace1">🏠</div>
          <div className="food cookies3">🍪</div>
          <div className="food milk1">🥛</div>
          <div className="food milk2">🥛</div>
          <div className="decoration lights3">✨</div>
          <div className="decoration lights4">🎇</div>
          <div className="decoration bells3">🔔</div>
          <div className="decoration bells4">🔔</div>
          <div className="decoration stars3">⭐</div>
          <div className="decoration stars4">⭐</div>
          <div className="decoration stars5">⭐</div>
          <div className="decoration bauble1">🔴</div>
          <div className="decoration bauble2">🔵</div>
          <div className="decoration gingerbread1">🍪</div>
          <div className="decoration gingerbread2">🍪</div>
          <div className="decoration present1">🎁</div>
          <div className="decoration present2">🎁</div>
          <div className="decoration snowflake1">❄️</div>          <div className="decoration green-wreath1">🌿</div>
          <div className="decoration green-wreath2">🌿</div>
          <div className="decoration green-wreath3">🌿</div>
          <div className="decoration green-wreath4">🌿</div>
          <div className="decoration green-wreath5">🌿</div>
          <div className="decoration green-holly1">🌿</div>
          <div className="decoration green-holly2">🌿</div>
          <div className="decoration green-holly3">🌿</div>
          <div className="decoration green-holly4">🌿</div>
          <div className="decoration green-mistletoe1">🌿</div>
          <div className="decoration green-mistletoe2">🌿</div>
          <div className="decoration green-mistletoe3">🌿</div>
          <div className="decoration green-ornament1">🔵</div>
          <div className="decoration green-ornament2">🔵</div>
          <div className="decoration green-ornament3">🔵</div>
          <div className="decoration green-ornament4">🔵</div>
          <div className="decoration green-ornament5">🔵</div>
          <div className="decoration green-lights1">🟢</div>
          <div className="decoration green-lights2">🟢</div>
          <div className="decoration green-lights3">🟢</div>
          <div className="decoration green-lights4">🟢</div>
          <div className="decoration green-candy1">🍭</div>
          <div className="decoration green-candy2">🍭</div>
          <div className="decoration green-candy3">🍭</div>
          <div className="decoration green-tree1">🟢</div>
          <div className="decoration green-tree2">🟢</div>
          <div className="decoration green-tree3">🟢</div>
          <div className="decoration green-tree4">🟢</div>
          <div className="decoration green-tree5">🟢</div>
          <div className="decoration green-tree6">🟢</div>
          <div className="decoration green-tree7">🟢</div>
          <div className="decoration green-tree8">🟢</div>
          <div className="decoration green-pine1">🌲</div>
          <div className="decoration green-pine2">🌲</div>
          <div className="decoration green-pine3">🌲</div>
          <div className="decoration green-pine4">🌲</div>
          <div className="decoration green-pine5">🌲</div>
          <div className="decoration green-evergreen1">🌲</div>
          <div className="decoration green-evergreen2">🌲</div>
          <div className="decoration green-evergreen3">🌲</div>
          <div className="decoration green-leaf1">🍃</div>
          <div className="decoration green-leaf2">🍃</div>
          <div className="decoration green-leaf3">🍃</div>
          <div className="decoration green-leaf4">🍃</div>
          <div className="decoration green-leaf5">🍃</div>
          <div className="decoration green-circle1">🟢</div>
          <div className="decoration green-circle2">🟢</div>
          <div className="decoration green-circle3">🟢</div>
          <div className="decoration green-circle4">🟢</div>
          <div className="decoration green-circle5">🟢</div>          <div className="decoration snowflake2">❄️</div>
          <div className="decoration wreath2">🌿</div>
          <div className="decoration wreath3">🌿</div>
          <div className="decoration candy-cane1">🍭</div>
          <div className="decoration candy-cane2">🍭</div>
          <div className="decoration candy-cane3">🍭</div>
          <div className="decoration nutcracker1">🤖</div>
          <div className="decoration nutcracker2">🤖</div>
          <div className="decoration angel1">👼</div>
          <div className="decoration angel2">👼</div>
          <div className="decoration dove1">🕊️</div>
          <div className="decoration dove2">🕊️</div>
          <div className="decoration holly1">🌿</div>
          <div className="decoration holly2">🌿</div>
          <div className="decoration ribbon1">🎀</div>
          <div className="decoration ribbon2">🎀</div>
          <div className="decoration ribbon3">🎀</div>
          <div className="decoration teddy1">🧸</div>
          <div className="decoration teddy2">🧸</div>
          <div className="decoration drum1">🥁</div>
          <div className="decoration drum2">🥁</div>
          <div className="decoration horn1">🎺</div>
          <div className="decoration horn2">🎺</div>
          <div className="person person5">👨</div>
          <div className="person person6">👩‍🎅</div>
          <div className="person person7">🧑</div>
          <div className="animal polar-bear1">🐻‍❄️</div>
          <div className="animal polar-bear2">🐻‍❄️</div>
          <div className="animal fox1">🦊</div>
          <div className="animal fox2">🦊</div>
          <div className="food pie1">🥧</div>
          <div className="food pie2">🥧</div>
          <div className="food pie3">🥧</div>
          <div className="decoration clock1">🕰️</div>
          <div className="decoration clock2">🕰️</div>
          <div className="decoration book1">📖</div>
          <div className="decoration book2">📖</div>
          <div className="decoration train1">🚂</div>
          <div className="decoration train2">🚂</div>
          <div className="decoration balloon1">🎈</div>
          <div className="decoration balloon2">🎈</div>
          <div className="decoration balloon3">🎈</div>
          <div className="decoration sleigh2">🛷</div>
          <div className="decoration sleigh3">🛷</div>
          <div className="decoration snow-globe1">❄️</div>
          <div className="decoration snow-globe2">❄️</div>
          <div className="decoration jingle-bell1">🔔</div>
          <div className="decoration jingle-bell2">🔔</div>
          <div className="decoration jingle-bell3">🔔</div>
          <div className="decoration candy1">🍬</div>
          <div className="decoration candy2">🍬</div>
          <div className="decoration candy3">🍬</div>
          <div className="decoration candy4">🍬</div>
        </div>
      </div>
      {found && (
        <div className="celebration">
          <div className="celebration-bg"></div>
          <div className="celebration-content">
            <div className="celebration-sparkles">
              ✨🎉✨🎊✨🎉✨
            </div>
            <div className="celebration-tree">🎄</div>
            <h2 className="celebration-title">You Found It!</h2>
            <p className="celebration-message">Christmas is saved forever! ❤️</p>
            <div className="celebration-hearts">
              💖💕💖💕💖
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTheTree;