var shell = require("shelljs");
var request = require("supertest");
var app = require("../../../app");
const User = require("../../../models").User

describe("POST /api/v1/sessions path", () => {

  beforeAll(() => {
    shell.exec("npx sequelize db:drop")
    shell.exec("npx sequelize db:create")
  });

  beforeEach(() => {
    shell.exec("npx sequelize db:migrate")
  });

  it("doesn't create a new user if user already exists", async () => {
    await User.create({email: 'user1@example.com', passwordHash: 'password', apiKey: 'random', apiKeyActive: true});
    const response = await request(app)
    .post("/api/v1/users")
    .send({
      email: "test@example.com",
      password: "password",
      passwordConfirmation: "password"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("apiKey");
  });
});
