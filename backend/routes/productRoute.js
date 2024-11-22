import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js"; // Import multer configuration

const router = express.Router();

// Route to create a new product with image upload
router.route("/").post(upload.single("image"), createProduct);

// Route to fetch all products
router.route("/").get(getAllProducts);

// Route to fetch, update or delete a single product by ID
router
  .route("/:productId")
  .get(getProductById)
  .put(upload.single("image"), updateProduct) // Handle image upload during update
  .delete(deleteProduct);

export default router;
