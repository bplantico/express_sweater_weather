var shell = require("shelljs");
var request = require("supertest");
var app = require("./../../../app");

describe("POST /api/v1/users path", () => {
  test("it creates a new user and returns their api_key", async () => {
    const response = await request(app)
    .post("/api/v1/users")
    .send({
      email: "my_email@example.com",
      password: "password",
      password_confirmation: "password"
    });

    // confirm we create a user
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("api_key");
  });
});
