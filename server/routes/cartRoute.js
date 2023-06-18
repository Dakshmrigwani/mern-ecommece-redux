import express from "express";
import {
  createCart,
  deleteCart,
  getUserCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// initilize orderRouter: express
const router = express.Router();

// routes
router.post("/create", verifyToken, createCart);
router.delete("/:id/:pid", verifyToken, deleteCart);
router.get("/", verifyToken, getUserCart);

export default router;
