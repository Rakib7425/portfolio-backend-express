import { Router } from "express";
import { saveToLocal } from "../middlewares/multer.middleware.js";
import {
	addProject,
	updateProject,
	deleteProject,
	getProjects,
	getProjectById,
} from "../controllers/project.controller.js";
const router = Router();

//
router.route("/addproject").post(
	saveToLocal.fields([
		{
			name: "images",
			maxCount: 3,
		},
	]),
	addProject
);

router.route("/updateproject").patch(
	saveToLocal.fields([
		{
			name: "images",
			maxCount: 3,
		},
	]),
	updateProject
);

router.route("/deleteproject").delete(
	saveToLocal.fields([
		{
			name: "images",
			maxCount: 3,
		},
	]),
	deleteProject
);

router.route("/getprojects").get(getProjects);
router.route("/getproject/:id").get(getProjectById);

export default router;
