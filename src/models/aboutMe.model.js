import mongoose, { Schema } from "mongoose";

const AboutMeSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		currentAddress: {
			type: String,
			required: [true, "Current Address is required"],
			unique: true,
		},
		currentlyLearning: {
			type: String,
			required: [true, "Currently Learning is required"],
			unique: true,
		},

		workHistory: {
			type: String,
		},

		techStack: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		profilePhoto: {
			type: String, // cloudinary url
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const AboutMe = mongoose.model("AboutMe", AboutMeSchema);
