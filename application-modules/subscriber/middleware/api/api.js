const logger = require('../../../../logger');

/**
 * Create API specific middleware within this module
 * All middleware defined and registered will apply to
 * Api.get(), Api.post() ... etc endpoints.
 */
class ApiMiddlewareProvider {
  constructor() {
    const { name } = ApiMiddlewareProvider;
    this.exampleFunction = this.exampleFunction.bind(this);
    this.clazzName = name;
  }

  /**
   * An example function. API specific middleware can
   * be added here and registered in the module middleware config.
   * @param req
   * @param res
   * @param next
   */
  exampleFunction(req, res, next) {
    logger.info(`${this.clazzName}@${this.exampleFunction.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.exampleFunction.name,
    });
    // Run some checks on the request
    if (req.body === null) {
      res.status(400).json({ message: 'failed to pass API middleware' });
      // Otherwise pass to the next middleware or handler
    } else next();
  }
}

module.exports = new ApiMiddlewareProvider();
