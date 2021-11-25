const request = require('supertest');
const app = require('../../../../../index');

const agent = request(app);

// A mock implementation of this module is in __mocks__
jest.mock('../../../../../utility/os-bind-utility');

describe('Test api endpoints in subscriber module...', () => {
  afterAll(() => {
    app.close();
  });
  test('expect a fail when running', async () => {
    const response = await agent
      .get('/api/v1/subscriber/ping')
      .set('Accept', 'application/json');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('pong');
  });
});
