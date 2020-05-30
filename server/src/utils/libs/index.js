const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual');
const unionBy = require('lodash/unionBy');
const groupBy = require('lodash/groupBy');

const lodash = {
  get,
  groupBy,
  isEmpty,
  isEqual,

const validator = {
  isEmail,
};

const addDays = require('date-fns/addDays');
const addMinutes = require('date-fns/addMinutes');
const differenceInMinutes = require('date-fns/differenceInMinutes');
const endOfDay = require('date-fns/endOfDay');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const startOfDay = require('date-fns/startOfDay');

const dateFns = {
  addDays,
  addMinutes,
  differenceInMinutes,
  endOfDay,
  format,
  parseISO,
  startOfDay,
};

module.exports.dateFns = dateFns;
module.exports.lodash = lodash;
module.exports.validator = validator;
