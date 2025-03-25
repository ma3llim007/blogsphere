import { Router } from "express";
import { getBlog, getOptionsCategory, latestBlog } from "../../controllers/moderator/blog.controller.js";

const router = Router();

router.route("/options-category").get(getOptionsCategory);
router.route("/latest-blog").get(latestBlog);
router.route("/blog/:blogId").get(getBlog);

export default router;
