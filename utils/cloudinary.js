const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.cloudinaryUpload = async (req, res, next) => {
  try {
    if (req.file) {
      const localPath = req.file.path; // Save local path before overwriting it

      const result = await cloudinary.uploader.upload(localPath);
      req.body.image = result.secure_url; //  attach image URL to request body

      fs.unlinkSync(localPath); //  Delete local file safely
    }
    next();
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};
