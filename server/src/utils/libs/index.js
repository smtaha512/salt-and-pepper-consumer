const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual');
const unionBy = require('lodash/unionBy');

const lodash = {
  get,
  isEmpty,
  isEqual,
  unionBy,
};

const isEmail = require('validator/lib/isEmail');

const validator = {
  isEmail,
};
const logger = require('pino')();

module.exports.lodash = lodash;
module.exports.logger = logger;
module.exports.validator = validator;
