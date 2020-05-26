const { validateUser } = require('./validate-user');
const { validateItem } = require('./validate.item');
const { secureRoute } = require('./secure-routes');
const { validateMenu } = require('./validate-menu');
const { validateOrder, validateOrderUpdate } = require('./validate-order');
const { isReqParamValidID } = require('./general');

module.exports = {
  isReqParamValidID,
  secureRoute,
  validateItem,
  validateMenu,
  validateOrder,
  validateOrderUpdate,
  validateUser,
};
