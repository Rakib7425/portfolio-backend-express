import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ContactMe } from "../models/contactMe.modal.js";

/* Handles the registration of a Admin. It
takes in two parameters, `req` and `res`, which represent the request and response objects
respectively. */

const registerAdmin = asyncHandler(async (req, res) => {
	const { fullName, email, username, password } = req.body;

	if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const existedUser = await Admin.findOne({
		$or: [{ username }, { email }],
	});

	if (existedUser) {
		throw new ApiError(409, "User with email or username already exists");
	}

	const avatarLocalPath = req.file?.path;

	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar file is required");
	}

	let avatar = "";

	if (!existedUser) {
		avatar = await uploadOnCloudinary(avatarLocalPath);
	}

	if (!avatar) {
		throw new ApiError(400, "Avatar file is required");
	}

	const user = await Admin.create({
		username: username.toLowerCase(),
		email,
		fullName,
		avatar: avatar.secure_url,
		password,
	});

	const createdUser = await Admin.findById(user._id).select("-password -refreshToken");

	if (!createdUser) {
		throw new ApiError(500, "Something went wrong while registering the user");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, true, "User registered Successfully", createdUser));
});

/* Handling the loginAdmin functionality of a Admin. It takes in the
`req` (request) and `res` (response) objects as parameters. */
const loginAdmin = asyncHandler(async (req, res) => {
	//
	const identifier = req.body.identifier; // loginAdmin with username or email
	const password = req.body.password;

	const user = await Admin.findOne({
		$or: [{ username: identifier }, { email: identifier }],
	});

	if (!user) {
		throw new ApiError(404, "No user found or invalid credentials!");
	}

	const isPasswordCorrect = await user.isPasswordCorrect(password);

	if (!isPasswordCorrect) {
		throw new ApiError(401, "Incorrect password!");
	}

	return res.status(200).json(new ApiResponse(200, true, "Successfully logged in!", user));
});

const addContactMe = asyncHandler(async (req, res) => {
	const { fullName, email, subject, message } = req.body;

	if ([fullName, email, subject, message].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const data = await new ContactMe({
		fullName,
		email,
		subject,
		message,
	});

	const createdData = await data.save();

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				true,
				"Form Successfully Submitted. I'll contact you soon!",
				createdData
			)
		);
});

const getContactMe = asyncHandler(async (req, res) => {
	const data = await ContactMe.find({});
	return res.status(200).json(new ApiResponse(200, true, "All form fetched successfully!", data));
});

export { registerAdmin, loginAdmin, addContactMe, getContactMe };
