import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

export const useLiveTranscript = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [liveText, setLiveText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(`${import.meta.env.VITE_API_BASE_URL}/liveTranscript`, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    setSocket(s);

    s.on("connect", () => setIsConnected(true));
    s.on("disconnect", () => setIsConnected(false));
    s.on("connect_error", (err) => setError(err.message));

    s.on("transcript", (data) => {
      const text = data?.channel?.alternatives?.[0]?.transcript || "";
      if (text) {
        setLiveText(text);
        setTranscript((prev) => prev + " " + text);
      }
    });

    return () => s.disconnect();
  }, []);

  const sendAudioChunk = useCallback(
    (blob) => {
      if (!socket) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        socket.emit("audio-chunk", base64);
      };
      reader.readAsDataURL(blob);
    },
    [socket]
  );

  return { isConnected, error, liveText, transcript, sendAudioChunk };
};
