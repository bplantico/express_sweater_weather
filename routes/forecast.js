var express = require('express');
var router  = express.Router();
const User  = require('../models').User
const fetch = require('node-fetch');
var forecastSerializer = require('../serializers/forecastSerializer')
require('dotenv').config()

router.get('/', (req, res) => {
  if (req.body.apiKey && req.query.location) {
    User.findOne({
      where: {
        apiKey: req.body.apiKey
      }
    })
    .then( user => {
      if (user && user.apiKeyActive) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_GEOCODE_API_KEY}&address=${req.query.location}`)
        .then(res => res.text())
        .then(body => JSON.parse(body)["results"][0]["geometry"]["location"])
        .then(coords => {
          lat = coords["lat"]
          lng = coords["lng"]
          fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET_KEY}/${lat},${lng}?exclude=[minutely]`)
            .then(res => res.text())
            .then(body => {
              res.setHeader("Content-Type", "application/json");
              res.status(200).send(JSON.stringify({data: new forecastSerializer(req.query.location, body) }));
          })
        })
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({error: "Please provide a valid API key."}));
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
