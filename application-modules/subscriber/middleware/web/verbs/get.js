const logger = require('../../../../../logger');

/**
 * Create Web VERB specific middleware within this module
 * All middleware defined and registered will apply to
 * Route.get() ONLY endpoints.
 */
class GetMiddlewareProvider {
  constructor() {
    const { name } = GetMiddlewareProvider;
    this.exampleFunction = this.exampleFunction.bind(this);
    this.clazzName = name;
  }

  exampleFunction(req, res, next) {
    logger.info(`${this.clazzName}@${this.exampleFunction.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.exampleFunction.name,
    });
    // Run checks on the request
    if (req.body === null) {
      res.status(400).json({ message: 'failed get middleware' });
      // Otherwise pass to the next middleware or handler
    } else next();
  }
}

module.exports = new GetMiddlewareProvider();
