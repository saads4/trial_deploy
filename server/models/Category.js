import mongoose from "mongoose";
import { multiLangString } from "../utils/SchemaHelper.js";

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
  description: multiLangString
}, {
  timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
export default Category;