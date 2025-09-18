import { WebSocket } from "ws";
import Transcript from "../models/transcript.model.js";
import History from "../models/history.model.js";
import { ApiError } from "../utils/ApiError.js";

export const liveTranscriptHandler = (namespace) => {
  namespace.on("connection", (socket) => {
    const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
    if (!DEEPGRAM_API_KEY) {
      socket.emit("error", new ApiError(500, "Deepgram API key missing"));
      socket.disconnect(true);
      return;
    }

    const deepgramUrl = process.env.DEEPGRAM_SOCKET_API;

    const dgSocket = new WebSocket(deepgramUrl, {
      headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` },
    });

    let fullTranscript = "";

    dgSocket.on("message", (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        const text = data?.channel?.alternatives?.[0]?.transcript || "";
        if (text) fullTranscript += text + " ";
        socket.emit("transcript", data);
      } catch (err) {
        socket.emit(
          "error",
          new ApiError(500, "Failed to parse Deepgram message")
        );
      }
    });

    dgSocket.on("error", (err) => {
      socket.emit("error", new ApiError(500, err.message));
    });

    socket.on("audio-chunk", (base64Chunk) => {
      if (dgSocket.readyState === WebSocket.OPEN) {
        dgSocket.send(Buffer.from(base64Chunk, "base64"));
      }
    });

    socket.on("end-stream", () => {
      if (dgSocket.readyState === WebSocket.OPEN) dgSocket.close();
    });

    socket.on("disconnect", async () => {
      if (fullTranscript.trim() && socket.user?._id) {
        try {
          const transcriptDoc = await Transcript.create({
            user: socket.user._id,
            transcriptText: fullTranscript.trim(),
            language: "en",
          });

          await History.create({
            user: socket.user._id,
            action: "TRANSCRIBE",
            transcript: transcriptDoc._id,
            details: "Live transcription from WebSocket session",
          });

          socket.emit("transcriptSaved", {
            message: "Transcript saved successfully",
          });
        } catch (err) {
          socket.emit(
            "error",
            new ApiError(500, "Failed to save transcript/history")
          );
        }
      }

      if (
        dgSocket.readyState === WebSocket.OPEN ||
        dgSocket.readyState === WebSocket.CONNECTING
      ) {
        dgSocket.close();
      }
    });
  });
};
