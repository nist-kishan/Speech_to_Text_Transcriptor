import { options } from "../constraints/httpsOnly.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Name and email are required");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User already exists with this email");
  }
  if (!password || password.length < 6) {
    throw new ApiError(
      400,
      "Password is required and should be at least 6 characters"
    );
  }

  

  const newUser = new User({ name, email, password });
  const savedUser = await newUser.save();
  const userResponse = await User.findById(savedUser._id).select(
    "-password -refreshToken -resetPasswordToken -resetPasswordExpires"
  );

  if (!userResponse) {
    throw new ApiError(500, "Error in creating user");
  }

  return res
    .status(201)
    .json({ message: "User registered successfully", user: userResponse });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const isPasswordMatched = await user.isPasswordCorrect(password);
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -resetPasswordToken -resetPasswordExpires"
  );
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "Login successful", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logout successful"));
});

export const currentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", {
      user: req.user,
    })
  );
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(401, "No refresh token provided");
  }
  const decodedToken = jwt.verify(
    incommingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedToken) {
    throw new ApiError(401, "Invalid or Expire refresh token");
  }

  const user = await User.findById(decodedToken.id).select(
    "-password -resetPasswordToken -resetPasswordExpires"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (incommingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token does not match");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "Access token refreshed successfully", {
        user,
        accessToken,
      })
    );
});
