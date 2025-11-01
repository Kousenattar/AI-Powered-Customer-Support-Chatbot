import express from "express";
const router = express.Router();
import adminLogin from "../controllers/admin-controller.js";

router.post("/adminLogin", adminLogin);

export default router;
