import { Router } from "express"

const authRouter = Router();

import { registerUser, loginUser, logoutUser, currentUser, refreshToken } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

authRouter.route("/signup").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(verifyToken, logoutUser);
authRouter.route("/me").get(verifyToken, currentUser);
authRouter.route("/refresh").get(refreshToken);

export default authRouter;
