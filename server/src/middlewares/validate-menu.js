const { logger, formatLog } = require('../utils/logger');

function validateMenu(request, response, next) {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', request.body));
  const menu = request.body;
  const errors = [];
  if (!menu.title) errors.push('Title is required');
  if (menu.title > 20) errors.push('Title should be less than 20 charactors');

  if (errors.length > 0) {
    logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', errors));
    response.status(400).send(errors);
    return;
  }
  next();
}

module.exports.validateMenu = validateMenu;
