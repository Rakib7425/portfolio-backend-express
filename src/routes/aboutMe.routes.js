import { Router } from "express";
import {
	AddAboutMe,
	addAboutMeTechStack,
	updateAboutMe,
	getAboutMe,
} from "../controllers/aboutMe.controller.js";

import { saveToLocal } from "../middlewares/multer.middleware.js";

const aboutMeRouter = Router();

aboutMeRouter.route("/").post(saveToLocal.single("profilePhoto"), AddAboutMe);
aboutMeRouter.route("/").patch(saveToLocal.single("profilePhoto"), updateAboutMe);
aboutMeRouter.route("/").put(addAboutMeTechStack);
aboutMeRouter.route("/").get(getAboutMe);

export default aboutMeRouter;
