import React from "react";
import profileImage from "../assets/profile.png"; // adjust path based on your folder structure

export default function RightSidePage() {
  return (
    <div
      style={{
        height: "200vh",
        width: "12%",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #e0f2fe, #93c5fd)", // gradient background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={profileImage}
        alt="Moving"
        style={{
          position: "absolute",
          animation: "moveDown 5s linear infinite",
          width: "100px",
          height: "80px",
        }}
      />

      <style>
        {`
          @keyframes moveDown {
            0% { top: -150px; }
            100% { top: 200vh; }
          }
        `}
      </style>
    </div>
  );
}
