// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";

dotenv.config({
	path: "./env",
});

// Code for run server anyTime
const getUsers = async () => {
	await fetch("https://portfolio-backend-gwo5.onrender.com/api/v1/projects/getprojects");
	return;
};

setInterval(() => {
	getUsers();
}, 1500000);

const PORT = process.env.PORT || 8080;

(() => {
	connectDB()
		.then(() => {
			app.listen(PORT, () => {
				console.log(`Server is running at port : ${PORT}`);
			});
		})
		.catch((err) => {
			console.log("MONGO db connection failed !!! ", err);
		});
})();
