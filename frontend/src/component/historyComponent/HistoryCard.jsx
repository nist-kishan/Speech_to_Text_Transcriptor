import React from "react";

import { FileText, Clock, Trash2 } from "lucide-react";
import { useTranscript } from "../../hooks/useTranscript";

function timeConvertor(timestamp) {
  return timestamp ? new Date(timestamp).toLocaleString() : "-";
}

export default function HistoryCard({ id, transcript, timestamp }) {
  const { deleteHistory } = useTranscript();

  return (
    <div className="w-full mb-2">
      <div
        className="bg-white/10 backdrop-blur-lg border border-white/20 
                   rounded-xl p-4 shadow-lg hover:shadow-2xl 
                   transition transform hover:-translate-y-1 
                   flex flex-col justify-between gap-4
                   w-full h-[150px]"
      >
        <div className="flex items-start gap-3">
          <FileText className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
          <div className="text-gray-200 space-y-1">
            <p className="text-sm line-clamp-3">{transcript}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-400 text-sm mt-auto">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{timeConvertor(timestamp)}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => deleteHistory(id)}
              className="flex items-center gap-2 px-3 py-1.5 
                         bg-gray-800 hover:bg-gray-700 
                         text-white rounded-lg text-sm transition cursor-pointer"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
