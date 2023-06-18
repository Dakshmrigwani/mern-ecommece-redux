import express from "express";
import {
  newOrder,
  allOrder,
  deleteOrder,
  singleOrder,
  userOrders,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// initilize orderRouter: express
const router = express.Router();

// routes
router.get("/", allOrder);
router.get("/my_orders", verifyToken, userOrders);
router.get("/:orderId", singleOrder);
router.post("/new_order", verifyToken, newOrder);
router.delete("/delete_order/:orderId", deleteOrder);

export default router;
