import { Router } from "express";
import {
	registerAdmin,
	loginAdmin,
	addContactMe,
	getContactMe,
} from "../controllers/admin.controller.js";

import { saveToLocal } from "../middlewares/multer.middleware.js";

const adminRouter = Router();

adminRouter.route("/register").post(saveToLocal.single("avatar"), registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/contact").get(getContactMe);
adminRouter.route("/contact").post(addContactMe);

export default adminRouter;
