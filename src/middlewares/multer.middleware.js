import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/temp");
	},
	filename: function (req, file, cb) {
		const prefix = Date.now();
		cb(null, `${prefix}_${file.originalname}`);
		// cb(null, `${file.originalname}`);
	},
});

export const saveToLocal = multer({ storage });
