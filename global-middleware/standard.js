/**
 * Include any other external middleware libraries that you want
 * your app to use. Such as cors, morgan etc....
 *
 * IMPORTANT TO NOTE: Middlewares are executed in the order in which
 * they are declared in the array.
 */
const bodyParser = require('body-parser');
const logger = require('../logger');
const { formatFunctionName } = require('../utility/format-utility');

class StandardMiddlewareProvider {
  constructor() {
    const { name } = StandardMiddlewareProvider;
    this.standardMiddleware = this.standardMiddleware.bind(this);
    this.clazzName = name;
  }

  standardMiddleware() {
    logger.info(
      `${this.clazzName}@${formatFunctionName(this.standardMiddleware.name)}`,
      {
        clazz: this.clazzName,
        fn: formatFunctionName(this.standardMiddleware.name),
      },
    );
    return [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      // cors(),
      // helmet(),
      // etc.. [add external middleware libraries here]
    ];
  }
}

module.exports = new StandardMiddlewareProvider();
