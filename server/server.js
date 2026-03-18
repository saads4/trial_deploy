import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import companyContentRoutes from "./routes/companyContentRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

// Middleware
import errorHandler from "./middlewares/globalErrorHandler.js";
import { detectLanguage } from "./middlewares/LangMiddleware.js";

// Script
import { populateSampleContent } from "./scripts/populateCompanyContent.js";

connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trial-deploy-rwrar7wti-saad-sayeds-projects-334da4fd.vercel.app",
      "https://trial-deploy-coral.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-language"],
    credentials: true
  })
);
app.use(express.json());
app.use(detectLanguage);

// Root test route
app.get("/", (req, res) => {
  res.send("Biosynvanta API running");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/inquiry", inquiryRoutes);  // api/inquiry
app.use("/api/company-content", companyContentRoutes);
app.use("/api/certificates", certificateRoutes);

// Populate sample content
app.get("/api/populate-sample-content", async (req, res) => {
  try {
    await populateSampleContent();
    res.json({ success: true, message: "Sample content populated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error populating content" });
  }
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5051;

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});