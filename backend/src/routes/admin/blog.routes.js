import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { allBlogs, rejectedBlogs, revisionBlogs, viewBlogs } from "../../controllers/admin/blog.controller.js";

const router = Router();
router.use(authenticateAndVerifyAdmin);

router.route("/all-blogs").get(allBlogs);
router.route("/revision-blogs").get(revisionBlogs);
router.route("/rejected-blogs").get(rejectedBlogs);
router.route("/blog-details/:blogId").get(viewBlogs);

export default router;
