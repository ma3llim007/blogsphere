import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { deleteModerator, listModerator, registerModerator } from "../../controllers/admin/moderatorAuth.controller.js";

const routes = Router();

routes.use(authenticateAndVerifyAdmin);

routes.route("/register-moderator").post(registerModerator);
routes.route("/delete-moderator/:moderatorId").delete(deleteModerator);
routes.route("/moderators").get(listModerator);

export default routes;
