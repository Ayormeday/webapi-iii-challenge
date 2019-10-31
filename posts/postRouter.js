const express = "express";
const posts = require("./postDb.js");

const router = express.Router();

router.get('/', (req, res, next) => {
  posts.get().then(posts => {
    res.status(200).json(posts)
  }).catch(next);
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res, next) => {
  posts.remove(req.post.id).then(deleted => {
    res.status(200).json(res.post);
  }).catch(next);
});

router.put('/:id', validatePostId, (req, res, next) => {
  const { text } = req.body;
  posts.update(req.post.id, { text }).then(updated => {
    res.status(200).json({ ...req.post, text });
  }).catch(next);
});

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
