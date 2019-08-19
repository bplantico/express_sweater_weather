var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const User = require('../models').User

/* POST to add a new favorite location */
router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(res.body);
});

module.exports = router;

// if (req.body.password == req.body.passwordConfirmation) {
//   User.create({
//     email: req.body.email,
//     passwordHash: bcrypt.hashSync(req.body.password, 14),
//     apiKey: uuidv4(),
//     apiKeyActive: true
//   })
//   .then(user => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(201).send(JSON.stringify({apiKey: user.apiKey}));
//   })
//   .catch(error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(409).send(JSON.stringify({ error: error }));
//   });
// } else {
//   res.setHeader("Content-Type", "application/json");
//   res.status(400).send(JSON.stringify({ message: "Please check that your passwords match." }));
// };
