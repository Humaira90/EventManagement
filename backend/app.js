import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import reviewRouter from "./router/reviewRouter.js";
import chatbotRouter from "./router/chatbotRouter.js"; // Import the chatbot router
import userRouter from "./router/userRouter.js";
import packageRouter from "./router/packageRouter.js";
import cors from "cors";

const app = express();

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Enable CORS for the frontend URL
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/reviews", reviewRouter); // Use the review router for reviews
app.use("/api/v1/chatbot", chatbotRouter);  // Ensure the chatbot route is added
app.use("/api/v1/users", userRouter);
app.use("/api/v1/packages", packageRouter);
// Connect to the database
dbConnection();

export default app;
