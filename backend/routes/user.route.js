import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  changePassword,
} from "../controller/user.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/update", authMiddleware, upload.single("avatar"), updateUser);
router.post("/changePassword", authMiddleware, changePassword);
export default router;
