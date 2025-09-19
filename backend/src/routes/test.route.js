import { Router } from "express"
import { ApiResponse } from "../utils/ApiResponse.js";

const testRouter = Router();

testRouter.post("/", (req, res) => {
  res.status(200).json(new ApiResponse(200,"API is running"));
});

export {testRouter}