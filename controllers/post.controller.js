const postModel = require("../models/post.model.js");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.path;
    const post = await postModel.create({
      title,
      content,
      image,
      author: req.user.name,
    });
    res.status(201).json({ message: "created post ", post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postUpdate = await postModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json({ message: "updated post", postUpdate });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const delPost = await postModel.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "post deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
