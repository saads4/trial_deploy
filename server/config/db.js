// Import MongoDB connection library
import mongoose, { connect } from "mongoose";

// Database connection function
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB with URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected Successfully");
    console.log("Connected to database:", mongoose.connection.name);
  } catch (err) {
    console.log("Database connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;