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

	// Find the existing about me entry by name
	const existingAboutMe = await AboutMe.findOne({ name });
	const profilePhoto = await uploadOnCloudinary(req.file.path);

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
	const { techStack, _id } = req.body;

	const data = await AboutMe.findById(_id);
	if (!data) {
		throw new ApiError(404, "AboutMe entry not found");
	}
	data.techStack.push(techStack);
	const dbRes = await data.save();

	return res
		.status(200)
		.json(new ApiResponse(200, true, "Tech Stack added successfully !!", dbRes));
});

export { AddAboutMe, updateAboutMe, addAboutMeTechStack };
