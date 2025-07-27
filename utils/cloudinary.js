const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.cloudinaryUpload = async (req, res, next) => {
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.file.path = result.secure_url;
    fs.unlinksSync(req.file.path);
  }
  next();
};
