const JWT = require('jsonwebtoken');
const fs = require('fs');

const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

/**
 * @returns {function(): void}
 */
function secureRoute() {
  return function (request, response, next) {
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
