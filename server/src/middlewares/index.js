const { validateUser } = require('./validate-user');
const { secureRoute } = require('./secure-routes');
const { validateMenu } = require('./validate-menu');

module.exports = {
  secureRoute,
  validateMenu,
  validateUser,
};
