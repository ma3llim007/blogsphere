import { Router } from "express";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";
import { dashboardAnalytic } from "../../controllers/writer/dashboard.controller.js";

const router = Router();
router.use(authenticateAndVerifyWriter);

// Routes
router.route("/analytic").get(dashboardAnalytic);

export default router;
