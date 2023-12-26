import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null;

		//upload the file on cloudinary!
		const response = await cloudinary.uploader.upload(localFilePath, {
			folder: "portfolio-data",
			resource_type: "auto",
		});

		if (!response) {
			throw new ApiError(400, "something went wrong while uploading on cloudinary!");
		}

		// file has been uploaded successfully!
		// console.log("file is uploaded on cloudinary ", response.secure_url);

		// Delete the file after upload to cloud.
		fs.unlinkSync(localFilePath);

		return response;

		//
	} catch (error) {
		fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed

		// console.log(error);
		throw new ApiError(
			error?.http_code || 499,
			error?.message || "Request Timeout while uploading on cloudinary!"
		);
	}
};

export { uploadOnCloudinary };
