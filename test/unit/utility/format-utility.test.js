const { formatFunctionName } = require('../../../utility/format-utility');

describe('formatFunctionName', () => {
  test('should return only function name on unbound function name', async () => {
    // Arrange
    const expected = 'testFunction';
    const stringInput = 'testFunction';

    // Act
    const actual = formatFunctionName(stringInput);

    // Assert
    expect(actual).toEqual(expected);
  });
  test('should return only function name on single bound function name', async () => {
    // Arrange
    const expected = 'testFunction';
    const stringInput = 'bound testFunction';

    // Act
    const actual = formatFunctionName(stringInput);

    // Assert
    expect(actual).toEqual(expected);
  });
  test('should return only function name on multi bound function name', async () => {
    // Arrange
    const expected = 'testFunction';
    const stringInput = 'bound bound testFunction';

    // Act
    const actual = formatFunctionName(stringInput);

    // Assert
    expect(actual).toEqual(expected);
  });
  test('should return error on null', async () => {
    // Arrange
    const stringInput = null;

    // Act + Assert
    expect(() => {
      formatFunctionName(stringInput);
    }).toThrowError();
  });
  test('should return error on undefined', async () => {
    // Arrange
    const stringInput = undefined;

    // Act + Assert
    expect(() => {
      formatFunctionName(stringInput);
    }).toThrowError();
  });
  test('should return empty string on empty string', async () => {
    // Arrange
    const expected = '';
    const stringInput = '';

    // Act
    const actual = formatFunctionName(stringInput);

    // Assert
    expect(actual).toEqual(expected);
  });
});
