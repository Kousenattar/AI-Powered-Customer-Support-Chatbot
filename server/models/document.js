import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  filename: String,
  text: String,
  embedding: [Number], // <--- store embedding here
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Document", documentSchema);
