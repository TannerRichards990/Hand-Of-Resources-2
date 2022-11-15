const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.only('#GET /cars should return all cars', async () => {
    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      brand: expect.any(String),
      model: expect.any(String),
    });
  });
}); 
