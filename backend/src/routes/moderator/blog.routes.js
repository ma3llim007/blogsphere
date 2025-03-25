import { Router } from "express";
import { getBlog, getOptionsCategory, latestBlog, reviewBlog } from "../../controllers/moderator/blog.controller.js";
import authenticateAndVerifyModerator from "../../middlewares/authenticateAndVerifyModerator.js";

const router = Router();

router.use(authenticateAndVerifyModerator);

router.route("/options-category").get(getOptionsCategory);
router.route("/latest-blog").get(latestBlog);
router.route("/blog/:blogId").get(getBlog);
router.route("/review-blog/:blogId").patch(reviewBlog);

export default router;
