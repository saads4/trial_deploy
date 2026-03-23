// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import core dependencies
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import companyContentRoutes from "./routes/companyContentRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";

// Import middleware
import errorHandler from "./middlewares/globalErrorHandler.js";
import { detectLanguage } from "./middlewares/LangMiddleware.js";

// Import scripts
import { populateSampleContent } from "./scripts/populateCompanyContent.js";

// Connect to database
connectDB();

// Initialize Express app
const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://trial-deploy-lilac.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-language"],
  credentials: true
}));

// 👇 VERY IMPORTANT (fixes preflight)
app.options("*", cors());
// Apply middleware
app.use(express.json());
app.use(detectLanguage);

// Root test route
app.get("/", (req, res) => {
  res.send("Biosynvanta API running");
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/company-content", companyContentRoutes);
app.use("/api/certificates", certificateRoutes);

// Sample content population route
app.get("/api/populate-sample-content", async (req, res) => {
  try {
    await populateSampleContent();
    res.json({ success: true, message: "Sample content populated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error populating content" });
  }
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});