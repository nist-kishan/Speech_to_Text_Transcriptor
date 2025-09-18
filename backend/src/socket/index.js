import { liveTranscriptHandler } from "./liveTranscript.js";
import { socketAuthMiddleware } from "./middleware.js";

export const socketHandler = (io) => {
  const namespace = io.of("/liveTranscript");
  namespace.use(socketAuthMiddleware);
  liveTranscriptHandler(namespace);
};
