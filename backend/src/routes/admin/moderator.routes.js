import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { deleteModerator, getModeratorById, listModerator, registerModerator, verifyModeratorById } from "../../controllers/admin/moderatorAuth.controller.js";

const routes = Router();

routes.use(authenticateAndVerifyAdmin);

routes.route("/register-moderator").post(registerModerator);
routes.route("/delete-moderator/:moderatorId").delete(deleteModerator);
routes.route("/moderators").get(listModerator);
routes.route("/moderator/:moderatorId").get(getModeratorById);
routes.route("/update-moderator-status/:moderatorId").patch(verifyModeratorById);

export default routes;
