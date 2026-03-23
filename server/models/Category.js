import mongoose from "mongoose";
import { multiLangString } from "../utils/SchemaHelper.js";

const subcategoryEmbedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
}, { _id: false });

const categorySchema = new mongoose.Schema({
  name: multiLangString,
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  imageURL: {
    type: String,
    default: ''
  },
  description: multiLangString,
  subcategories: {
    type: [subcategoryEmbedSchema],
    default: []
  }
}, {
  timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
export default Category;