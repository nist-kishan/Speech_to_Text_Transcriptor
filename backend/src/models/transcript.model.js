import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    audioUrl: {
      type: String,
    },
    transcriptText: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "en",
    },
  },
  { timestamps: true }
);

const Transcript = mongoose.model("Transcript", transcriptSchema);
export default Transcript;
