import express from "express";
import {
  adminLogin,
  changePassword,
  forgotPassword,
  getUserProfile,
  resetPassword,
  updateUserProfile,
  userLogin,
  userRegister,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", userRegister);
router.post("/userLogin", userLogin);
router.get("/me", verifyToken, getUserProfile);
router.put("/update", verifyToken, updateUserProfile);
router.put("/changePassword", verifyToken, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

export default router;
