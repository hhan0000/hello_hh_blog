import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("[DEBUG] MONGO_URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5秒连接超时
    });

    console.log("✅ Connected to MongoDB");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};
