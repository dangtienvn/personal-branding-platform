const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary - read credentials from environment
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to handle Cloudinary uploads for product thumbnails with fallback to local storage
module.exports.upload = async (req, res, next) => {
    // If no file was uploaded, continue
    if (!req.file || !req.file.buffer) {
      console.log("[uploadCloud] No file provided, skipping upload");
      return next();
    }

    // If Cloudinary credentials are missing, use local file fallback
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.log("[uploadCloud] Cloudinary credentials missing, using local storage");
      req.body.thumbnail = `/uploads/${req.file.originalname}`;
      return next();
    }

    console.log("[uploadCloud] Uploading to Cloudinary...");

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            console.log("[uploadCloud] Upload success:", result.secure_url);
            resolve(result);
          }
          else {
            console.error("[uploadCloud] Upload error:", error);
            reject(error);
          }
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    try {
      const result = await streamUpload(req.file.buffer);
      req.body.thumbnail = result.secure_url || result.url || "";
      console.log("[uploadCloud] Thumbnail set to:", req.body.thumbnail);
      return next();
    } catch (err) {
      console.warn("[uploadCloud] Cloudinary upload failed, falling back to local storage:", err.message);
      // Fallback to local storage
      req.body.thumbnail = `/uploads/${req.file.originalname}`;
      console.log("[uploadCloud] Using local thumbnail:", req.body.thumbnail);
      return next();
    }
  };