var shell = require("shelljs");
var request = require("supertest");
var app = require("../../../app");
const User = require('../../../models').User

xdescribe("POST /api/v1/users path", () => {

  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
    });

  it("creates a new user and returns their api_key", async () => {
    const response = await request(app)
    .post("/api/v1/users")
    .send({
      email: "brian1@example.com",
      password: "password",
      passwordConfirmation: "password"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("apiKey");
  });

  it("doesnt create a new user if passwords don't match", async () => {
    const response = await request(app)
    .post("/api/v1/users")
    .send({
      email: "brian1@example.com",
      password: "password",
      passwordConfirmation: "wrong"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please check that your passwords match.");
  });

  it("doesn't create a new user if user already exists", async () => {
    User.create({email: 'test@example.com', passwordHash: 'password', apiKey: 'random', apiKeyActive: true})

    const response = await request(app)
    .post("/api/v1/users")
    .send({
      email: "test@example.com",
      password: "password",
      passwordConfirmation: "password"
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
  });
});
