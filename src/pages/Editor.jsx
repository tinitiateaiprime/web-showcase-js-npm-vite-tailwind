import React, { useState } from "react";

const Editor = () => {
  const [text, setText] = useState("");

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to right, #eef2f3, #ffffff)",
        height: "100vh",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#4f46e5" }}>
        ✏️ Online Editor
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
        rows="10"
        style={{
          width: "100%",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
          marginTop: "10px",
        }}
      ></textarea>

      <h3 style={{ marginTop: "20px", color: "#1f2937" }}>📄 Preview</h3>
      <div
        style={{
          background: "#f9fafb",
          border: "1px solid #ddd",
          padding: "10px",
          minHeight: "150px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
        }}
      >
        {text || "Your text will appear here..."}
      </div>
    </div>
  );
};

export default Editor;
