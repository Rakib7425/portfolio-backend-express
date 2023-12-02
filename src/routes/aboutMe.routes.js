import { Router } from "express";
import { AddAboutMe, updateAboutMe } from "../controllers/aboutMe.controller.js";

import { saveToLocal } from "../middlewares/multer.middleware.js";

const aboutMeRouter = Router();

aboutMeRouter.route("/").post(saveToLocal.single("profilePhoto"), AddAboutMe);
aboutMeRouter.route("/").patch(saveToLocal.single("profilePhoto"), updateAboutMe);

export default aboutMeRouter;
