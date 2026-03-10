import express from "express";
import {getProducts, createProduct,updateProduct,deleteProduct} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";
const router = express.Router();
//Public
router.get("/", getProducts);
//Admin
router.post("/", upload.single('image'), createProduct);
router.put("/:id", protect,updateProduct)
router.delete("/:id", deleteProduct)
export default router;