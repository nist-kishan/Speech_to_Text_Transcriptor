import React from "react";

import { Upload, FileAudio, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useTranscript } from "../../hooks/useTranscript";

export default function AudioFileUploader() {
  const fileInputRef = useRef(null);
  const [audio, setAudio] = useState(null);
  const { uploadAudio, loading, } = useTranscript();

  const handleFileSelect = (e) => setAudio(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audio) return;
    await uploadAudio(audio);
    setAudio(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 bg-transparent"
    >
      <label className="w-full">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-2xl p-8 cursor-pointer hover:border-indigo-500 hover:bg-gray-800/30 transition">
          <FileAudio className="h-12 w-12 text-indigo-400" />
          <p className="mt-3 text-gray-300 text-sm">
            {audio ? (
              <span className="font-medium text-indigo-300">{audio.name}</span>
            ) : (
              "Click to select audio file"
            )}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={!audio || loading}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Generating transcript...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5" />
            Upload & Transcribe
          </>
        )}
      </button>
    </form>
  );
}
