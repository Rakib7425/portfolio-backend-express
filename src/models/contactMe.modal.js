import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, "Full Name is required"],
			trim: true,
		},

		email: {
			type: String,
			required: [true, "Email is required"],
			lowercase: true,
			trim: true,
		},
		subject: {
			type: String,
			required: [true, "Full Name is required"],
			trim: true,
		},
		message: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export const ContactMe = mongoose.model("ContactMe", contactSchema);
