const mongoose = require('mongoose');

const { ORDER_STATUSES, ETAPattern } = require('../utils/constants');
const { logger, formatLog } = require('../utils/logger');
const { dateFns } = require('../utils/libs/index');

function validateOrder(request, response, next) {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', request.body));
  const { order } = request.body;
  const errors = [];

  if (Object.keys(order).length === 0) {
    response.status(400).send(['Missing order payload']);
    return;
  }
  if (!order.items || order.items.length <= 0) errors.push('Order has no items associated');
  if (!order.userId || !mongoose.isValidObjectId(order.userId)) errors.push('Invalid or missing user ID');
  if (!order.total || parseFloat(order.total) <= 0) errors.push("Missing order's total amount");
  if (order.tip && Number.isNaN(parseFloat(order.tip))) errors.push("Invalid order's total amount");
  if (errors.length > 0) {
    logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', errors));
    response.status(400).send(errors);
    return;
  }
  next();
}

function validateOrderUpdate(request, response, next) {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', request.body));
  const order = request.body;
  const errors = [];

  if (Object.keys(order).length === 0) {
    response.status(400).send(['Missing order payload']);
    return;
  }
  if (order.userId && !mongoose.isValidObjectId(order.userId)) errors.push('Invalid user ID');
  if (order.userId && !mongoose.isValidObjectId(order.userId)) errors.push('Invalid user ID');
  if (order.total && parseFloat(order.total) <= 0) errors.push("Invalid order's total amount");
  if (order.status && !ORDER_STATUSES.includes(order.status.toLowerCase())) errors.push('Invalid order status');
  if (order.eta) {
    if (!ETAPattern.test(order.eta)) errors.push("Invalid ETA, It must be match '15 M, 60 M, 3 H' pattern");
    else {
      const now = new Date();
      const [etaValue, etaUnit] = order.eta.split(' ');
      const eta = dateFns.addMinutes(new Date(), etaValue * (etaUnit === 'H' ? 60 : 1));
      const minDiffLTE1 = dateFns.differenceInMinutes(eta, now) <= 0;
      if (minDiffLTE1) errors.push('Invalid ETA, Time has passed');
    }
  }

  if (errors.length > 0) {
    logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', errors));
    response.status(400).send(errors);
    return;
  }
  next();
}
module.exports.validateOrder = validateOrder;
module.exports.validateOrderUpdate = validateOrderUpdate;
