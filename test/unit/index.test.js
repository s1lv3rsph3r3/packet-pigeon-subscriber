const request = require('supertest');
const app = require('../../index');

const agent = request(app);

// A mock implementation of this module is in __mocks__
jest.mock('../../utility/os-bind-utility');
describe('index.js => catch all', () => {
  afterAll(() => {
    app.close();
  });
  test('should return 418 when endpoint does not exist', async () => {
    // Arrange
    // Act
    // Assert
    const response = await agent
      .get('/non-existent-endpoint')
      .set('Accept', 'application/json');
    expect(response.statusCode).toEqual(418);
    expect(response.body).toEqual('Tea only thanks.');
  });
});
