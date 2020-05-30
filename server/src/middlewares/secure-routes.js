const JWT = require('jsonwebtoken');
const fs = require('fs');

const { logger, formatLog } = require('../utils/logger');
const { API_VERBS } = require('../utils/constants');
const { _ } = require('../utils/libs/index');

const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

const unprotectedRoutes = [
  {
    method: API_VERBS.GET,
    params: null,
    qs: null,
    url: '/api/orders',
  },
  {
    method: API_VERBS.GET,
    params: null,
    qs: null,
    url: '/api/menus',
  },
  {
    method: API_VERBS.GET,
    params: null,
    qs: null,
    url: '/api/items',
  },
];
/**
 * @returns {function(): void}
 */
function secureRoute() {
  return function (request, response, next) {
    logger.info(formatLog(request.method, request.originalUrl, 'request', 'headers', request.headers));
    if (
      unprotectedRoutes.find((r) => {
        const sameUrl = r.url === request.originalUrl;
        const sameMethod = r.method === request.method;
        // * To compare params and qs, uncomment next two lines
        // const sameParams = _.isEqual(r.params, request.params)
        // const sameQuery = _.isEqual(r.qs, request.query)
        return sameUrl && sameMethod;
      })
    ) {
      next();
      return;
    }

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
