import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";
import fetch from "node-fetch";

dotenv.config({ path: "./.env" });

// Code for run server anyTime
const getUsers = () => {
	//
	let url = "https://portfolio-backend-gwo5.onrender.com/api/v1/projects/getprojects";
	let options = { method: "GET" };

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log("All functions are working fine urlForPortfolio!"))
		.catch((err) => console.error("error:" + err));

	let urlForMaxlenceAssignment = "https://maxlence-assignment.onrender.com/api/user";
	let optionsForMaxlenceAssignment = { method: "GET" };

	fetch(urlForMaxlenceAssignment, optionsForMaxlenceAssignment)
		.then((res) => res.json())
		.then((json) => console.log("All functions are working fine ForMaxlenceAssignment!"))
		.catch((err) => console.error("error:" + err));

	return;
};

setInterval(() => {
	getUsers();

}, 550000);// call after every 8min. for server up & run anytime in render

const PORT = process.env.PORT || 8080;

(() => {
	connectDB()
		.then(() => {
			app.listen(PORT, () => {
				console.log(`Server is running at port : ${PORT}`);
			});
		})
		.catch((err) => {
			console.log("MongoDB connection failed !! ", err);
		});
})();
