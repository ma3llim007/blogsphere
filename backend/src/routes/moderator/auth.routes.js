import { Router } from "express";
import { changePasswordModerator, checkSession, getModerator, loginModerator, logOutModerator, updateDetailsModerator } from "../../controllers/moderator/auth.controller.js";
import authenticateAndVerifyModerator from "../../middlewares/authenticateAndVerifyModerator.js";

const routes = Router();

// Routes
routes.route("/login").post(loginModerator);
// Protected Router - Only Access When The Moderator Is Login
routes.route("/logout").post(authenticateAndVerifyModerator, logOutModerator);
routes.route("/change-password").patch(authenticateAndVerifyModerator, changePasswordModerator);
routes.route("/moderator").get(authenticateAndVerifyModerator, getModerator);
routes.route("/update-moderator").patch(authenticateAndVerifyModerator, updateDetailsModerator);
routes.route("/check-session-moderator").get(authenticateAndVerifyModerator, checkSession);

export default routes;
