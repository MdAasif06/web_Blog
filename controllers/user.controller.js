const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: "user alredy exits" });
    }
    const hashPassword =await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(200).json({ message: "user created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const match = user && (await bcrypt.compare(password, user.password));
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ token, user: { name: user.name, email: user.email },message:"you are successfully login" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
