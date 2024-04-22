import express from "express";
import dotenv from "dotenv";
import cli from "cli-color";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRouter from "./routes/userRoute.js";
import alluserRouter from "./routes/allUser.js";
import messageRouter from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
//port number
const PORT = process.env.PORT || 8090;

// db connetion
connectDB();

//create application
// const app = express();

//middlewares
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

//use routes
app.use("/api/v1/", alluserRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

server.listen(PORT, () => {
  console.log(cli.yellowBright("Server is running on port " + PORT));
});
