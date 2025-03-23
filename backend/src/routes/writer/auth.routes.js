import { Router } from "express";
import { changePasswordWriter, checkSessionWriter, getWriter, loginWriter, logoutWriter, updateDetailsWriter } from "../../controllers/writer/auth.controller.js";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";

const routes = Router();

routes.route("/login").post(loginWriter);

routes.route("/logout").post(authenticateAndVerifyWriter, logoutWriter);
routes.route("/writer").get(authenticateAndVerifyWriter, getWriter);
routes.route("/check-session-writer").get(authenticateAndVerifyWriter, checkSessionWriter);
routes.route("/update-writer").patch(authenticateAndVerifyWriter, updateDetailsWriter);
routes.route("/change-password").patch(authenticateAndVerifyWriter, changePasswordWriter);

export default routes;
