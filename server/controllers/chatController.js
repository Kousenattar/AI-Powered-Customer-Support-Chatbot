import Document from "../models/document.js";
import { embedQuery } from "../utils/embedding.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function similarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

const chat = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Question is required" });

    const queryEmb = await embedQuery(question);
    const docs = await Document.find();
    if (!docs || docs.length === 0) return res.status(404).json({ message: "No documents found" });

    let bestDoc = null;
    let bestScore = -1;
    for (const doc of docs) {
      if (!doc.embedding) continue;
      const score = similarity(queryEmb, doc.embedding);
      if (score > bestScore) {
        bestScore = score;
        bestDoc = doc;
      }
    }

    if (!bestDoc) return res.status(404).json({ message: "No matching document found" });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent(
      `Use ONLY the following document to answer:

${bestDoc.text}

Question: ${question}

Answer in a clear and well-structured paragraph. Do not use lists or bullet points. Make the answer easy to read and professional.`

    );

    res.json({ answer: result.response.text() });
  } catch (err) {
    console.error("Ask route error:", err);
    res.status(500).json({ message: "Query failed", error: err.message });
  }
}

export default chat;