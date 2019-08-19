var shell    = require("shelljs");
var request  = require("supertest");
var app      = require("../../../app");
const User   = require('../../../models').User
const bcrypt = require('bcrypt');

describe("POST /api/v1/favorites path", () => {

  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
    });

  it("adds a location to user's favorites", async () => {
    const user = await User.create({
      email: "user_1@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random_1",
      apiKeyActive: true
    });

    const response = await request(app)
    .post("/api/v1/favorites")
    .send({
      location: "Istanbul",
      apiKey: "random_1"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });

  it("doesn't add a location to user's favorites if bad API key", async () => {
    const response = await request(app)
    .post("/api/v1/favorites")
    .send({
      location: "Istanbul",
      apiKey: "wrong"
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("doesn't add a location to user's favorites if location missing", async () => {
    const response = await request(app)
    .post("/api/v1/favorites")
    .send({
      location: null,
      apiKey: "random_1"
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("doesn't add a location to user's favorites if location not found", async () => {
    const response = await request(app)
    .post("/api/v1/favorites")
    .send({
      location: "XXXXXXXXX",
      apiKey: "random_1"
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});
