import express from "express";
import {
  getUserHistory,
  localAudioUpload,
  deleteHistoryById,
  clearHistory,
} from "../controllers/transcript.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { verifyToken} from "../middleware/auth.middleware.js";

const transcriptRouter = express.Router();

transcriptRouter
  .route("/local-audio")
  .post(verifyToken, upload.single("audio"), localAudioUpload);

transcriptRouter.get("/history", verifyToken, getUserHistory);

transcriptRouter.route("/history/id/:id").delete(verifyToken, deleteHistoryById);

transcriptRouter
  .route("/history/clear_history")
  .delete(verifyToken, clearHistory);

export default transcriptRouter;
