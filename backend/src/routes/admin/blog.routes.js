import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { allBlogs } from "../../controllers/admin/blog.controller.js";

const router = Router();
router.use(authenticateAndVerifyAdmin);

router.route("/all-blogs").get(allBlogs);

export default router;
