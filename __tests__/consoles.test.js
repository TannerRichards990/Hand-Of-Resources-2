const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('#GET /consoles should return all consoles', async () => {
    const response = await request (app).get('/consoles');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      released: expect.any(String),
      
    });
  });

  it.skip('#GET /consoles/:id should return a single console', async () => {
    const response = await request(app).get('/consoles/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'Playstation 4',
      released: '2013',
    });
  });

  it('#POST /consoles should create a new console', async () => {
    const newConsole = {
      name: 'Xbox Series X',
      released: '2020',
    };
    const response = await request(app).post('/consoles').send(newConsole);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newConsole.name);
    expect(response.body.released).toEqual(newConsole.released);
  });
});


