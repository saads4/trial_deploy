import Category from "../models/Category.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import { uploadToImageKit } from "../config/imagekit.js";
import { translateContent } from "../utils/translator.js";
import { localizeField } from "../utils/localize.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();

  const localizedCategories = categories.map((cat) => ({
    _id: cat._id,
    name: localizeField(cat.name, req.lang),
    description: localizeField(cat.description, req.lang),
    slug: cat.slug,
    imageURL: cat.imageURL,
    subcategories: cat.subcategories || [],
  }));

  res.json(localizedCategories);
};

export const createCategory = asyncHandler(async (req, res) => {
  let imageUrl = '';
  if (req.file) {
    const folder = 'biosynvanta/categories';
    const uploadResult = await uploadToImageKit(req.file, folder);
    imageUrl = uploadResult.url;
  }

  const translatedName = await translateContent(req.body.name);
  const translatedDescription = await translateContent(req.body.description);

  // Parse subcategories sent as a JSON string in FormData
  let subcategories = [];
  if (req.body.subcategories) {
    try {
      const parsed = JSON.parse(req.body.subcategories);
      if (Array.isArray(parsed)) {
        subcategories = parsed.filter(s => s.name && s.slug);
      }
    } catch (_) {
      subcategories = [];
    }
  }

  const categoryData = {
    name: translatedName,
    slug: req.body.slug,
    description: translatedDescription,
    imageURL: imageUrl,
    subcategories,
  };

  const category = await Category.create(categoryData);
  res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }
  let updateData = { ...req.body };

  if (req.body.name) updateData.name = await translateContent(req.body.name);
  if (req.body.description) updateData.description = await translateContent(req.body.description);

  // Parse subcategories if sent as JSON string (e.g. from FormData)
  if (req.body.subcategories && typeof req.body.subcategories === 'string') {
    try {
      const parsed = JSON.parse(req.body.subcategories);
      updateData.subcategories = Array.isArray(parsed) ? parsed.filter(s => s.name && s.slug) : [];
    } catch (_) {
      delete updateData.subcategories;
    }
  }

  category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }
  await category.deleteOne();
  res.status(200).json({ success: true, message: "Category deleted successfully" });
});