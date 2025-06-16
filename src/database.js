const mongoose = require("mongoose");
require("dotenv").config(); 
const connectDB = async () => {
  try {
    console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

    const res = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
