import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Animation = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const fullText = "🎞️ Advanced Animation Experience";

  const imageList = [
    "https://source.unsplash.com/300x200/?technology",
    "https://source.unsplash.com/300x200/?future",
    "https://source.unsplash.com/300x200/?innovation",
  ];

  // Typing Effect
  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typing);
    }, 80);
    return () => clearInterval(typing);
  }, []);

  // Image Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Particle positions
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 5,
  }));

  return (
    <div
      style={{
        minHeight: "150vh",
        background: "linear-gradient(270deg, #667eea, #764ba2, #ff6f61)",
        backgroundSize: "600% 600%",
        animation: "bgShift 15s ease infinite",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: "rgba(255,255,255,0.3)",
            borderRadius: "50%",
          }}
          animate={{
            y: ["0%", "-20%", "0%"],
            x: ["0%", "5%", "0%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textShadow: "0 4px 10px rgba(0,0,0,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        {displayText}
      </motion.h2>

      {/* Orbiting Glow Ring */}
      <motion.div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          border: "2px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.05, 1],
          opacity: 1,
        }}
        whileHover={{
          rotateY: 8,
          rotateX: 8,
          scale: 1.05,
          boxShadow: "0 0 20px rgba(255,255,255,0.8)",
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "2rem",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          zIndex: 1,
        }}
      >
        <motion.img
          src={imageList[currentImage]}
          alt="Slideshow"
          style={{
            borderRadius: "12px",
            marginBottom: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            width: "100%",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
        />
        <p style={{ fontSize: "1.2rem" }}>
          Smooth, interactive, and visually rich animations 🚀
        </p>
      </motion.div>

      {/* Floating Icon */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 20,
          fontSize: "2rem",
        }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ⬆️
      </motion.div>

      {/* Background Gradient Animation */}
      <style>
        {`
          @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Animation;
