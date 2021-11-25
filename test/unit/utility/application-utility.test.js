const { applicationUtils } = require('@s1lv3rsph3r3/metropolitan');
const {
  startWebRouting,
  startApiRouting,
  startEventRouting,
  moduleSpecificBootloader,
} = require('../../../utility/application-utility');

describe('startWebRouting', () => {
  test('should throw error when no argument is given', async () => {
    // Arrange
    const expectedErrorMessage = 'Express application is not defined';

    // Act + Assert
    expect(() => {
      startWebRouting();
    }).toThrowError(expectedErrorMessage);
  });
  test('should throw error when expressApp is undefined', async () => {
    // Arrange
    const expectedErrorMessage = 'Express application is not defined';
    const expressApp = undefined;

    // Act + Assert
    expect(() => {
      startWebRouting(expressApp);
    }).toThrowError(expectedErrorMessage);
  });
  test('should throw error when expressApp is null', async () => {
    // Arrange
    const expectedErrorMessage = 'Express application is not defined';
    const expressApp = null;

    // Act + Assert
    expect(() => {
      startWebRouting(expressApp);
    }).toThrowError(expectedErrorMessage);
  });
  test('should call bootWebRoutes', async () => {
    // Arrange
    const expressApp = jest.fn();
    const spy = jest
      .spyOn(applicationUtils, 'bootWebRoutes')
      .mockReturnValue(true);

    // Act
    startWebRouting(expressApp);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expressApp);
  });
});

describe('startApiRouting', () => {
  test('should throw error when no argument is given', async () => {
    // Arrange
    const expectedErrorMessage = 'Express application is not defined';

    // Act + Assert
    expect(() => {
      startApiRouting();
    }).toThrowError(expectedErrorMessage);
  });
  test('should throw error when expressApp is not defined', async () => {
    // Arrange
    const expectedErrorMessage = 'Express application is not defined';
    const expressApp = undefined;

    // Act + Assert
    expect(() => {
      startApiRouting(expressApp);
    }).toThrowError(expectedErrorMessage);
  });
  test('should throw error when expressApp is null', async () => {
    // Arrange
    const expectedErrorMessage = 'Express application is not defined';
    const expressApp = null;

    // Act + Assert
    expect(() => {
      startApiRouting(expressApp);
    }).toThrowError(expectedErrorMessage);
  });
  test('should call bootApiRoutes', async () => {
    // Arrange
    const expressApp = jest.fn();
    const spy = jest
      .spyOn(applicationUtils, 'bootApiRoutes')
      .mockReturnValue(true);

    // Act
    startApiRouting(expressApp);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expressApp);
  });
});

describe('startEventRouting', () => {
  test('should throw error when no argument is given', async () => {
    // Arrange
    const expectedErrorMessage = 'Subscriber is not defined';

    // Act + Assert
    expect(() => {
      startEventRouting();
    }).toThrowError(expectedErrorMessage);
  });
  test('should throw error when subscriber is not defined', async () => {
    // Arrange
    const expectedErrorMessage = 'Subscriber is not defined';
    const subscriber = undefined;

    // Act + Assert
    expect(() => {
      startEventRouting(subscriber);
    }).toThrowError(expectedErrorMessage);
  });
  test('should throw error when subscriber is null', async () => {
    // Arrange
    const expectedErrorMessage = 'Subscriber is not defined';
    const subscriber = null;

    // Act + Assert
    expect(() => {
      startEventRouting(subscriber);
    }).toThrowError(expectedErrorMessage);
  });
  test('should call bootModuleEvents', async () => {
    // Arrange
    const subscriber = jest.fn();
    const spy = jest
      .spyOn(applicationUtils, 'bootModuleEvents')
      .mockReturnValue(true);

    // Act
    startEventRouting(subscriber);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(subscriber);
  });
});

describe('moduleSpecificBootloader', () => {
  test('should call underlying module for prerequisites', async () => {
    // Arrange
    const spy = jest
      .spyOn(applicationUtils, 'bootModulePreReq')
      .mockReturnValue(true);

    // Act
    moduleSpecificBootloader();

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
