import { Router } from "express";
import authenticateAndVerifyModerator from "../../middlewares/authenticateAndVerifyModerator.js";
import { approvedBlogs, getBlog, getOptionsCategory, latestBlogs, needRevisionBlogs, rejectedBlogs, reviewBlog } from "../../controllers/moderator/blog.controller.js";

const router = Router();

router.use(authenticateAndVerifyModerator);

router.route("/options-category").get(getOptionsCategory);
router.route("/latest-blogs").get(latestBlogs);
router.route("/approved-blogs").get(approvedBlogs);
router.route("/need-revisions-blogs").get(needRevisionBlogs);
router.route("/rejects-blogs").get(rejectedBlogs);
router.route("/blog/:blogId").get(getBlog);
router.route("/review-blog/:blogId").patch(reviewBlog);

export default router;
