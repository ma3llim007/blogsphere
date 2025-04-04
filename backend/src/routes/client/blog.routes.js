import { Router } from "express";
import { blogs, categoryByBlogs } from "../../controllers/client/blog.controller.js";

const routes = Router();

routes.route("/blogs").get(blogs);
routes.route("/category-by-blogs/:categorySlug").get(categoryByBlogs);

export default routes;
