import express from "express";
import authRoutes from "./routes/auth.routes.js";
//Usamos morgan como logger para ver por consola todas las peticiones que se hacen al backend
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
//routes
app.use("/api", authRoutes);
export default app;
