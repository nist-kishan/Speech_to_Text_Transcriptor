import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null; 
  return (
    <div className="bg-gray-800/70 border border-gray-600/50 text-pink-500 px-4 py-3 rounded-lg">
      <p className="text-center font-medium">
        {" "}
        Unable to transcribe the audio. Please ensure it is clear, in English,
        and in a supported format.
      </p>
    </div>
  );
}
