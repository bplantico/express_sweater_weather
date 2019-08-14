var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');


describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  afterAll(() => {
    shell.exec('npx sequelize db:drop')
  });

  describe('Test the root path', () => {
    test('It should respond to the GET method', () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });
})
