import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/temp");
	},
	filename: function (req, file, cb) {
		const prefix = Math.random() * 100 + 1;
		// _${prefix}
		cb(null, `${prefix}_${file.originalname}`);
	},
});

export const saveToLocal = multer({ storage });
