const express = require('express');
const router = require('./users/userRouter.js');
const app = express();


app.use(express.json())

app.use("/user/posts", router)

app.get("/", (req, res) => {
    res.send(`HELLO`);
});




module.exports = app;