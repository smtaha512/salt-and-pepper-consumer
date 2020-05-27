const JWT = require('jsonwebtoken');
const fs = require('fs');
const { logger, formatLog } = require('../utils/logger');
const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

/**
 * @returns {function(): void}
 */
function secureRoute() {
  return function (request, response, next) {
    logger.info(formatLog(request.method, request.originalUrl, 'request', 'headers', request.headers));

    const token = request.headers.authorization;
    if (!token) return response.sendStatus(401);
    JWT.verify(token, PUBLIC_KEY, (err) => {
      if (err) {
        logger.info(formatLog(request.method, request.originalUrl, 'response', 'error', 'Invalid authorization token'));
        response.sendStatus(401);
        return;
      }

      next();
    });
  };
}

module.exports.secureRoute = secureRoute;
