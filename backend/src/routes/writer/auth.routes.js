import { Router } from "express";
import { checkSessionWriter, getWriter, loginWriter, logoutWriter, updateDetailsWriter } from "../../controllers/writer/auth.controller.js";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";

const routes = Router();

routes.route("/login").post(loginWriter);

routes.route("/logout").post(authenticateAndVerifyWriter, logoutWriter);
routes.route("/writer").get(authenticateAndVerifyWriter, getWriter);
routes.route("/check-session-writer").get(authenticateAndVerifyWriter, checkSessionWriter);
routes.route("/update-writer").patch(authenticateAndVerifyWriter, updateDetailsWriter);

export default routes;
