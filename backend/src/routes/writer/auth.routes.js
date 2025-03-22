import { Router } from "express";
import { loginWriter, logoutWriter } from "../../controllers/writer/auth.controller.js";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";

const routes = Router();

routes.route("/login").post(loginWriter);
routes.route("/login").post(loginWriter);

routes.route("/logout").post(authenticateAndVerifyWriter, logoutWriter);
export default routes;
