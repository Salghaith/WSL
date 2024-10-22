import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";  
import userRoute from "./routes/user-route.js";
import authRoute from "./routes/auth-route.js";
import businessRoute from "./routes/business-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();


// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://wsl-app.netlify.app"], // Add your frontend URL
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/business", businessRoute);

app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
})

// Connect to MongoDB and then start the server
const startServer = async () => {
  await connectDB(); // Connect to DB before starting the server

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
