import React from "react";

const AudioVideo = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">🎵 Audio & Video</h2>
      <video controls className="w-full rounded shadow mb-4">
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>
      <audio controls className="w-full rounded shadow">
        <source src="/sample.mp3" type="audio/mp3" />
        Your browser does not support audio.
      </audio>
    </div>
  );
};

export default AudioVideo;
