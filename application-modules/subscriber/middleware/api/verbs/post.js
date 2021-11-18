const logger = require('../../../../../logger');

/**
 * Create API VERB specific middleware within this module
 * All middleware defined and registered will apply to
 * Api.post() ONLY endpoints.
 */
class PostMiddlewareProvider {
  constructor() {
    const { name } = PostMiddlewareProvider;
    this.exampleFunction = this.exampleFunction.bind(this);
    this.clazzName = name;
  }

  exampleFunction(req, res, next) {
    logger.info(`${this.clazzName}@${this.exampleFunction.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.exampleFunction.name,
    });
    // Run some checks on the body
    if (req.body === null) {
      res.status(400).json({ message: 'failed post middleware' });
      // Otherwise pass to next middleware or handler
    } else next();
  }
}

module.exports = new PostMiddlewareProvider();
