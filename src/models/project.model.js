import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const projectPost = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		hostedLink: {
			type: String,
			required: true,
		},

		gitHubLink: {
			type: String,
			required: true,
		},

		images: {
			type: [String], // Array of strings of cloudinary
			default: [],
		},

		subject: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		challenges: {
			type: String,
			required: true,
		},

		technologies: {
			type: [String], // Array of strings
			default: [],
		},

		owner: {
			type: Schema.Types.ObjectId,
			ref: "Admin",
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

projectPost.plugin(mongooseAggregatePaginate);

export const Project = mongoose.model("Project", projectPost);
