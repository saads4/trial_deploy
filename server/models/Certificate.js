import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Certificate image is required']
  },
  issuedBy: {
    type: String,
    trim: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
