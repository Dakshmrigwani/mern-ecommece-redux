import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// initilize router: express
const router = express.Router();

router.post("/payment/process", verifyToken, processPayment);
router.get("/stripeapikey", verifyToken, sendStripeApiKey);

export default router;
