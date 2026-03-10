import mongoose from 'mongoose';
import { multiLangString } from '../utils/SchemaHelper.js';

const companyContentSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    unique: true,
  },
  title: multiLangString,

  subtitle: multiLangString,

  content: multiLangString,

  images: {
    type: [String],
    default: []
  },
  faqItems: {
    type: [{
      question: multiLangString,
      answer: multiLangString
    }],
    default: []
  },
  values: {
    type: [{
      title: multiLangString,
      description: multiLangString
    }],
    default: []
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const CompanyContent = mongoose.model('CompanyContent', companyContentSchema);
export default CompanyContent;