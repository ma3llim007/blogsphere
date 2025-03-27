import { Router } from "express";
import authenticateAndVerifyModerator from "../../middlewares/authenticateAndVerifyModerator.js";
import { dashboardAnalytic } from "../../controllers/moderator/dashboard.controller.js";

const router = Router();
router.use(authenticateAndVerifyModerator);

// Routes
router.route("/analytic").get(dashboardAnalytic);

export default router;
