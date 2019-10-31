const express = require('express');
const express = require('helmet');
const userRouter = require('./users/userRouter.js');
const app = express();


app.use(express.json())

app.use("/api/users", userRouter)

app.get("/", (req, res) => {
    res.send(`HELLO`);
});




module.exports = app;