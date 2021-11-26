const request = require('supertest');
const app = require('../../../../../index');

// A mock implementation of this module is in __mocks__
jest.mock('../../../../../utility/os-bind-utility');
jest.mock('../../../../../subscriber');

describe('Test web endpoints in subscriber module', () => {
  /* Setup the supertest agent for the application */
  let agent;
  beforeEach(() => {
    agent = request(app);
  });
  test('should expect a 200 response with message', async () => {
    const response = await agent
      .get('/subscriber/ping')
      .set('Accept', 'application/json');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('pong');
  });
});
