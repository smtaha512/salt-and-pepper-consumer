const JWT = require('jsonwebtoken');
const fs = require('fs');
const { unsecureRoutes } = require('../utils/constants');

const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

/**
 * @param {{global?: boolean}} config
 * @returns {function(): void}
 */
function secureRoute(config = {}) {
  /**
   * @param {Request} request
   * @param {Object} response
   * @param { function():void } next
   */
  return function (request, response, next) {
    if (config.global && unsecureRoutes.some((route) => new RegExp(`^${route}`, 'i').test(request.path))) return next();

    const token = request.headers.authorization;
    if (!token) return response.sendStatus(401);
    JWT.verify(token, PUBLIC_KEY, (err) => {
      if (err) {
        response.sendStatus(401);
        return;
      }

      next();
    });
  };
}

module.exports.secureRoute = secureRoute;
