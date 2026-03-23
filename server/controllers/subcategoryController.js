import Subcategory from "../models/Subcategory.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// Get all subcategories, optionally filtered by category
export const getSubcategories = async (req, res) => {
  const { category } = req.query;
  
  let query = {};
  if (category) {
    query.category = category;
  }
  
  const subcategories = await Subcategory.find(query).sort({ name: 1 });
  res.json(subcategories);
};

// Get single subcategory by ID
export const getSubcategory = async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id);
  
  if (!subcategory) {
    return next(new ErrorResponse(`Subcategory not found with id of ${req.params.id}`, 404));
  }
  
  res.json(subcategory);
};

// Create new subcategory
export const createSubcategory = asyncHandler(async (req, res, next) => {
  const { name, slug, category, description } = req.body;
  
  // Check if subcategory with same slug already exists
  const existingSubcategory = await Subcategory.findOne({ slug });
  if (existingSubcategory) {
    return next(new ErrorResponse('Subcategory with this slug already exists', 400));
  }
  
  const subcategory = await Subcategory.create({
    name,
    slug,
    category,
    description
  });
  
  res.status(201).json({ success: true, data: subcategory });
});

// Update subcategory
export const updateSubcategory = asyncHandler(async (req, res, next) => {
  let subcategory = await Subcategory.findById(req.params.id);
  
  if (!subcategory) {
    return next(new ErrorResponse(`Subcategory not found with id of ${req.params.id}`, 404));
  }
  
  // Check if slug is being changed and if it already exists
  if (req.body.slug && req.body.slug !== subcategory.slug) {
    const existingSubcategory = await Subcategory.findOne({ slug: req.body.slug });
    if (existingSubcategory) {
      return next(new ErrorResponse('Subcategory with this slug already exists', 400));
    }
  }
  
  subcategory = await Subcategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json({ success: true, data: subcategory });
});

// Delete subcategory
export const deleteSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id);
  
  if (!subcategory) {
    return next(new ErrorResponse(`Subcategory not found with id of ${req.params.id}`, 404));
  }
  
  await subcategory.deleteOne();
  
  res.json({ success: true, message: "Subcategory deleted successfully" });
});
