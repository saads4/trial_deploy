import express from "express";
import { getCompanyContent,updateCompanyContent, getWhyCards} from "../controllers/companyContentController.js";
// import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router()

//Public
router.get("/", getCompanyContent); 
router.get("/why-cards", getWhyCards)
router.get("/:sectionName", getCompanyContent)

// Admin (temporarily remove auth for testing)
router.post("/", updateCompanyContent)
router.put("/:sectionName", updateCompanyContent)

export default router;