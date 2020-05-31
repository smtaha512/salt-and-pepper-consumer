// @ts-check

const fs = require('fs');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { TIME_FORMATS } = require('../utils/constants');
const { dateFns } = require('../utils/libs/index');
const { lodash: _ } = require('../utils/libs/index');

// TODO - FIX JWT PRIVATE PUBLIC KEYS
// * Path is relative to Server.js file in base dir
const PRIVATE_KEY = fs.readFileSync('./certs/jwtRS256.key', 'utf8');

function signJWT() {
  const lifespan = 1;
  const jwtDetails = {
    expiresIn: dateFns.format(dateFns.addDays(new Date(), lifespan), TIME_FORMATS.dateTimeDefault),
    signedAt: dateFns.format(new Date(), TIME_FORMATS.dateTimeDefault),
  };
  // TODO - FIX JWT PRIVATE KEY
  return JWT.sign(jwtDetails, PRIVATE_KEY, {
    algorithm: 'RS256',
    encoding: 'utf8',
    expiresIn: `${lifespan} days`,
    issuer: 'issuer',
  });
}

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * function getNestedUpdateable
 * @param {Object} target
 * @param {String} leadKey
 * @param {'array'|'object'} holderType
 */
function getNestedUpdateable(target, leadKey, holderType = 'array') {
  return Object.keys(target).reduce(
    (prev = {}, nextKey) => {
      const key = `${leadKey}${holderType === 'array' ? '.$' : ''}.${nextKey}`;
      return {
        ...prev,
        [key]: target[nextKey],
      };
    },
    {} // * accumulator must be set to empty object.
  );
}

/**
 * @param {String} password
 * @returns {String | Promise.<String> | Error} - returns bcrypt hash
 */
function generateHash(password) {
  const salt = process.env.SAP_SALT;
  if (!salt) return new Error('Missing Salt');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

/**
 * @param {{errors: any[]}} e
 * @param {Boolean} multi
 * @returns {string[] | string}
 */
function checkForSchemaErrors(e, multi = false) {
  if (!e) return null;

  const errors = Object.keys(e.errors || {}).map((fieldKey) => e.errors[fieldKey].message);
  return multi ? errors : errors[0];
}

function stringifyPayload(payload) {
  const premitives = ['string', 'boolean', 'number', 'undefined'];
  if (premitives.find((p) => p === typeof payload)) return payload;
  else if (typeof payload === 'object') return JSON.stringify(payload);
  else throw new Error('Invalid Payload, Unable to serialize');
}

function calcTimeDiff(from, to) {
  const diffMs = from - to; // milliseconds between now & Christmas
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  return {
    diffDays,
    diffHrs,
    diffMins,
  };
}
/**
 * @param {Object} parent - MongoDB's document.
 * @param {{first?: Number, last?:Number}} args
 * @param {String} field
 * @returns {Object[]}
 */
function trimFirstAndLast(parent, args, field) {
  const { first = null, last = null } = args;

  if (first && (!last || last === 0)) {
    return parent[field].slice(0, first);
  } else if (last && (!first || first === 0)) {
    return parent[field].slice(`-${last}`);
  } else if (last > 0 && first > 0) {
    const firsties = parent[field].slice(0, first);
    const lasties = parent[field].slice(`-${last}`);
    const union = _.unionBy(firsties, lasties, '_id');
    return union;
  }

  return parent[field];
}

/**
 * @param {string} route
 * @returns
 */
function idifyRoute(route) {
  if (route.charAt(route.length - 1) === '/') route = route.slice(0, -1);
  return new RegExp(`^${route}(/)?([0-9a-fA-F]{24})?$`);
}

module.exports.calcTimeDiff = calcTimeDiff;
module.exports.checkForSchemaErrors = checkForSchemaErrors;
module.exports.generateHash = generateHash;
module.exports.generateRandomString = generateRandomString;
module.exports.getNestedUpdateable = getNestedUpdateable;
module.exports.idifyRoute = idifyRoute;
module.exports.signJWT = signJWT;
module.exports.stringifyPayload = stringifyPayload;
module.exports.trimFirstAndLast = trimFirstAndLast;
