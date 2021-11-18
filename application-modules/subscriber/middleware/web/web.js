const logger = require('../../../../logger');

/**
 * Create Web specific middleware within this module
 * All middleware defined and registered will apply to
 * Route.get(), Route.post() ... etc endpoints.
 */
class WebMiddlewareProvider {
  constructor() {
    const { name } = WebMiddlewareProvider;
    this.exampleFunction = this.exampleFunction.bind(this);
    this.clazzName = name;
  }

  /**
   * An example function. Web specific middleware can
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
      res.status(400).json({ message: 'failed web middleware' });
      // Otherwise pass to the next middleware or handler
    } else next();
  }
}

module.exports = new WebMiddlewareProvider();
