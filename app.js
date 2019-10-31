const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const app = express();

app.use(helmet());
app.use(logger());
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send(`HELLO FROM THE OTHER SIDE`);
});

//logger to return information about the request
function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = app;
