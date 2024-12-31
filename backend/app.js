import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import reviewRouter from "./router/reviewRouter.js";
import chatbotRouter from "./router/chatbotRouter.js"; // Import the chatbot router
import userRouter from "./router/userRouter.js";
import packageRouter from "./router/packageRouter.js";
import { schema } from './graphql/schema.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

import cors from "cors";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Enable CORS for the frontend URL
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.FRONTEND_URL, // Deployed frontend URL
        "http://localhost:5173", // Local frontend URL
      ];

      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use('/images', cors(), express.static(path.join(__dirname, 'public/images')));
// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Define routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/reviews", reviewRouter); // Use the review router for reviews
app.use("/api/v1/chatbot", chatbotRouter);  // Ensure the chatbot route is added
app.use("/api/v1/users", userRouter);
app.use("/api/v1/packages", packageRouter);
// Set up the GraphQL route
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Optional: Allows you to interact with GraphQL in the browser
})
);
// Connect to the database
dbConnection();

export default app;
