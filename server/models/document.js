import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  filename: String,
  text: String,
  embedding: Array,
  uploadedAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);
export default Document;
