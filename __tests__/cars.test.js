const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /cars should return all cars', async () => {
    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      brand: expect.any(String),
      model: expect.any(String),
    });
  });

  it('#GET /cars/:id should return a single car', async () => {
    const response = await request(app).get('/cars/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      brand: 'Ford',
      model: 'Mustang',
    });
  });

  it('#POST /cars should create a new car', async () => {
    const newCar = {
      brand: 'Subaru',
      model: 'Outback',
    };
    const response = await request(app).post('/cars').send(newCar);
    expect(response.status).toBe(200);
    expect(response.body.brand).toEqual(newCar.brand);
    expect(response.body.model).toEqual(newCar.model);
  });

  it.only('#PUT /cars/:id should update a car', async () => {
    const update = {
      brand: 'Subaru',
      model: 'Outback',
    };
    const response = await request(app).put('/cars/1').send(update);
    expect(response.status).toBe(200);
    expect(response.body.brand).toEqual(update.brand);
  });










}); 
