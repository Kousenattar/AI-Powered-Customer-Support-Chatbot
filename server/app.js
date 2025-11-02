import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminlogin from './routes/admin_login.js'
import upload from './routes/uploadDocumetRoutes.js'
import chat from './routes/chatRoute.js'

dotenv.config();

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use('/',adminlogin)
app.use('/',upload)
app.use('/',chat)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
