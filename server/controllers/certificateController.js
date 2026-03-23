import Certificate from "../models/Certificate.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import { uploadToImageKit } from "../config/imagekit.js";

export const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  
  res.status(200).json({
    success: true,
    data: certificates,
  });
});

export const createCertificate = asyncHandler(async (req, res) => {
  console.log('Creating certificate...');
  console.log('File received:', req.file ? 'YES' : 'NO');
  console.log('Body:', req.body);
  
  let imageUrl = '';
  if (req.file) {
    console.log('Uploading to ImageKit...');
    const folder = 'biosynvanta/certificates';
    const uploadResult = await uploadToImageKit(req.file, folder);
    imageUrl = uploadResult.url;
    console.log('Image uploaded:', imageUrl);
  } else {
    return res.status(400).json({
      success: false,
      error: 'Certificate image is required'
    });
  }

  const certificateData = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: imageUrl,
    issuedBy: req.body.issuedBy,
    issueDate: req.body.issueDate || new Date(),
    expiryDate: req.body.expiryDate,
    order: req.body.order || 0
  };

  const certificate = await Certificate.create(certificateData);
  res.status(201).json({ success: true, data: certificate });
});

export const updateCertificate = asyncHandler(async (req, res, next) => {
  let certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    return next(new ErrorResponse("Certificate not found", 404));
  }

  let updateData = { ...req.body };

  // Handle image update if new file is uploaded
  if (req.file) {
    const folder = 'biosynvanta/certificates';
    const uploadResult = await uploadToImageKit(req.file, folder);
    updateData.imageUrl = uploadResult.url;
  }

  certificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, { 
    new: true, 
    runValidators: true 
  });
  
  res.status(200).json({ success: true, data: certificate });
});

export const deleteCertificate = asyncHandler(async (req, res, next) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    return next(new ErrorResponse("Certificate not found", 404));
  }
  
  // Soft delete by setting isActive to false
  certificate.isActive = false;
  await certificate.save();
  
  res.status(200).json({ 
    success: true, 
    message: "Certificate deleted successfully" 
  });
});

export const getAllCertificates = asyncHandler(async (req, res) => {
  // For admin panel - includes inactive certificates
  const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
  
  res.status(200).json({
    success: true,
    data: certificates,
  });
});
