import React, { useEffect, useState, useRef } from "react";

const letterLines = [
  "Babe koko koh sate taw taw soe twar tar koh narrr lal par tl",
  "Koko lote tar tway ka babe atwat sate a nout shat fik marrr pop",
  "Babe a nar mar d lo shi nay ya tar koh ka pyor nay p",
  "Babe nae date chin tay tl, a myarrr gyi memories tway lote chin tl",
  "Babe photo lay tway send tar tway koh myaw lint mi nay tl",
  "Koko atwat pyor shwin chin ka babe nae a myarr gyi sine lar tl",
  "Babe message send yin koh pyor tat lar tl",
  "I wish I could still be your boyfriend",
  "Please Forive me and accept me again",
  "I love you a lot and Wish you the happiness Christmas",
];

export default function LetterScene({ onComplete }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typed, setTyped] = useState("");
  const timersRef = useRef([]);

  useEffect(() => {
    // Cleanup timers on unmount or before next effect
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    if (currentLine >= letterLines.length) return;
    setTyped("");
    if (currentLine === 0) {
      // First, type 'Babe' letter by letter
      const name = "Babe";
      let nameIdx = 0;
      let restIdx = 0;
      const typeName = () => {
        setTyped(name.slice(0, nameIdx + 1));
        if (nameIdx < name.length - 1) {
          nameIdx++;
          timersRef.current.push(setTimeout(typeName, 180));
        } else {
          timersRef.current.push(setTimeout(typeRest, 600)); // pause after 'Babe'
        }
      };
      const typeRest = () => {
        setTyped(
          name + letterLines[0].slice(name.length, name.length + restIdx + 1)
        );
        if (restIdx < letterLines[0].length - name.length - 1) {
          restIdx++;
          timersRef.current.push(setTimeout(typeRest, 32));
        } else {
          timersRef.current.push(
            setTimeout(() => {
              setDisplayedLines((prev) => [...prev, letterLines[0]]);
              setCurrentLine((prev) => prev + 1);
            }, 500)
          );
        }
      };
      typeName();
    } else {
      let charIdx = 0;
      const typeChar = () => {
        setTyped(letterLines[currentLine].slice(0, charIdx + 1));
        if (charIdx < letterLines[currentLine].length - 1) {
          charIdx++;
          timersRef.current.push(setTimeout(typeChar, 32));
        } else {
          timersRef.current.push(
            setTimeout(() => {
              setDisplayedLines((prev) => [...prev, letterLines[currentLine]]);
              setCurrentLine((prev) => prev + 1);
            }, 500)
          );
        }
      };
      typeChar();
    }
    // Cleanup timers if currentLine changes
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [currentLine]);

  useEffect(() => {
    if (currentLine === letterLines.length && onComplete) {
      // Call onComplete after a short delay to let the final message display
      setTimeout(onComplete, 5000);
    }
  }, [currentLine, onComplete]);

  return (
    <div
    >
      <div
        style={{
          background: "#fff6e9",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px #e83e3e22",
          padding: "2.2rem 1.5rem",
          maxWidth: "95vw",
          width: "100%",
          margin: "0 auto",
          color: "#e83e3e",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          fontFamily: "sans-serif",
          lineHeight: 1.7,
          textAlign: "left",
          boxSizing: "border-box",
          overflowWrap: "break-word",
          zIndex: 50,
          position: "relative",
        }}
      >
        <h2
          style={{
            color: "#fc3d3d",
            fontFamily: "cursive",
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          A Letter for Babe
        </h2>
        {displayedLines.map((line, idx) => (
          <p key={idx} style={{ margin: "0 0 10px 0" }}>
            {line}
          </p>
        ))}
        {currentLine < letterLines.length && (
          <p style={{ margin: "0 0 10px 0" }}>
            {typed}
            <span style={{ opacity: 0.5 }}>|</span>
          </p>
        )}
        {currentLine === letterLines.length && (
          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              fontSize: "2rem",
              color: "#fc3d3d",
              fontFamily: "Pacifico, cursive",
              textShadow: "0 4px 24px #fff6e9, 0 2px 8px #fc3d3d55",
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            🎄Merry Christmas,Babe!🎄
          </div>
        )}
      </div>
    </div>
  );
}