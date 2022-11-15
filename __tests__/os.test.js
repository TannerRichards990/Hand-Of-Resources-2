const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('#GET /os should return all os', async () => {
    const response = await request(app).get('/os');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      easy: expect.any(Boolean),
    });
  });

  it.skip('#GET /os/:id should return a single os', async () => {
    const response = await request(app).get('/os/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'Windows',
      easy: true,
    });
  });
  
  it.skip('#POST /os should create a new os', async () => {
    const newOS = {
      name: 'android',
      easy: true,
    };
    const response = await request(app).post('/os').send(newOS);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newOS.name);
    expect(response.body.easy).toEqual(newOS.easy);
  });

  it.skip('#PUT /os/:id should update an os', async () => {
    const update = {
      name: 'android',
      easy: true,
    };
    const response = await request(app).put('/os/1').send(update);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(update.name);
  });

  it.skip('#DELETE /os/:id should delete an os', async () => {
    const response = await request(app).delete('/os/1');
    expect(response.status).toBe(200);
    const deletedOS = await request(app).get('/os/1');
    expect(deletedOS.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
  

// it('GET /os should return all os', async () => {
//     const res = await request(app).get('/os');
//     expect(res.status).toBe(200);
//     expect(res.body).toMatchInlineSnapshot(`
//       Array [
//         Object {
//           "easy": "yes",
//           "id": "1",
//           "name": "Windows",
//           },
//           Object {
//             "easy": "no",
//             "id": "2",
//             "name": "Mac",
//             },
//             Object {
//               "easy": "yes",
//               "id": "3",
//               "name": "Linux",
//               },
//             ]`
//     );
//   });
  
//   it('GET /os/1 should return a single os', async () => {
//     const res = await request(app).get('/os/1');
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual({
//       id: '1',
//       name: 'Windows',
//       easy: 'yes',
//     });
//   });
  
//   it('POST /os should create a new os', async () => {
//     const newOS = {
//       name: 'Android',
//       easy: 'no',
//     };
//     const res = await request(app).post('/os').send(newOS);
//     expect(res.status).toBe(200);
//     expect(res.body).toMatchInlineSnapshot(`
//       Object {
//         "easy": "no",
//         "id": "4",
//         "name": "Android",
//         }`
//     );
  
//     it('PUT /os/1 should update an os', async () => {
//       const res = await request(app).put('/os/1').send({
//         name: 'Windows',
//         easy: 'no',
//       });
//       expect(res.status).toBe(200);
//     });
  
//     it('DELETE /os/1 should delete an os', async () => {
//       const res = await request(app).delete('/os/1');
//       expect(res.status).toBe(200);
  
//       const { os } = await request(app).get('/os/1');
//       expect(os).toEqual(undefined);
//     });
  
//     afterAll(() => {
//       pool.end();
//     });
//   });
// });


