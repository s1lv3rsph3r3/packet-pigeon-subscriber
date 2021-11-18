const logger = require('../../../../logger');

/**
 * Create specific middleware for usage with individual
 * endpoints.
 * Custom Middleware is registered using
 * Api.middleware({},[...array of strings of custom middleware declaration]).get()...
 */
class IndividualRouteMiddleware {
  constructor() {
    const { name } = IndividualRouteMiddleware;
    this.routeSpecMiddleware = this.routeSpecMiddleware.bind(this);
    this.clazzName = name;
  }

  routeSpecMiddleware(req, res, next) {
    logger.info(`${this.clazzName}@${this.routeSpecMiddleware.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.routeSpecMiddleware.name,
    });
    // Run some checks on your request
    if (req.body === null) {
      res.status(400).json({ message: 'failed spec route middleware' });
      // Otherwise pass to next middleware or handler
    } else next();
  }
}

module.exports = new IndividualRouteMiddleware();
