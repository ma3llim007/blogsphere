import { Router } from "express";
import { checkSession, loginModerator } from "../../controllers/moderator/auth.controller.js";

const routes = Router();

// Routes
routes.route("/login").post(loginModerator);
routes.route("/check-session-moderator").post(checkSession);

export default routes;
