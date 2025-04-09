import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { deleteEnquiry, enquiryListing, viewEnquiry } from "../../controllers/admin/enquiry.controller.js";

const routes = Router();
routes.use(authenticateAndVerifyAdmin);

// Routes
routes.route("/enquiry-list").get(enquiryListing);
routes.route("/view-enquiry/:enquiryId").get(viewEnquiry);
routes.route("/delete-enquiry/:enquiryId").delete(deleteEnquiry);

export default routes;
