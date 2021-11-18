const { applicationUtils } = require('@s1lv3rsph3r3/metropolitan');

/**
 * Utility function that allows web routes
 * (URI's that return views) to be registered
 * for the given expressApp
 * @param expressApp
 */
const startWebRouting = (expressApp) => {
  if (expressApp === null || expressApp === undefined) {
    throw new Error('Express application is not defined');
  }
  // Boot the routing modules defined in the config
  applicationUtils.bootWebRoutes(expressApp);
};

/**
 * Utility function that allows API routes
 * (URI's that return typically JSON) to be registered
 * for the given expressApp
 * @param expressApp
 */
const startApiRouting = (expressApp) => {
  if (expressApp === null || expressApp === undefined) {
    throw new Error('Express application is not defined');
  }
  applicationUtils.bootApiRoutes(expressApp);
};

/**
 * Utility function that allows a subscriber
 * (a client connection to redis) to
 * listen for events in a pub/sub model.
 * @param subscriber
 */
const startEventRouting = (subscriber) => {
  if (subscriber === null || subscriber === undefined) {
    throw new Error('Subscriber is not defined');
  }
  applicationUtils.bootModuleEvents(subscriber);
};

/**
 * Utility function that allows
 * prerequisites (such as loading data from
 * a DB) to be initiated prior to an application
 * becoming available.
 */
const moduleSpecificBootloader = () => {
  /**
   * Any process that must be started for specific modules to load
   * correctly should be dispatched from this point in the application
   */
  applicationUtils.bootModulePreReq();
};

module.exports = {
  startWebRouting,
  startApiRouting,
  startEventRouting,
  moduleSpecificBootloader,
};
