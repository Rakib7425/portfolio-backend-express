import { Router } from "express";
import {
	AddAboutMe,
	addAboutMeTechStack,
	updateAboutMe,
} from "../controllers/aboutMe.controller.js";

import { saveToLocal } from "../middlewares/multer.middleware.js";

const aboutMeRouter = Router();

aboutMeRouter.route("/").post(saveToLocal.single("profilePhoto"), AddAboutMe);
aboutMeRouter.route("/").patch(saveToLocal.single("profilePhoto"), updateAboutMe);
aboutMeRouter.route("/").put(addAboutMeTechStack);

export default aboutMeRouter;
