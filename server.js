const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user.route.js");
const postRoute = require("./routes/post.route.js");
const connectDB = require("./DB/db.connect.js");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user/", userRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("it's working");
});

const PORT = process.env.PORT || 7000;
app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running at port ${PORT}`);
});
