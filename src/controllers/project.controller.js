import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";

const addProject = asyncHandler(async (req, res) => {
	//Extract field from body
	const { title, hostedLink, gitHubLink, technologies, description, category, challenges } =
		req.body;

	// Check if empty
	if (
		[title, hostedLink, gitHubLink, technologies, description, category, challenges].some(
			(field) => !field?.trim()
		)
	) {
		throw new ApiError(400, "All fields are required");
	}

	let localImagesPath = [];

	if (req.files && Array.isArray(req.files.images) && req.files.images.length > 0) {
		for (let index = 0; index < req.files.images.length; index++) {
			localImagesPath.push(req.files.images[index].path);
		}
	}

	if (localImagesPath.length < 1) {
		throw new ApiError(400, "Poster file is required");
	}

	let newPosterUrls = [];
	for (let index = 0; index < localImagesPath.length; index++) {
		let cloudinaryResponse = await uploadOnCloudinary(localImagesPath[index]);
		newPosterUrls.push(cloudinaryResponse.secure_url);
	}

	const dbResponse = new Project({
		title,
		hostedLink,
		gitHubLink,
		images: newPosterUrls,
		technologies: technologies.split(","),
		description,
		category,
		challenges,
	});

	const newProject = await dbResponse.save();

	//
	return res
		.status(201)
		.json(new ApiResponse(201, true, "Project added Successfully", newProject));
});

//
const updateProject = asyncHandler(async (req, res) => {
	const _id = req.query.id;

	const { title, hostedLink, gitHubLink, technologies, description, category, challenges } =
		req.body;
	if (
		[_id, title, hostedLink, gitHubLink, technologies, description, category, challenges].some(
			(field) => !field?.trim()
		)
	) {
		throw new ApiError(400, "All fields are required");
	}

	let localImagesPath = [];
	let newPosterUrls = [];

	if (req.files && Array.isArray(req.files.images) && req.files.images.length > 0) {
		for (let index = 0; index < req.files.images.length; index++) {
			localImagesPath.push(req.files.images[index].path);
			let cloudinaryResponse = await uploadOnCloudinary(localImagesPath[index]);
			newPosterUrls.push(cloudinaryResponse.secure_url);
		}
	}

	if (localImagesPath.length < 1) {
		const response = await Project.findByIdAndUpdate(
			{ _id: _id },
			{
				title,
				hostedLink,
				gitHubLink,
				technologies,
				description,
				category,
				challenges,
			},
			{ new: true } // Ensure you get the updated document in the response
		).select("-password -refreshToken");

		if (!response) {
			return res
				.status(404)
				.json(new ApiResponse(404, false, `Project not found with id ${_id}`, ""));
		} else {
			return res
				.status(200)
				.json(new ApiResponse(200, true, "Project updated successfully", response));
		}
	} else {
		const updatedProject = await Project.findByIdAndUpdate(
			{ _id: _id },
			{
				title,
				hostedLink,
				gitHubLink,
				images: newPosterUrls,
				technologies: technologies.split(","),
				description,
				category,
				challenges,
			},
			{ new: true } // Ensure you get the updated document in the response
		).select("-password -refreshToken");

		if (!updatedProject) {
			return res
				.status(404)
				.json(new ApiResponse(404, false, `Project not found with id ${_id}`, ""));
		} else {
			return res
				.status(200)
				.json(new ApiResponse(200, true, "Project updated successfully", updatedProject));
		}
	}
});

const deleteProject = asyncHandler(async (req, res) => {
	const id = req.query.id;

	const deletedData = await Project.findByIdAndUpdate(
		{ _id: id },
		{ isDeleted: true },
		{ new: true }
	);

	if (!deletedData) {
		return res
			.status(404)
			.json(new ApiResponse(404, false, `Project not found with id ${id}`, ""));
	} else {
		return res
			.status(200)
			.json(new ApiResponse(200, true, "Project Deleted successfully", deletedData));
	}
});

const getProjects = asyncHandler(async (_, res) => {
	const data = await Project.find({ isDeleted: false });

	if (!data) {
		return res.status(404).json(new ApiResponse(404, false, `Project not found`, ""));
	} else {
		return res
			.status(200)
			.json(new ApiResponse(200, true, "Projects fetched successfully", data));
	}
});

const getProjectById = asyncHandler(async (req, res) => {
	const projectId = req.params.id;

	const data = await Project.find({ _id: projectId });

	if (!data) {
		return res
			.status(404)
			.json(new ApiResponse(404, false, `Project not found with id ${projectId}`, ""));
	} else {
		return res
			.status(200)
			.json(new ApiResponse(200, true, "Project Fetched successfully", data));
	}
});

export { addProject, updateProject, deleteProject, getProjects, getProjectById };
