// @ts-check
const DateFns = require('date-fns');
const fs = require('fs');
const JWT = require('jsonwebtoken');

const { TIME_FORMATS, unsecureRoutes } = require('@src/utils/constants');
const { lodash: _ } = require('@src/utils/libs');

// TODO - FIX JWT PRIVATE PUBLIC KEYS
// * Path is relative to Server.js file in base dir
// const PRIVATE_KEY = fs.readFileSync('./certs/jwtRS256.key', 'utf8');
// const PUBLIC_KEY = fs.readFileSync('./certs/jwtRS256.key.pub', 'utf8');

function signJWT() {
  const lifespan = 3;
  const jwtDetails = {
    expiresIn: DateFns.format(DateFns.addDays(new Date(), lifespan), TIME_FORMATS.dateTimeDefault),
    signedAt: DateFns.format(new Date(), TIME_FORMATS.dateTimeDefault),
  };
  // TODO - FIX JWT PRIVATE KEY
  return JWT.sign(jwtDetails, 'PRIVATEKEY', {
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
 * @param {String} pwdString
 * @returns {String | Promise.<String>} - returns argon2 hash
 */
function generateHash(pwdString) {
  return pwdString;
}

/**
 * @param {{global?: boolean}} config
 * @returns {function(): void}
 */

function secureRoute(config = {}) {
  /**
   * @param {Request} request
   * @param {Object} response
   * @param { function():void } next
   */
  return function (request, response, next) {
    if (config.global && unsecureRoutes.some((route) => new RegExp(`^${route}`, 'i').test(request.path))) return next();

    const token = request.headers.authorization;
    if (!token) return response.sendStatus(401);
    // TODO - FIX PRIVATE KEY JWT KEY
    if (!token) return response.sendStatus(401);
    else JWT.verify(token, 'PRIVATE_KEY', (err) => void (err ? response.sendStatus(401) : next()));
  };
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

module.exports.checkForSchemaErrors = checkForSchemaErrors;
module.exports.generateHash = generateHash;
module.exports.generateRandomString = generateRandomString;
module.exports.getNestedUpdateable = getNestedUpdateable;
module.exports.secureRoute = secureRoute;
module.exports.signJWT = signJWT;
module.exports.trimFirstAndLast = trimFirstAndLast;
