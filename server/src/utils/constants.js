module.exports.USER_TYPES = {
  admin: 'admin',
  user: 'user',
};

module.exports.TIME_FORMATS = {
  dateTimeDefault: 'dd MMM yyyy hh:mm:ss',
};

module.exports.RES_MSGS = {
  accountUpdated: 'Account Updated',
  detailsMissing: 'Details Missing',
  invalidCreds: 'Invalid Credentials',
  invalidQuery: 'Invalid Query',
  invalidVerificationCode: 'Invalid verification code',
  nameTaken: 'Name {name} already taken',
  noUserFound: 'No user found',
  notFound: 'Not Found',
  specifyUserType: 'Must specify login type',
  tooManyRequests: 'Too many requests',
};

module.exports.UNSECURE_ROUTES = ['/auth', '/graphql'];

module.exports.MODEL_NAMES = {
  admin: 'admin',
  item: 'item',
  menu: 'menu',
  order: 'order',
  user: 'user',
};

module.exports.ETAPattern = /^[0-9]{1,4} [M|H]$/;
module.exports.ORDER_STATUSES = ['preparing', 'prepared', 'picked', 'cancelled'];
module.exports.ITEM_PREFERENCES = ['hot', 'mild', 'spicy'];

module.exports.API_VERBS = {
  DELETE: 'DELETE',
  GET: 'GET',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
};
