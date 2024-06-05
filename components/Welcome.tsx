import React from "react";

const Welcome = () => {
  return (
    <div className="w-full p-10 border shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-4xl">
        Welcome to Gemini Chat Completion
      </h1>
      <p className="text-sm md:text-l mt-4 text-slate-500">
        The Gemini 1.5 Flash is optimized for high-volume, high-frequency tasks,
        making it suitable for applications like summarization, chat, image and
        video captioning, and data extraction from long documents.{" "}
      </p>
    </div>
  );
};

export default Welcome;
