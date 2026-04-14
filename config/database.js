const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    console.log("Attempting connection to MongoDB...");
    console.log("URL:", mongoUrl.substring(0, 40) + "..."); // Log first part for debugging
    
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      authSource: "admin",
      family: 4 // Use IPv4
    });
    console.log("✓ Connect Success!");
    return true;
  } catch (error) {
    console.log("✗ Connect Error!");
    console.error("Full error:", error.message);
    throw error;
  }
}

// Xử lý disconnect
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error:", error.message);
});