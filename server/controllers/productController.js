import Product from "../models/Product.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import { uploadToImageKit } from "../config/imagekit.js";
import { translateContent } from "../utils/translator.js"; 
import { localizeField } from "../utils/localize.js";

export const getProducts = async (req, res) => {
  const category = req.query.category;
  let products;
  if (category) products = await Product.find({ category });
  else products = await Product.find();

  const localizedProducts = products.map((product) => ({
    _id: product._id,
    name: localizeField(product.name, req.lang),
    description: localizeField(product.description, req.lang),
    category: product.category,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt
  }));

  res.json(localizedProducts);
};

export const createProduct = asyncHandler(async (req, res) => {

  let imageUrl = '';
  if (req.file) {
    const folder = 'biosynvanta/products';
    const uploadResult = await uploadToImageKit(req.file, folder);
    imageUrl = uploadResult.url;
  }

  const translatedName = await translateContent(req.body.name);
  const translatedDescription = await translateContent(req.body.description);

  const productData = {
    name: translatedName,
    description: translatedDescription,
    category: req.body.category,
    imageUrl: imageUrl
  };

  const product = await Product.create(productData);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorResponse("Product not found", 404));

  let updateData = { ...req.body };

  // Re-translate if admin updates text
  if (req.body.name) updateData.name = await translateContent(req.body.name);
  if (req.body.description) updateData.description = await translateContent(req.body.description);

  product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: product });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorResponse("Product not found", 404));
  await product.deleteOne();
  res.status(200).json({ success: true, message: "Product deleted successfully" });
});