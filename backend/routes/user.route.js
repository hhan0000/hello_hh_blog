import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.post("/update", verifyToken, updateUser);
export default router;
