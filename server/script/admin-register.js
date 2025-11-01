import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Check if admin already exists
    console.log("Checking for existing admin...");
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists with email:", process.env.ADMIN_EMAIL);
      return;
    }

    console.log("Creating new admin...");
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const newAdmin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log("Admin Created Successfully ✅");
    console.log("Admin Details:", {
      email: newAdmin.email,
      id: newAdmin._id,
    });
  } catch (error) {
    console.error("Error Details:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    if (error.code === 11000) {
      console.error("Duplicate key error - Admin already exists");
    }
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

createAdmin();
