import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getUserWishlist,
} from "../controllers/wishlistController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// initilize orderRouter: express
const router = express.Router();

// routes
router.post("/create", verifyToken, createWishlist);
router.delete("/:id", verifyToken, deleteWishlist);
router.get("/", verifyToken, getUserWishlist);

export default router;
