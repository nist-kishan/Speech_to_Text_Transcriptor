import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "speechToTextApp",
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("⚠️ Error closing MongoDB connection:", error.message);
  }
};
