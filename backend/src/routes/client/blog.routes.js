import { Router } from "express";
import { blogs } from "../../controllers/client/blog.controller.js";

const routes = Router();

routes.route("/blogs").get(blogs);

export default routes;
