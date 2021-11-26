// Mock the redis library with the redis-mock library
jest.mock('redis', () => jest.requireActual('redis-mock'));

// Make sure our mocking module is exporting the actual module
module.exports = jest.requireActual('../subscriber');
