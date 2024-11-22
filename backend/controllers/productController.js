import Product from "../models/Product.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { productName, price, description } = req.body;
    const image = req.file ? req.file.path : null; // Get the image path from multer

    const newProduct = new Product({
      productName,
      price,
      description,
      image, // Save the image path to the product model
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating a product", error });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = req.file.path; // Add the new image path if an image is uploaded
    }

    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    products.forEach((product) => {
      if (product.image) {
        product.image = product.image.replace(/\\+/g, "/");
      }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error fetching products", error });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error fetching product", error });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount == 0) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", error });
  }
});
