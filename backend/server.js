import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url"; // Import fileURLToPath for handling URL paths

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoute.js";

dotenv.config();

const app = express();

// Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs
app.use("/api/products", productRoutes);

// Serve images from the "uploads" folder
const __filename = fileURLToPath(import.meta.url); // Get the current file URL
const __dirname = path.dirname(__filename); // Get the directory name
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
