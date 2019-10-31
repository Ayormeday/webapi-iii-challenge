const express = "express";
const posts = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  posts
    .getById(id)
    .then(post => {
      if (!post) {
        res.status(400).json({ message: "invalid post id" });
      } else {
        req.post = post;
        next();
      }
    })
    .catch(next);
}

router.use((error, req, res, next) => {
  res.status(500).json({
    file: "postRouter",
    method: req.method,
    url: req.url,
    message: error.message
  });
});
module.exports = router;
