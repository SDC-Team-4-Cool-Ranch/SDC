const request = require('supertest');
const app = require('../server');
const db = require('../db/config.js')

describe('GET /api/reviews', () => {
  test("It responds with an object of reviews", async () => {
    const response = await request(app).get('/api/reviews?product_id=5');
    expect(response.body).toHaveProperty('product_id');
    expect(response.body).toHaveProperty('results');
    expect(response.body.count).toBe(2);
    expect(response.body.results.length).toBe(2);
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/reviews/meta', () => {
  test('It responds with an object of review meta data', async () => {
    const response = await request(app).get('/api/reviews/meta?product_id=5');
    expect(response.body).toHaveProperty('characteristics');
    expect(response.body.ratings).toEqual({ "3": "1", "4": "1" });
    expect(response.statusCode).toBe(200);
  })
})

// NOT SURE WHY IT WONT CLOSE THE CONNECTIONS
// afterAll(async () => {
  // app.close();
  // await db.end();
// });
