var shell    = require("shelljs");
var request  = require("supertest");
var app      = require("../../../app");
const User   = require('../../../models').User
const bcrypt = require('bcrypt');
require('dotenv').config()

describe("GET /api/v1/forecast path", () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
  });

  it("sends a forecast for a given location if API key valid", async () => {
    const user = await User.create({
      email: "user@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random",
      apiKeyActive: true
    });

    const response = await request(app)
    .get("/api/v1/forecast?location=denver,co")
    .send({
      apiKey: user.apiKey
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("apiKey");
  });
});

// .then(lat => coords["lat"])
// .then(lng => coords["lng"])
// .then(fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET_KEY}/${lat},${lng}`))
// .then(darkSkyRes => darkSkyRes.text())
// .then( forecast => JSON.parse(body))
