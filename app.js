const express = require('express');
const express = require('helmet');
const userRouter = require('./users/userRouter.js');
const postRouter = require("./posts/postRouter.js");
const app = express();

app.use(helmet());
app.use(logger())
app.use(express.json())

app.use("/api/users", userRouter);
app.use("/api/posts" postRouter);

app.get("/", (req, res) => {
    res.send(`HELLO`);
});

//logger to return information about the request
function logger(req, res, next) {
    console.log(req.method, req.url, Date.now())
    next();
  };
  


module.exports = app;