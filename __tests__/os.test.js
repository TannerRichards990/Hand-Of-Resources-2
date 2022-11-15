const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /os should return all os', async () => {
    const response = await request(app).get('/os');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      easy: expect.any(Boolean),
    });
  });

  it('#GET /os/:id should return a single os', async () => {
    const response = await request(app).get('/os/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'Windows',
      easy: true,
    });
  });
  
  it('#POST /os should create a new os', async () => {
    const newOS = {
      name: 'android',
      easy: true,
    };
    const response = await request(app).post('/os').send(newOS);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newOS.name);
    expect(response.body.easy).toEqual(newOS.easy);
  });

  it('#PUT /os/:id should update an os', async () => {
    const update = {
      name: 'android',
      easy: true,
    };
    const response = await request(app).put('/os/1').send(update);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(update.name);
  });

  it('#DELETE /os/:id should delete an os', async () => {
    const response = await request(app).delete('/os/1');
    expect(response.status).toBe(200);
    const deletedOS = await request(app).get('/os/1');
    expect(deletedOS.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
  



