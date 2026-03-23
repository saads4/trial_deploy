// Import Express and middleware
import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";

// Initialize router
const router = express.Router();

// Public routes
router.get("/", getProducts);

// Admin protected routes
router.post("/", upload.single('image'), createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", deleteProduct);

export default router;