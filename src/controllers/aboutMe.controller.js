import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { AboutMe } from "../models/aboutMe.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const AddAboutMe = asyncHandler(async (req, res) => {
	// Extract data from the request body
	const { name, email, currentAddress, currentlyLearning, workHistory, techStack, description } =
		req.body;

	const profilePhoto = await uploadOnCloudinary(req.file.path);

	const newAboutMe = new AboutMe({
		name,
		email,
		currentAddress,
		currentlyLearning,
		workHistory,
		techStack,
		profilePhoto: req.file ? profilePhoto.secure_url : "",
		description,
	});

	// Save the new about me entry to the database
	const savedAboutMe = await newAboutMe.save();

	res.status(201).json(savedAboutMe);
});

const updateAboutMe = asyncHandler(async (req, res) => {
	const { name, email, currentAddress, currentlyLearning, workHistory, techStack, description } =
		req.body;

	// Find the existing about me entry
	const dbRes = await AboutMe.find({});

	if (!dbRes) {
		throw new ApiError(404, "AboutMe entry not found");
	}

	const existingAboutMe = dbRes[dbRes.length - 1];
	const profilePhoto = await uploadOnCloudinary(req.file?.path || "");

	// Update the fields if they exist in the request body
	if (existingAboutMe) {
		existingAboutMe.name = name || existingAboutMe.name;
		existingAboutMe.email = email || existingAboutMe.email;
		existingAboutMe.currentAddress = currentAddress || existingAboutMe.currentAddress;
		existingAboutMe.currentlyLearning = currentlyLearning || existingAboutMe.currentlyLearning;
		existingAboutMe.workHistory = workHistory || existingAboutMe.workHistory;
		existingAboutMe.techStack = techStack || existingAboutMe.techStack;
		existingAboutMe.profilePhoto = req.file
			? profilePhoto.secure_url
			: existingAboutMe.profilePhoto;
		existingAboutMe.description = description || existingAboutMe.description;

		// Save the updated about me entry
		const updatedAboutMe = await existingAboutMe.save();
		return res
			.status(200)
			.json(new ApiResponse(200, true, "About updated Successfully", updatedAboutMe));
	} else {
		throw new ApiError(404, "AboutMe entry not found");
	}
});

/* Add a new tech stack to an existing AboutMe entry in the database. */
const addAboutMeTechStack = asyncHandler(async (req, res) => {
	// const { techStack, _id } = req.body;

	let techStack;
	if (req.file) {
		const response = await uploadOnCloudinary(req.file?.path);
		techStack = response.secure_url;
	} else {
		techStack = req.body.techStack;
	}

	// const data = await AboutMe.findById(_id);
	const findLastData = await AboutMe.find({});
	if (!findLastData) {
		throw new ApiError(404, "AboutMe entry not found");
	}
	const data = findLastData[findLastData.length - 1];
	if (!data) {
		throw new ApiError(404, "AboutMe entry not found");
	}

	data.techStack.push(techStack);

	const dbRes = await data.save();

	return res
		.status(200)
		.json(new ApiResponse(200, true, "Tech Stack added successfully !!", dbRes));
});

/* The `getAboutMe` function is an asynchronous handler that is used to fetch the latest AboutMe entry
from the database. */
const getAboutMe = asyncHandler(async (req, res) => {
	const dbRes = await AboutMe.find({});
	if (!dbRes) {
		throw new ApiError(404, "AboutMe entry not found");
	}
	const data = dbRes[dbRes.length - 1];
	return res.status(200).json(new ApiResponse(200, true, "Data fetched successfully !!", data));
});

export { AddAboutMe, updateAboutMe, addAboutMeTechStack, getAboutMe };
