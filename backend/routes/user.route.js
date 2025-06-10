import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
export default router;
