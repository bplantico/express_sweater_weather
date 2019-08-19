var express            = require('express');
var router             = express.Router();
const uuidv4           = require('uuid/v4');
const bcrypt           = require('bcrypt');
const User             = require('../models').User
const FavoriteLocation = require('../models').FavoriteLocation
const fetch            = require('node-fetch');
require('dotenv').config()

/* POST to add a new favorite location */
router.post('/', function(req, res, next) {
  let location = req.body.location;
  let apiKey = req.body
  if (req.body.location && req.body.apiKey) {
    User.findOne({
      where: {
        apiKey: req.body.apiKey
      }
    })
    .then( user => {
      if (user && user.apiKeyActive) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_GEOCODE_API_KEY}&address=${req.body.location}`)
        .then(res => res.text())
        .then(body => JSON.parse(body)["results"][0])
        .then(result => {
          if (result) {
            let formattedAddress = result["formatted_address"]
            let lat = result["geometry"]["location"]["lat"]
            let lng = result["geometry"]["location"]["lng"]
            FavoriteLocation.create({
              location: formattedAddress,
              lat: lat,
              lng: lng,
              active: true,
              UserId: user.id,
            })
            .then(fave => {
              if (fave) {
                res.setHeader("Content-Type", "application/json");
                res.status(201).send(JSON.stringify({data: `${fave.location} has been added to your favorites`}));
              } else {
                res.setHeader("Content-Type", "application/json");
                res.status(401).send(JSON.stringify({error: "Something went wrong."}));
              }
            })
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(401).send(JSON.stringify({error: "We can't find that location. Please try again."}));
          }
        })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(409).send(JSON.stringify({ error: error }));
      });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({error: "Please provide a valid API key."}));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(409).send(JSON.stringify({ error: error }));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Please provide a valid API key and location in the request body."}));
  }
});

module.exports = router;
