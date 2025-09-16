import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnect = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "⚠️ MongoDB connection string is not defined in environment variables."
      );
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Reconnecting...");
      databaseConnect();
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error); // ✅ fixed
    process.exit(1);
  }
};

export default databaseConnect;
