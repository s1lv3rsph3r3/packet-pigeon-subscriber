const logger = require('../../../../../logger');

/**
 * Create Web VERB specific middleware within this module
 * All middleware defined and registered will apply to
 * Route.put() ONLY endpoints.
 */
class PutMiddlewareProvider {
  constructor() {
    const { name } = PutMiddlewareProvider;
    this.exampleFunction = this.exampleFunction.bind(this);
    this.clazzName = name;
  }

  exampleFunction(req, res, next) {
    logger.info(`${this.clazzName}@${this.exampleFunction.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.exampleFunction.name,
    });
    // Run some checks on the request
    if (req.body === null) {
      req.status(400).json({ message: 'failed the put middleware' });
      // Otherwise pass to the next middleware or handler
    } else next();
  }
}

module.exports = new PutMiddlewareProvider();
