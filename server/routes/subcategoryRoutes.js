import express from "express";
import {
  getSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
} from "../controllers/subcategoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getSubcategories);
router.get("/:id", getSubcategory);

// Admin protected routes
router.post("/", protect, createSubcategory);
router.put("/:id", protect, updateSubcategory);
router.delete("/:id", protect, deleteSubcategory);

export default router;
