import mongoose from 'mongoose';
import { multiLangString } from '../utils/SchemaHelper.js';

const productSchema = new mongoose.Schema({
  name: {
    en: { type: String, default: "" },
    ar: { type: String, default: "" },
    fr: { type: String, default: "" },
    es: { type: String, default: "" },
    ru: { type: String, default: "" }
  },

  description: multiLangString,

  imageUrl: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: [true, 'Product must belong to a category'],
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;