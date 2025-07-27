const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "no token provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = protect;
