const pino = require('pino');
const { stringifyPayload } = require('../utils/index');
const logger = pino(
  {
    useLevelLabels: true,
  },
  pino.destination({
    dest: './log-debug',
    minLength: 4096,
    sync: false,
  })
).child({});

/**
 * @param {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'JSONP'|string} apiVerb
 * @param {'request'|'response'} channel
 * @param {string} routePath
 * @param {'params'|'headers'|'body'|'query-string'|'error'|''} elem
 * @param {any} payload
 */
function formatLog(apiVerb, routePath, channel, elem, payload) {
  return `${apiVerb} ${routePath} ${channel} ${elem} ${stringifyPayload(payload)}`;
}

logger.info('App Initialized');

module.exports.formatLog = formatLog;
module.exports.logger = logger;
