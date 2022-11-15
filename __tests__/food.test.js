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

  it('#POST /food should create a new food', async () => {
    const newFood = {
      name: 'Lasagna',
      healthy: false
    };
    const response = await request(app).post('/food').send(newFood);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newFood.name);
    expect(response.body.healthy).toEqual(newFood.healthy);
  });

  it('#PUT /food/:id should update a food', async () => {
    const update = {
      name: 'Lasagna',
      healthy: false
    };
    const response = await request(app).put('/food/1').send(update);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(update.name);
  });

  it.only('#DELETE /food/:id should delete a food', async () => {
    const response = await request(app).delete('/food/1');
    expect(response.status).toBe(200);
    const deletedFood = await request(app).get('/food/1');
    expect(deletedFood.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });

});
