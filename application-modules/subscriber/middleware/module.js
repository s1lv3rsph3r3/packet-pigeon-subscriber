const { v4: uuidv4 } = require('uuid');
const logger = require('../../../logger');

/**
 * Create module specific middleware functions
 * these functions will only apply to endpoints listed in the
 * current application-module (publisher)
 */
class ModuleMiddlewareProvider {
  constructor() {
    const { name } = ModuleMiddlewareProvider;
    this.generateUniqueRequestId = this.generateUniqueRequestId.bind(this);
    this.logRequest = this.logRequest.bind(this);
    this.clazzName = name;
  }

  /**
   * Example middleware function of generating
   * a unique request ID for every request.
   * @param req
   * @param res
   * @param next
   */
  generateUniqueRequestId(req, res, next) {
    req.UUID = uuidv4();
    logger.info(`${this.clazzName}@${this.generateUniqueRequestId.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.generateUniqueRequestId.name,
    });
    next();
  }

  /**
   * An example middleware function that can be used to
   * immediately log all incoming requests for this (publisher)
   * module.
   * @param req
   * @param res
   * @param next
   */
  logRequest(req, res, next) {
    logger.info(`${this.clazzName}@${this.logRequest.name}`, {
      uuid: req.UUID,
      clazz: this.clazzName,
      fn: this.logRequest.name,
    });
    next();
  }
}

module.exports = new ModuleMiddlewareProvider();
