import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./db/connection.js";

// get route paths
import userRoute from "./routes/authRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import wishRoute from "./routes/wishRoute.js";
import cartRoute from "./routes/cartRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";

// initilize app
const app = express();
dotenv.config();

// connect to database
connectDB();

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://hr408-mern-ecommece.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ extended: false }));

// testing route
app.get("/", (req, res) => {
  res.send("Api Working!");
});

// testing route
app.get("/user", (req, res) => {
  res.json({ message: "User Working!", user: [] });
});

// all route
app.use("/api/auth/admin", authRoute);
app.use("/api/auth", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/wishlists", wishRoute);
app.use("/api/carts", cartRoute);
app.use("/api", paymentRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
