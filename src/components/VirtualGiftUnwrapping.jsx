// Christmas Cake component
function ChristmasCake({ onOpen }) {
  // Pop-in animation
  const groupRef = useRef();
  const [scale, setScale] = useState(0.1);
  useFrame(() => {
    if (scale < 1) {
      setScale((s) => Math.min(1, s + 0.08));
    }
    if (groupRef.current) {
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  // Helper for holly leaves
  function HollyLeaf({ position, rotation = [0, 0, 0] }) {
    return (
      <group position={position} rotation={rotation}>
        <mesh>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
        <mesh position={[0.05, 0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
      </group>
    );
  }

  // Helper for berries
  function Berry({ position }) {
    return (
      <mesh position={position}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
    );
  }

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onClick={onOpen}
      style={{ cursor: "pointer" }}
    >
      {/* Label above the cake */}
      <Html center position={[0, 0.8, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            color: "#ffe066",
            fontWeight: 700,
            fontSize: 28,
            textShadow: "0 2px 8px #000",
            fontFamily: "cursive",
            marginBottom: 80,
            width: "80vw",
            maxWidth: 420,
            textAlign: "center",
            padding: "0.5em 0.5em",
            boxSizing: "border-box",
            letterSpacing: 1,
          }}
        >
          Open your Christmas Cake!
        </div>
      </Html>
      {/* Cake base */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.6, 32]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* White icing layer */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1.25, 1.25, 0.1, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Decorative icing border */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[1.25, 0.05, 8, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Holly decorations */}
      <HollyLeaf position={[0.8, 0.15, 0.8]} rotation={[0, Math.PI / 4, 0]} />
      <HollyLeaf position={[-0.8, 0.15, -0.8]} rotation={[0, -Math.PI / 4, 0]} />
      <HollyLeaf position={[0, 0.15, 1]} rotation={[0, 0, 0]} />
      <HollyLeaf position={[1, 0.15, 0]} rotation={[0, Math.PI / 2, 0]} />
      {/* Berries */}
      <Berry position={[0.85, 0.15, 0.85]} />
      <Berry position={[-0.85, 0.15, -0.85]} />
      <Berry position={[0, 0.15, 1.05]} />
      <Berry position={[1.05, 0.15, 0]} />
      {/* Merry Christmas message in icing */}
      <Html center position={[0, 0.25, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            color: "#8b0000",
            fontWeight: 700,
            fontSize: 18,
            textShadow: "0 1px 4px #fff",
            fontFamily: "serif",
            textAlign: "center",
          }}
        >
          Merry Christmas
        </div>
      </Html>
    </group>
  );
}
import React, { useRef, useState } from "react";
import "../styles/vignette.css";
import BabeVideo from "../assets/Babe.mp4";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import FindTheTree from "./FindTheTree";

function Cake3D({ onBlow }) {
  // Sprinkles helper
  function Sprinkle({ position = [0, 0, 0], color = "#fff" }) {
    return (
      <mesh position={position}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  const [candlesVisible, setCandlesVisible] = useState(true);
  // Flicker effect for candle flames
  const flameRefs = [useRef(), useRef(), useRef()];
  useFrame(() => {
    flameRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.position.y = 1.18 + Math.sin(Date.now() * 0.008 + i) * 0.04;
        ref.current.scale.x =
          0.22 + Math.abs(Math.sin(Date.now() * 0.01 + i)) * 0.09;
        ref.current.scale.z = ref.current.scale.x;
      }
    });
  });
  const handleBlow = () => {
    setCandlesVisible(false);
    setTimeout(onBlow, 900);
  };
  // Strawberry helper
  function Strawberry({ position = [0, 0, 0] }) {
    return (
      <group position={position}>
        <mesh castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#e83e3e" />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <coneGeometry args={[0.04, 0.08, 8]} />
          <meshStandardMaterial color="#4caf50" />
        </mesh>
      </group>
    );
  }
  // Icing drip helper
  function IcingDrip({ position = [0, 0, 0], color = "#fff" }) {
    return (
      <mesh position={position}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  // Wavy frosting band helper
  function FrostingBand({ y, r, color }) {
    // Create a wavy band using small spheres
    const dots = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const wave = Math.sin(angle * 3 + y * 10) * 0.04;
      dots.push(
        <mesh
          key={i}
          position={[Math.cos(angle) * r, y + wave, Math.sin(angle) * r]}
        >
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    }
    return <group>{dots}</group>;
  }
  // Cake stand
  return (
    <group position={[0, 0, 0]}>
      {/* Cake stand */}
      <mesh position={[0, -0.78, 0]} castShadow>
        <cylinderGeometry args={[1.25, 1.35, 0.18, 48]} />
        <meshStandardMaterial
          color="#e0e0e0"
          metalness={0.45}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, -0.97, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 0.32, 32]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Move label above cake */}
      {candlesVisible && (
        <Html center position={[0, 1.7, 0]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              color: "#fc3d3d",
              fontFamily: "cursive",
              fontSize: 26,
              marginBottom: 100,
              textShadow: "0 2px 8px #fff6e9, 0 1px 4px #fc3d3d33",
              userSelect: "none",
              width: "80vw",
              maxWidth: 420,
              textAlign: "center",
              padding: "0.5em 0.5em",
              boxSizing: "border-box",
              letterSpacing: 1,
            }}
          >
            Make a Wish <br /> & Blow the candles!
          </div>
        </Html>
      )}
      {/* Bottom layer (biggest) */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.38, 64]} />
        <meshStandardMaterial color="#f7c59f" />
      </mesh>
      {/* Glossy icing on bottom layer */}
      <mesh position={[0, -0.31, 0]}>
        <cylinderGeometry args={[0.97, 0.97, 0.07, 64]} />
        <meshPhysicalMaterial
          color="#fff6e9"
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.18}
          transmission={0.18}
          thickness={0.12}
        />
      </mesh>
      {/* Bottom layer frosting band */}
      <FrostingBand y={-0.31} r={0.97} color="#fff6e9" />
      {/* Bottom layer icing drips */}
      <IcingDrip position={[0.7, -0.31, 0.3]} color="#fff6e9" />
      <IcingDrip position={[-0.6, -0.31, -0.4]} color="#fff6e9" />
      <IcingDrip position={[0.2, -0.31, -0.8]} color="#fff6e9" />
      {/* Bottom layer strawberries */}
      <Strawberry position={[0.8, -0.1, 0.3]} />
      <Strawberry position={[-0.7, -0.1, -0.4]} />
      <Strawberry position={[0.2, -0.1, -0.8]} />
      {/* Middle layer */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.32, 48]} />
        <meshStandardMaterial color="#fff6e9" />
      </mesh>
      {/* Glossy icing on middle layer */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.67, 0.67, 0.05, 48]} />
        <meshPhysicalMaterial
          color="#fc3d3d"
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.18}
          transmission={0.18}
          thickness={0.12}
        />
      </mesh>
      {/* Middle layer frosting band */}
      <FrostingBand y={0.05} r={0.67} color="#fc3d3d" />
      {/* Middle layer icing drips */}
      <IcingDrip position={[0.5, 0.05, 0.2]} color="#fc3d3d" />
      <IcingDrip position={[-0.4, 0.05, -0.3]} color="#fc3d3d" />
      {/* Middle layer strawberries */}
      <Strawberry position={[0.6, 0.18, 0.2]} />
      <Strawberry position={[-0.5, 0.18, -0.3]} />
      {/* Top layer */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.26, 48]} />
        <meshStandardMaterial color="#fc3d3d" />
      </mesh>
      {/* Glossy icing on top layer */}
      <mesh position={[0, 0.41, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.04, 32]} />
        <meshPhysicalMaterial
          color="#fff6e9"
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.18}
          transmission={0.18}
          thickness={0.12}
        />
      </mesh>
      {/* Sprinkles on top */}
      <Sprinkle position={[0.18, 0.47, 0.18]} color="#ffb347" />
      <Sprinkle position={[-0.18, 0.47, -0.18]} color="#7ec850" />
      <Sprinkle position={[0, 0.47, -0.22]} color="#fc3d3d" />
      <Sprinkle position={[0, 0.47, 0.22]} color="#6ec6ff" />
      <Sprinkle position={[0.12, 0.47, -0.12]} color="#fff" />
      <Sprinkle position={[-0.12, 0.47, 0.12]} color="#f7c59f" />
      {/* Top layer frosting band */}
      <FrostingBand y={0.41} r={0.43} color="#fff6e9" />
      {/* Top layer icing drips */}
      <IcingDrip position={[0.2, 0.41, 0.2]} color="#fff6e9" />
      <IcingDrip position={[-0.2, 0.41, -0.2]} color="#fff6e9" />
      {/* Strawberries on top */}
      <Strawberry position={[0.18, 0.55, 0.18]} />
      <Strawberry position={[-0.18, 0.55, -0.18]} />
      <Strawberry position={[0, 0.55, -0.22]} />
      <Strawberry position={[0, 0.55, 0.22]} />
      {/* Candles (3) */}
      {candlesVisible && (
        <group onClick={handleBlow} style={{ cursor: "pointer" }}>
          {[
            [0.13, 0.55, 0],
            [-0.13, 0.55, 0],
            [0, 0.55, 0.13],
          ].map((pos, i) => (
            <group key={i}>
              <mesh position={[pos[0], pos[1] + 0.09, pos[2]]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.22, 16]} />
                <meshStandardMaterial color={i === 2 ? "#ffe066" : "#fff"} />
              </mesh>
              {/* Flame */}
              <mesh
                ref={flameRefs[i]}
                position={[pos[0], pos[1] + 0.22, pos[2]]}
              >
                <sphereGeometry args={[0.17, 16, 16]} />
                <meshStandardMaterial
                  emissive="#ffb300"
                  color="#ffb300"
                  emissiveIntensity={2.5}
                  transparent={true}
                  opacity={1}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}

const GiftUnwrap = ({ onComplete }) => {
  const [unwrapped, setUnwrapped] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFindTree, setShowFindTree] = useState(false);
  const [showFinalContinue, setShowFinalContinue] = useState(false);
  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .gift-msg { font-size: 1.1rem !important; padding: 1.2rem 0.7rem !important; }
          .gift-btn { font-size: 1rem !important; padding: 0.7rem 1.2rem !important; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#181824", // deep night blue
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          padding: 0,
          boxSizing: "border-box",
          gap: 0,
          overflow: "visible",
        }}
      >
        {/* Vignette overlay for candle focus */}
        <div className="vignette-overlay" />
        <Canvas
          camera={{ position: [0, 0.01, 6.2], fov: 100 }}
          shadows
          style={{
            width: "100vw",
            height: "auto",
            minHeight: 300,
            background: "transparent",
            overflow: "visible",
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 4, 2]} intensity={1} castShadow />
          {!unwrapped && (
            <group scale={[3.8, 3.8, 3.8]}>
              <Cake3D
                onBlow={() => {
                  setUnwrapped(true);
                  setTimeout(() => setShowGiftBox(true), 600);
                }}
              />
            </group>
          )}
          {/* Show GiftBox after candle blow, then reveal video on open */}
          {showGiftBox && !unwrapped && null}
          {showGiftBox && unwrapped && !showConfetti && !showVideo && (
            <group scale={[4.2, 4.2, 4.2]}>
              <ChristmasCake
                onOpen={() => {
                  setShowGiftBox(false);
                  setShowConfetti(true);
                  setTimeout(() => setShowVideo(true), 1800); // Show video after confetti
                }}
              />
            </group>
          )}
          {showConfetti && !showVideo && (
            <Html
              center
              style={{
                width: "100vw",
                minHeight: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                background: "none",
                padding: 0,
              }}
            >
              {/* Confetti hearts and message */}
              <div
                style={{
                  position: "relative",
                  width: "100vw",
                  height: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Simple confetti hearts */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 80 + 5}%`,
                        fontSize: `${Math.random() * 32 + 24}px`,
                        color: ["#fc3d3d", "#fff6e9", "#ffe066", "#f7c59f"][
                          i % 4
                        ],
                        opacity: 0.7 + Math.random() * 0.3,
                        transform: `rotate(${Math.random() * 60 - 30}deg)`,
                      }}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    color: "#fff6e9",
                    fontFamily: "cursive",
                    fontSize: 36,
                    textShadow: "0 2px 8px #fc3d3d, 0 1px 4px #fff6e9",
                    marginTop: 40,
                    padding: "1.2em 2em",
                    borderRadius: 24,
                    background: "rgba(30,24,36,0.7)",
                    boxShadow: "0 4px 24px #fc3d3d44",
                  }}
                >
                 Merry Christmas
                  <br />
                  Wishing you all the love and joy!
                  <br />
                  🎄
                </div>
              </div>
            </Html>
          )}
          {showVideo && (
            <Html
              center
              style={{
                width: "100vw",
                minHeight: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                background: "none",
                padding: 0,
              }}
            >
              <video
                src={BabeVideo}
                autoPlay
                muted
                loop
                style={{
                  width: "100vw",
                  maxWidth: "100vw",
                  height: "auto",
                  maxHeight: "80vh",
                  borderRadius: 24,
                  boxShadow: "0 8px 32px #e83e3e44",
                  background: "#000",
                  display: "block",
                  objectFit: "contain",
                }}
                controls
              />
            </Html>
          )}
        </Canvas>
        {showVideo && (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              marginTop: 300,
            }}
          >
            <button
              className="gift-btn"
              style={{
                padding: "1.1rem 2.8rem",
                fontSize: "1.3rem",
                background: "#fc3d3d",
                color: "#fff6e9",
                border: "none",
                borderRadius: "2rem",
                boxShadow: "0 4px 16px #e83e3e44",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontWeight: 700,
                transition: "background 0.2s",
                maxWidth: "90vw",
                whiteSpace: "nowrap",
                letterSpacing: 1,
                alignSelf: "center",
              }}
              onClick={() => {
                setShowVideo(false);
                setShowFindTree(true);
              }}
            >
              Find the Tree
            </button>
          </div>
        )}
      </div>
      {showFindTree && <FindTheTree onComplete={() => { setShowFindTree(false); setShowFinalContinue(true); }} />}
      {showFinalContinue && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#181824",
            zIndex: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="gift-btn"
            style={{
              padding: "1.1rem 2.8rem",
              fontSize: "1.3rem",
              background: "#fc3d3d",
              color: "#fff6e9",
              border: "none",
              borderRadius: "2rem",
              boxShadow: "0 4px 16px #e83e3e44",
              cursor: "pointer",
              fontFamily: "sans-serif",
              fontWeight: 700,
              transition: "background 0.2s",
              maxWidth: "90vw",
              whiteSpace: "nowrap",
              letterSpacing: 1,
            }}
            onClick={onComplete}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default GiftUnwrap;
