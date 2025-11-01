import express from "express";
import uploadDoc from "../config/multer.js";
import uploadDocument from "../controllers/uploadDocument.js";

const router = express.Router();

router.post("/upload", uploadDoc.single("file"), uploadDocument);

export default router;
