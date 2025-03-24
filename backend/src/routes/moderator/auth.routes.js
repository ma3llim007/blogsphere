import { Router } from "express";
import { loginModerator } from "../../controllers/moderator/auth.controller.js";

const routes = Router();

// Routes
routes.route("/login").post(loginModerator);

export default routes;
