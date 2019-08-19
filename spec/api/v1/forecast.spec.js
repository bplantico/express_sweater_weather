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
    expect(Object.keys(response.body)).toEqual(["data"]);
    expect(Object.keys(response.body["data"])).toEqual(["location", "currently", "hourly", "daily", "alerts"]);
  });

  it("doesn't send a forecast if API key invalid", async () => {
    const user = await User.create({
      email: "user_2@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random_2",
      apiKeyActive: true
    });

    const response = await request(app)
    .get("/api/v1/forecast?location=denver,co")
    .send({
      apiKey: "wrong"
    });

    expect(response.status).toBe(401);
    expect(Object.keys(response.body)).toEqual(["error"]);
  });

  it("doesn't send a forecast if API key missing", async () => {
    const user = await User.create({
      email: "user_3@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random_3",
      apiKeyActive: true
    });

    const response = await request(app)
    .get("/api/v1/forecast?location=denver,co")
    .send({
      apiKey: null
    });

    expect(response.status).toBe(401);
    expect(Object.keys(response.body)).toEqual(["error"]);
  });

  it("doesn't send a forecast if location param missing", async () => {
    const user = await User.create({
      email: "user_4@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random_4",
      apiKeyActive: true
    });

    const response = await request(app)
    .get("/api/v1/forecast")
    .send({
      apiKey: user.apiKey
    });

    expect(response.status).toBe(401);
    expect(Object.keys(response.body)).toEqual(["error"]);
  });
});
