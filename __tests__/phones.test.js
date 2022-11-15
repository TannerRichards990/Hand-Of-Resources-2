const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('#GET /phones should return all phones', async () => {
    const response = await request(app).get('/phones');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      brand: expect.any(String),
      model: expect.any(String),
    });
  });

  it.skip('#GET /phones/:id should return a single phone', async () => {
    const response = await request(app).get('/phones/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      brand: 'Apple',
      model: 'iPhone 11',
    });
  }); 

  it.skip('#POST /phones should create a new phone', async () => {
    const newPhone = {
      brand: 'Nokia',
      model: '3310',
    };
    const response = await request(app).post('/phones').send(newPhone);
    expect(response.status).toBe(200);
    expect(response.body.brand).toEqual(newPhone.brand);
    expect(response.body.model).toEqual(newPhone.model);
  });

  it('#PUT /phones/:id should update a phone', async () => {
    const update = {
      brand: 'Nokia',
      model: '3310',
    };
    const response = await request(app).put('/phones/1').send(update);
    expect(response.status).toBe(200);
    expect(response.body.brand).toEqual(update.brand);
  });


});
  


    
