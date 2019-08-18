var express = require('express');
var router  = express.Router();
const User  = require('../models').User
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', async (req, res) => {
  if  (req.body.apiKey && req.query.location) {
    await User.findOne({
      where: {
        apiKey: req.body.apiKey
      }
    })
    .then( user => {
      if (user && user.apiKeyActive) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_GEOCODE_API_KEY}&address=${req.query.location}`)
        .then(res => res.text())
        .then(body => console.log(JSON.parse(body)["results"][0]["geometry"]["location"]));
      }
    })
    .catch ( erorr => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Please provide a valid API key in the request body and a location in the request parameters."}));
  }
})

module.exports = router;
