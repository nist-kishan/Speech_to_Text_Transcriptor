import React from "react";

import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

export default function LiveTranscriptor() {
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [canStartNew, setCanStartNew] = useState(false);

  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);

  const connectSocket = useCallback(() => {
    socketRef.current?.disconnect();
    const s = io(`${import.meta.env.VITE_API_BASE_URL}/liveTranscript`, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    socketRef.current = s;

    s.on("connect_error", (err) => setError(err.message));
    s.on("transcript", (data) => {
      const text = data?.channel?.alternatives?.[0]?.transcript || "";
      if (text) setTranscript((prev) => prev + " " + text);
    });
  }, []);

  useEffect(() => {
    connectSocket();
    return () => socketRef.current?.disconnect();
  }, [connectSocket]);

  const sendAudioChunk = useCallback((blob) => {
    if (!socketRef.current) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      socketRef.current.emit("audio-chunk", base64);
    };
    reader.readAsDataURL(blob);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) sendAudioChunk(event.data);
      };

      mediaRecorder.onstop = () => {
        setRecording(false);
        setPaused(false);
        setCanStartNew(true);
        toast.success("Recording stopped!");
      };

      mediaRecorder.start(350);
      setRecording(true);
      setPaused(false);
      setCanStartNew(false);
      toast.success("Recording started!");
    } catch (err) {
      console.error("Could not start recording:", err);
      toast.error("Failed to access microphone.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };
  const pauseRecording = () => {
    mediaRecorderRef.current?.pause();
    setPaused(true);
    toast("Recording paused");
  };
  const resumeRecording = () => {
    mediaRecorderRef.current?.resume();
    setPaused(false);
    toast.success("Recording resumed");
  };

  const resetTranscript = () => {
    mediaRecorderRef.current?.stream
      ?.getTracks()
      .forEach((track) => track.stop());
    mediaRecorderRef.current = null;
    setTranscript("");
    setError(null);
    setRecording(false);
    setPaused(false);
    setCanStartNew(false);
    connectSocket();
    toast.success("Transcript reset!");
  };

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stream
        ?.getTracks()
        .forEach((track) => track.stop());
      socketRef.current?.disconnect();
    };
  }, []);

  const buttonClass =
    "px-6 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#1b337a] text-white font-semibold transition";

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">
        🎤 Live Transcriptor
      </h2>

      {error && (
        <p className="text-red-400 p-3 rounded mb-4 border border-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {!recording && !canStartNew && (
          <button onClick={startRecording} className={buttonClass}>
            Start Recording
          </button>
        )}

        {recording && (
          <>
            <button onClick={stopRecording} className={buttonClass}>
              Stop
            </button>
            {!paused ? (
              <button
                onClick={pauseRecording}
                className={buttonClass + " text-black"}
              >
                Pause
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className={buttonClass + " text-black"}
              >
                Resume
              </button>
            )}
          </>
        )}

        {canStartNew && (
          <button onClick={resetTranscript} className={buttonClass}>
            New Transcript
          </button>
        )}
      </div>

      {transcript && (
        <div className="p-4 rounded-lg border border-gray-700 max-h-96 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2 text-indigo-300 text-center">
            Full Transcript
          </h3>
          <p className="whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
  );
}
