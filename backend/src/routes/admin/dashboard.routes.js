import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { dashboardAnalytic } from "../../controllers/admin/dashboard.controller.js";

const router = Router();
router.use(authenticateAndVerifyAdmin);

// Routes
router.route("/analytic").get(dashboardAnalytic);

export default router;
