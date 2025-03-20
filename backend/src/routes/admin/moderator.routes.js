import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { registerModerator } from "../../controllers/admin/moderatorAuth.controller.js";

const routes = Router();

routes.use(authenticateAndVerifyAdmin);

routes.route("/register-moderator").post(registerModerator);

export default routes;
