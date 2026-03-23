import express from "express";
import { getCertificates, createCertificate, updateCertificate, deleteCertificate, getAllCertificates } from "../controllers/certificateController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";
import multer from "multer";

const router = express.Router();

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size too large. Maximum size is 5MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files uploaded.'
      });
    }
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
  next(err);
};

// Public routes
router.get("/", getCertificates);

// Admin routes (temporarily without auth for testing)
router.post("/", upload.single('image'), handleMulterError, createCertificate);
router.put("/:id", upload.single('image'), handleMulterError, updateCertificate);
router.delete("/:id", deleteCertificate);
router.get("/admin/all", getAllCertificates);

export default router;
