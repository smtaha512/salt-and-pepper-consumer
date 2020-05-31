const { USER_TYPES } = require('../utils/constants');

const { validator } = require('../utils/libs/index');
const { logger, formatLog } = require('../utils/logger');

/**
 * @param {'user'|'admin'} utype - User Type
 * @returns middleware function
 */
function validateUser(utype) {
  return function (request, response, next) {
    logger.info(formatLog(request.method, request.originalUrl, 'request', 'headers', request.headers));
    const errors = [];
    const user = request.body;

    if (!validator.isEmail(user.email)) errors.push('Invalid Email');
    if (!user.password) errors.push('Password is required');
    if (utype === USER_TYPES.user) {
      if (!/[0-9a-zA-Z]{4,16}/.test(user.username || '')) errors.push('Invalid Username');
      if (!user.firstname) errors.push('Firstname Required');
      if (!user.lastname) errors.push('Lastname Required');
    }
    if (errors.length > 0) {
      logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', user));
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'error', errors));
      response.status(400).send(errors);
      return;
    }
    next();
  };
}

module.exports.validateUser = validateUser;
