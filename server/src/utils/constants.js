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
  nameTaken: 'Name {name} already taken',
  noUserFound: 'No user found',
  notFound: 'Not Found',
  specifyUserType: 'Must specify login type',
};

module.exports.unsecureRoutes = ['/auth', '/graphql'];

module.exports.MODEL_NAMES = {
  admin: 'admin',
  item: 'item',
  menu: 'menu',
  order: 'order',
  user: 'user',
};

module.exports.ETAPattern = /^[0-9]{1,4} [M|H]$/;
