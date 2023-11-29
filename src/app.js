import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//routes import
import adminRouter from "./routes/admin.routes.js";
import projectRouter from "./routes/project.routes.js";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration
const apiVersion = "v1";
app.use(`/api/${apiVersion}/admins`, adminRouter);
app.use(`/api/${apiVersion}/projects`, projectRouter);

export default app;
