var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const User = require('../models').User

/* POST to login a user */
router.post('/', function(req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    console.log(user);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({apiKey: user.apiKey}));
  })
  .catch(error => {
    console.log(error);
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});

module.exports = router;
