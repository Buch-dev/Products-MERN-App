import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse JSON bodies

app.use("/api/products", productRoutes);

app.listen(PORT, async () => {
  try {
    connectDB();
    console.log("Connected to DB successfully");
    console.log(`Server started at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
});
