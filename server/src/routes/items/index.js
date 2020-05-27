const router = require('express').Router();

const middlewares = require('../../middlewares/index');
const dbModels = require('../../models/index');
const { logger, formatLog } = require('../../utils/logger');
const repositories = require('../../repositories/index');

/**
 * @description /api/auth/:id? has a optional routeParam id.
 */
router.get('/items/:id?', middlewares.isReqParamValidID, (request, response) => {
  const itemId = request.params.id;
  repositories.item
    .getItem(dbModels)(itemId)
    .then((items) => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', items));
      response.status(200).send(items);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Unable to fetch items');
    });
});

router.delete('/items/:id', middlewares.isReqParamValidID, (request, response) => {
  // TODO - Transactions
  const itemId = request.params.id;
  repositories.item
    .deleteItem(dbModels)(itemId)
    .then((item) => repositories.menu.popRefFromCategory(dbModels)(item))
    .then(() => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', 'OK'));
      response.sendStatus(200);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Unable to delete item');
    });
});

router.post('/items', middlewares.validateItem, async (request, response) => {
  // TODO - Transactions
  let item;
  repositories.item
    .createItem(dbModels)(request.body)
    .then((itemDoc) => {
      item = itemDoc.toObject();
      return repositories.menu.pushRefToCategory(dbModels)(item);
    })
    .then(() => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', 'OK'));
      response.status(201).send(item);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      let message = 'Unable to add item';
      if (e && e.message.includes('E11000')) {
        message = 'Item title already';
      }
      response.status(400).send(message);
    });
});

module.exports = router;
