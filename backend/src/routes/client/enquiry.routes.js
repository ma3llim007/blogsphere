import { Router } from "express";
import { saveEnquiry } from "../../controllers/client/client.controller.js";

const routes = Router();

routes.route("/save").post(saveEnquiry);

export default routes;
