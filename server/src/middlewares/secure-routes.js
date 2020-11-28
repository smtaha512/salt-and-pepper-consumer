const JWT = require('jsonwebtoken');
const fs = require('fs');

const { logger, formatLog } = require('../utils/logger');
const { API_VERBS } = require('../utils/constants');
const { idifyRoute } = require('../utils/index');

const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

const unprotectedRoutes = [
  {
    method: API_VERBS.GET,
    qs: null,
    url: idifyRoute('/api/menus'),
  },
  {
    method: API_VERBS.GET,
    qs: null,
    url: idifyRoute('/api/items'),
  },
];
/**
 * @returns {function(): void}
 */
function secureRoute() {
  return function (request, response, next) {
    logger.info(formatLog(request.method, request.originalUrl, 'request', 'headers', request.headers));
    
    const isGETCall = request.method === API_VERBS.GET;
    if (isGETCall) {
      next();
      return;
    }

    const isUnprotected = unprotectedRoutes.find((r) => {
      const sameUrl = r.url.test(request.originalUrl);
      const sameMethod = r.method === request.method;
      // * To compare params and qs, _ is lodash, uncomment next two lines
      // const sameParams = _.isEqual(r.params, request.params)
      // const sameQuery = _.isEqual(r.qs, request.query)
      return sameUrl && sameMethod;
    });
    if (isUnprotected) {
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
