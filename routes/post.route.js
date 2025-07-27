const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware.js");
const multer = require("multer");
const {
  getAllPosts,
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/post.controller");
const { cloudinaryUpload } = require("../utils/cloudinary");

const upload = multer({ dest: "uploads/" });

router.post("/", getAllPosts);
router.post("/:id", getPosts);
router.post("/", protect, upload.single("image"), cloudinaryUpload, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
