var shell = require("shelljs");
var request = require("supertest");
var app = require("../../../app");
const User = require('../../../models').User

describe("POST /api/v1/favorites path", () => {

  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
    });

  it("adds a location to user's favorites", async () => {
    const user = await request(app)
    .post("/api/v1/users")
    .send({
      email: "user_1@example.com",
      password: "password",
      passwordConfirmation: "password"
    });

    const response = await request(app)
    .post("/api/v1/favorites")
    .send({
      location: "Denver, CO",
      apiKey: user.apiKey
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});
