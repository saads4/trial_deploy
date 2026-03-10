import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9+\-\s]+$/, "Invalid phone number"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;