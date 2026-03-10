import dotenv from "dotenv"
import path from "path"
dotenv.config()
import mongoose from "mongoose"
import express from "express"
// Enable CORS
import cors from "cors"
app.use(cors());
// Connect to MongoDB
import connectDB from "./config/db.js"
// Import routes
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import companyContentRoutes from "./routes/companyContentRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import errorHandler from "./middlewares/globalErrorHandler.js";
import { detectLanguage } from "./middlewares/LangMiddleware.js"
connectDB();
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(detectLanguage)

//Route
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/inquiry", inquiryRoutes);
app.use("/api/company-content", companyContentRoutes);
app.use("/api/certificates", certificateRoutes);

// Populate sample content endpoint
import { populateSampleContent } from "./scripts/populateCompanyContent.js";
app.get("/api/populate-sample-content", async (req, res) => {
  try {
    await populateSampleContent();
    res.json({ success: true, message: "Sample content populated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error populating content" });
  }
});

app.use(errorHandler);
const PORT = process.env.PORT || 5051;
app.listen(PORT,()=>
{
    console.log(`Server Listening on port ${PORT}`)
})