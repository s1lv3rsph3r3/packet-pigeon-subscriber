const request = require('supertest');
const app = require('../../index');

// A mock implementation of this module is in __mocks__
jest.mock('../../utility/os-bind-utility');
jest.mock('../../subscriber');

describe('index.js => catch all', () => {
  /* Setup the supertest agent for the application */
  let agent;
  beforeEach(() => {
    agent = request(app);
  });
  test('should return 418 when endpoint does not exist', async () => {
    // Arrange + Act
    const response = await agent
      .get('/non-existent-endpoint')
      .set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(418);
    expect(response.body).toEqual('Tea only thanks.');
  });
});
