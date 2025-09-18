import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "UPLOAD_AUDIO",
        "TRANSCRIBE",
        "DELETE_TRANSCRIPT",
        "LOGIN",
        "LOGOUT",
      ],
    },
    transcript: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transcript",
    },
    details: { type: String },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);
export default History;
