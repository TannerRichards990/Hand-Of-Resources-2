const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });



  it('#GET /food should return all food', async () => {
    const response = await request (app).get('/food');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      healthy: expect.any(Boolean)
    });
  });

  it('#GET /food/:id should return a single food', async () => {
    const response = await request(app).get('/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'Pizza',
      healthy: false
    });
    


  });
  afterAll(() => {
    pool.end();
  });

});




