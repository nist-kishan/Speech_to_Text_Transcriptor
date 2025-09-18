import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    const cookies = parseCookies(cookieHeader);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    if (!accessToken) {
      return next(new ApiError(401, "Unauthorized: No access token"));
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return next(new ApiError(401, "Unauthorized: User not found"));

      socket.user = user;
      return next();
    } catch (err) {
      if (!refreshToken) {
        return next(new ApiError(401, "Unauthorized: Token expired"));
      }

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decodedRefresh.id).select("-password");
        if (!user)
          return next(new ApiError(401, "Unauthorized: User not found"));

        socket.user = user;
        return next();
      } catch (refreshErr) {
        return next(new ApiError(401, "Unauthorized: Invalid refresh token"));
      }
    }
  } catch (err) {
    return next(new ApiError(500, "Socket auth error"));
  }
};

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    cookies[name.trim()] = decodeURIComponent(rest.join("="));
  });

  return cookies;
}
