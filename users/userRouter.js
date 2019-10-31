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

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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

};

function validatePost(req, res, next) {

};

module.exports = router;
