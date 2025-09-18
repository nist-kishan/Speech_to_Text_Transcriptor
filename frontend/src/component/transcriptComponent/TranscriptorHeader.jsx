import React from "react";

import { Mic } from "lucide-react";

export default function TranscriptorHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-indigo-600 p-4 rounded-2xl shadow-md">
        <Mic className="h-7 w-7 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">Audio Transcriptor</h1>
        <p className="text-gray-400 text-sm">
          Upload an audio file and get instant transcription
        </p>
      </div>
    </div>
  );
}
