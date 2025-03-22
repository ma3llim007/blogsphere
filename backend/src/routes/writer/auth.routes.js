import { Router } from "express";
import { loginWriter } from "../../controllers/writer/auth.controller.js";

const routes = Router();

routes.route("/login").post(loginWriter);

export default routes;
