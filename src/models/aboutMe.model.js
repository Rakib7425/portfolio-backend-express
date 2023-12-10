import mongoose, { Schema } from "mongoose";

const AboutMeSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			lowercase: true,
			trim: true,
		},
		currentAddress: {
			type: String,
			required: [true, "Current Address is required"],
		},
		currentlyLearning: {
			type: String,
			required: [true, "Currently Learning is required"],
		},

		workHistory: {
			type: String,
		},

		techStack: [{ type: String }],

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
