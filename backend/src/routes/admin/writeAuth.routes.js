import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { deleteWriter, registerWriter, verifyWriter, viewWriter, writerListing } from "../../controllers/admin/writerAuth.controller.js";

const routes = Router();

routes.use(authenticateAndVerifyAdmin);
// Routes
routes.route("/register-writer").post(registerWriter);
routes.route("/delete-writer/:writerId").delete(deleteWriter);
routes.route("/writers").get(writerListing);
routes.route("/writer/:writerId").get(viewWriter);
routes.route("/update-writer-status/:writerId").patch(verifyWriter);

export default routes;
