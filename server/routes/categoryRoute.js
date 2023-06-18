import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";

// initilize router: express
const router = express.Router();

router.get("/", getCategories);
router.post("/add_category", verifyAdmin, addCategory);
router.delete("/delete_cat/:id", verifyAdmin, deleteCategory);

export default router;
