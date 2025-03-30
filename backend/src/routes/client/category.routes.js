import { Router } from "express";
import { headerCategory } from "../../controllers/client/client.controller.js";

const routes = Router();

routes.route("/get-categories").get(headerCategory);

export default routes;
