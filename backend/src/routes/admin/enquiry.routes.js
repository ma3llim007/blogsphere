import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { enquiryListing } from "../../controllers/admin/enquiry.controller.js";

const routes = Router();
routes.use(authenticateAndVerifyAdmin);

// Routes
routes.route("/enquiry-list").get(enquiryListing);

export default routes;
