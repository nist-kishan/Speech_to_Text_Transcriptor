import { createClient } from "@deepgram/sdk";
import fs from "fs";
import Transcript from "../models/transcript.model.js";
import History from "../models/history.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const localAudioUpload = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const audio = req.file;
  if (!audio) throw new ApiError(400, "No audio file provided");

  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  const result = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync(audio.path),
    { model: "nova-3", smart_format: true }
  );

  if (!result) throw new ApiError(500, "Deepgram transcription failed");

  const transcription =
    result.result.results.channels[0].alternatives[0].transcript;

  fs.unlinkSync(audio.path);

  const transcriptEntry = await Transcript.create({
    user: userId,
    audioUrl: audio.originalname,
    transcriptText: transcription,
    language: "en",
  });

  const historyEntry = await History.create({
    user: userId,
    action: "TRANSCRIBE",
    transcript: transcriptEntry._id,
    details: `Uploaded and transcribed audio file: ${audio.originalname}`,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { history: historyEntry._id },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Transcription successful", transcriptEntry));
});

export const getUserHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const history = await History.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("transcript")
    .populate("user", "name email")
    .lean();

  res.status(200).json(new ApiResponse(200, "User history fetched", history));
});


export const deleteHistoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const history = await History.findOneAndDelete({ _id: id, user: userId });
  if (!history) throw new ApiError(404, "History not found");

  if (history.transcript) {
    await Transcript.findByIdAndDelete(history.transcript);
  }

  await User.findByIdAndUpdate(userId, { $pull: { history: id } });

  res.status(200).json(new ApiResponse(200, "History deleted successfully"));
});

export const clearHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const histories = await History.find({ user: userId });

  const transcriptIds = histories
    .filter((h) => h.transcript)
    .map((h) => h.transcript);
  await Transcript.deleteMany({ _id: { $in: transcriptIds } });

  await History.deleteMany({ user: userId });

  await User.findByIdAndUpdate(userId, { $set: { history: [] } });

  res
    .status(200)
    .json(new ApiResponse(200, "All history cleared successfully"));
});

export const getTranscriptById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const historyItem = await History.findOne({
    _id: id,
    user: userId,
    action: "TRANSCRIBE",
  })
    .populate("transcript")
    .lean();

  if (!historyItem) throw new ApiError(404, "Transcript not found");

  res.status(200).json(
    new ApiResponse(200, "Transcript fetched successfully", {
      transcript: historyItem.transcript,
      createdAt: historyItem.createdAt,
      details: historyItem.details,
    })
  );
});
