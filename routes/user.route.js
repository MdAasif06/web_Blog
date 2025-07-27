const express = require("express");
const { register, login } = require("../controllers/user.controller.js");
// const protect = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
