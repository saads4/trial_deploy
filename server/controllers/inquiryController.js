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
  
  // Try to send email in the background without blocking the response
  try {
    const sendEmailWithTimeout = async () => {
      const transporterPromise = import('../utils/sendEmail.js').then(module => 
        module.sendEmail({
          email: process.env.EMAIL_USER,
          subject: `New Website Inquiry: ${subject}`,
          name,
          phone,
          message
        })
      );
      
      // Add 5 second timeout to email sending
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 5000)
      );
      
      await Promise.race([transporterPromise, timeoutPromise]);
    };
    
    // Fire and forget - don't await this
    sendEmailWithTimeout().catch(emailError => {
      console.error("Email sending failed:", emailError);
    });
  } catch (emailError) {
    console.error("Email setup failed:", emailError);
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