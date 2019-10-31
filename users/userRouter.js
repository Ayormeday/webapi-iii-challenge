const express = require('express');
const db = require("./userDb.js");

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    db.find(req.query)
    .then (userDb => {
        res.status(200).json(userDb);
    })
    .catch(error => {
        res.status(500).json({
            message: `Error retrieving the user db`
        })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId, (req, res, next) => {
    Users.getUserPosts(req.user.id).then(posts => {
      res.status(200).json(posts);
    }).catch(next);
  });

  router.delete('/:id', validateUserId, (req, res, next) => {
    Users.delete(req.user.id).then(deleted => {
      res.status(200).json(req.user);
    }).catch(next);
  });

  router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    const { name } = req.body;
    Users.update(req.user.id, { name }).then(updated => {
      res.status(200).json({ ...req.user, name });
    }).catch(next);
  });

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
   db.findById(id)
   .then(userid => {
       if(!userid){
           res.status(400).json({
               message: `invalid user id + ${error.message}`
           })
       } else {
           req.user = user;
           next();
       }
   })
   .catch(error => {
       res.status(500).json({
           message: `user id could not be checked + ${error.message}`
       })
   })
};

function validateUser(req, res, next) {
    if (Object.keys(req.body).length) {
        const { name } = req.body;
        if (name) {
          next();
        } else {
          res.status(400).json({ message: "missing required name field" });
        }
      } else {
        res.status(400).json({ message: "missing user data" });
      }
};

function validatePost(req, res, next) {
    if (Object.keys(req.body).length) {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ message: "missing required text field" });
        } else {
          next();
        }
      } else {
        res.status(400).json({ message: "missing post data" });
      }
};

module.exports = router;
