const mongoose = require('mongoose');
const { logger, formatLog } = require('../utils/logger');

function isReqParamValidID(request, response, next) {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'params', request.params));
  const id = request.params.id;
  const errors = [];

  if (id && !mongoose.isValidObjectId(id)) errors.push('Invalid ID in request params');

  if (errors.length > 0) {
    logger.info(formatLog(request.method, request.originalUrl, 'response', 'error', errors));
    response.status(400).send(errors);
    return;
  }
  next();
}

module.exports.isReqParamValidID = isReqParamValidID;
