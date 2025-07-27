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
const { cloudinaryUpload } = require("../utils/cloudinary.js");

const upload = multer({ dest: "uploads/" });

router.get("/", getAllPosts);
router.get("/:id", getPosts);
router.post("/create", protect, upload.single("image"), cloudinaryUpload, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
