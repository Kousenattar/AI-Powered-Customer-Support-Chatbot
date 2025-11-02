import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn(
      "MONGODB_URI not set — skipping MongoDB connection (uploads will not be saved to DB)."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    // don't exit the process here; return so the server can still run for local testing
  }
};

export default connectDB;
