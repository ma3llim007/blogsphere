import { Router } from "express";
import { blogDetails, blogs, categoryByBlogs } from "../../controllers/client/blog.controller.js";

const routes = Router();

routes.route("/blogs").get(blogs);
routes.route("/category-by-blogs/:categorySlug").get(categoryByBlogs);
routes.route("/blog-details/:blogSlug").get(blogDetails);

export default routes;
