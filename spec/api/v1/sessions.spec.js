var shell = require("shelljs");
var request = require("supertest");
var app = require("../../../app");
const User = require("../../../models").User
const bcrypt = require('bcrypt');

describe("POST /api/v1/sessions path", () => {

  beforeAll(() => {
    shell.exec("npx sequelize db:drop")
    shell.exec("npx sequelize db:create")
  });

  beforeEach(() => {
    shell.exec("npx sequelize db:migrate")
  });

  it("sends User their API key if correct password provided", async () => {
    await User.create({
      email: "user1@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random1",
      apiKeyActive: true
    });

    const response = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "user1@example.com",
      password: "password"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("apiKey");
  });

  it("doesn't send User their API key if wrong password provided", async () => {
    await User.create({
      email: "user2@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random2",
      apiKeyActive: true
    });

    const response = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "user2@example.com",
      password: "wrongPassword"
    });

    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(401);
  });

  it("doesn't send User their API key if no password provided", async () => {
    await User.create({
      email: "user5@example.com",
      passwordHash: bcrypt.hashSync("password", 14),
      apiKey: "random5",
      apiKeyActive: true
    });

    const response = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "user5@example.com",
      password: ""
    });

    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(401);
  });

  it("doesn't send an API key if User hasn't registered", async () => {
    const response = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "user3@example.com",
      password: "password"
    });

    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(401);
  });
});
