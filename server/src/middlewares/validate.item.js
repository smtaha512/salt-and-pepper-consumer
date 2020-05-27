const mongoose = require('mongoose');

const addMinutes = require('date-fns/addMinutes');
const differenceInMinutes = require('date-fns/differenceInMinutes');
const { ETAPattern } = require('../utils/constants');
const { logger, formatLog } = require('../utils/logger');

function validateItem(request, response, next) {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', request.body));
  const item = request.body;
  const errors = [];

  if (!Object.keys(item).length) errors.push('Missing item payload');
  if (!item.categoryId) errors.push('Category ID is required');
  if (!mongoose.isValidObjectId(item.categoryId)) errors.push('Invalid category ID');
  if (!item.menuId) errors.push('Menu ID is required');
  if (!mongoose.isValidObjectId(item.menuId)) errors.push('Invalid menu ID');
  if (!item.price || item.price <= 0) errors.push('Invalid or missing item price');
  if (!item.eta) errors.push('Item time to cook is required');
  if (!ETAPattern.test(item.eta)) errors.push("Invalid ETA, It must be match '15 M, 60 M, 3 H' pattern");
  else {
    const now = new Date();
    const [etaValue, etaUnit] = item.eta.split(' ');
    const eta = addMinutes(new Date(), etaValue * (etaUnit === 'H' ? 60 : 1));
    const minDiffLTE10 = differenceInMinutes(eta, now) <= 10;
    if (minDiffLTE10) errors.push('Invalid ETA, It should take atleast 10 mins');
  }

  if (errors.length > 0) {
    logger.info(formatLog(request.method, request.originalUrl, 'response', 'error', errors));
    response.status(400).send(errors);
    return;
  }
  next();
}

module.exports.validateItem = validateItem;
