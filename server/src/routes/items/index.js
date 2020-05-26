const router = require('express').Router();
const mongoose = require('mongoose');

const middlewares = require('../../middlewares/index');
const dbModels = require('../../models/index');
const repositories = require('../../repositories/index');

/**
 * @description /api/auth/:id? has a optional routeParam id.
 */
router.get('/items/:id?', middlewares.isReqParamValidID, (request, response) => {
  const itemId = request.params.id;
  repositories.item
    .getItem(dbModels)(itemId)
    .then((items) => void response.status(200).send(items))
    .catch((e) => {
      console.log('items/:id error: ', e);
      response.status(400).send('Unable to fetch items');
    });
});

router.delete('/items/:id', middlewares.isReqParamValidID, (request, response) => {
  // TODO - Transactions
  const itemId = request.params.id;
  repositories.item
    .deleteItem(dbModels)(itemId)
    .then((item) => repositories.menu.popRefFromCategory(dbModels)(item))
    .then(() => void response.sendStatus(200))
    .catch(() => void response.status(400).send('Unable to delete item'));
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
    .then(() => response.status(201).send(item))
    .catch((e) => {
      let message = 'Unable to add item';
      if (e && e.message.includes('E11000')) {
        message = 'Item title already';
      }
      response.status(400).send(message);
    });
});

module.exports = router;
