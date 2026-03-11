import Inquiry from "../models/Inquiry.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createInquiry = asyncHandler(async (req, res) => {
  const { name, phone, subject, message } = req.body;
  
  // Save inquiry to database first
  await Inquiry.create(req.body);
  
  // Send response immediately before trying to send email
  res.status(201).json({
    success: true,
    message: "Message sent! We will get back to you soon.",
  });
  
  // Send email in background with improved error handling
  try {
    console.log("Attempting to send inquiry email...");
    const emailResult = await sendEmail({
      email: process.env.EMAIL_USER,
      subject: `New Website Inquiry: ${subject}`,
      name,
      phone,
      message
    });
    console.log("Email sent successfully:", emailResult.messageId);
  } catch (emailError) {
    console.error("Email sending failed:", emailError.message);
    // Don't fail the request - inquiry is already saved to database
  }
});

//Admin
export const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort("-createdAt");
  res.status(200).json({
    success: true,
    data: inquiries,
  });
});

export const deleteInquiry = asyncHandler(async (req, res, next) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) {
    return next(new ErrorResponse("Inquiry not found", 404));
  }
  await inquiry.deleteOne();
  res.status(200).json({
    success: true,
    message: "Inquiry deleted successfully",
  });
});