import express from "express";
import cors from "cors";
import transcriptRouter from "./routes/transcript.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/error.miidleware.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Transcript API is running");
});

app.use("/api/transcripts", transcriptRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

export default app;
