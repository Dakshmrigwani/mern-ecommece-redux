import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsBySearch,
} from "../controllers/productController.js";
import { verifyAdmin, verifyToken } from "../middlewares/verifyToken.js";

// initilize router: express
const router = express.Router();

// routes
router.get("/search", getProductsBySearch);
router.get("/", getProducts);
router.get("/:id", getProductById);

// auth middleware
router.post("/add_product", verifyAdmin, addProduct);
router.delete("/delete_product/:id", verifyAdmin, deleteProduct);

export default router;
