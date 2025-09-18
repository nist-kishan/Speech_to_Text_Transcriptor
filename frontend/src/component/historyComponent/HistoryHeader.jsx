import React from "react";

import { Trash2 } from "lucide-react";
import { useTranscript } from "../../hooks/useTranscript";

export default function HistoryHeader() {
  const { clearHistory, loading } = useTranscript();

  return (
    <div className="flex flex-col sm:flex-row px-3 justify-between items-start sm:items-center gap-2 sm:gap-1">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        📜 Transcription History
      </h1>
      <button
        onClick={clearHistory}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={loading}
      >
        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" /> Clear History
      </button>
    </div>
  );
}
