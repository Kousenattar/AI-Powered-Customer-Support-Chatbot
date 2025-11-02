import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  const result = await model.embedContent({
    content: {
      parts: [
        { text }
      ]
    }
  });

  return result.embedding.values; 
}

export async function embedQuery(query) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  const result = await model.embedContent({
    content: {
      parts: [
        { text: query }
      ]
    }
  });

  return result.embedding.values; 
}
