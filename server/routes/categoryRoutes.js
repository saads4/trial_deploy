import express from "express";
import {getCategories,createCategory,updateCategory,deleteCategory} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";
const router = express.Router()

//Public
router.get("/", getCategories)

//Admin
router.post("/", upload.single('image'), createCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router;