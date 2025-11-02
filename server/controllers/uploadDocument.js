import { extractText } from "../utils/pdfParser.js";
import Document from "../models/document.js";
import { generateEmbedding } from "../utils/embedding.js";

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const text = await extractText(filePath);
    const embedding = await generateEmbedding(text);

    const doc = await Document.create({
      filename: req.file.originalname,
      text,
      embedding
    });

    res.json({ message: "Document uploaded", document: doc });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export default uploadDocument;
