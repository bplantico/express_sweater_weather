var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const User = require('../models').User

/* POST to login a user */
router.post('/', async (req, res) => {
  if (req.body.email && req.body.password) {
    await User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then( user => {
      if (user && _passwordsMatch(req.body.password, user.passwordHash)) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({apiKey: user.apiKey}));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({error: "Check email address and password combination"}));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Please provide an email and password."}));
  }
});

const _passwordsMatch = function bcryptPasswords(sentPassword, savedPassword) {
  if (bcrypt.compareSync(sentPassword, savedPassword)) {
    return true
  } else {
    return false
  }
}

module.exports = router;
