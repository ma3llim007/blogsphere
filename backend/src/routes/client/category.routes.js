import { Router } from "express";
import { categories, headerCategory } from "../../controllers/client/client.controller.js";

const routes = Router();

routes.route("/get-categories").get(headerCategory);
routes.route("/categories").get(categories);

export default routes;
