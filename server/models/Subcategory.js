import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subcategory must have a name'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Subcategory must have a slug'],
    unique: true,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Subcategory must belong to a category'],
    ref: 'Category'
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;
