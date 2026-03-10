import mongoose from 'mongoose';
import { multiLangString } from '../utils/SchemaHelper.js';

const productSchema = new mongoose.Schema({
  name: multiLangString,

  description: multiLangString,

  imageUrl: {
    type: String,
    required: [true, 'Product image is required'],
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