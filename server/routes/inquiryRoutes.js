import express from "express";
import {createInquiry,getAllInquiries,deleteInquiry} from "../controllers/inquiryController.js";
const router = express.Router()
//Public
router.post("/", createInquiry)
//Admin
router.get("/", getAllInquiries)
router.delete("/:id", deleteInquiry)
export default router;