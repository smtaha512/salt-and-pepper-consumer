const router = require('express').Router();

const repositories = require('../../repositories/index');
const middlewares = require('../../middlewares/index');
const dbModels = require('../../models/index');

router.get('/orders/:id?', (request, response) => {
  const orderId = request.params.id;
  repositories.orders
    .getOrders(dbModels)(orderId)
    .then((orders) => void response.status(200).send(orders))
    .catch(() => void response.status(400).send(`Unable to load order${orderId ? '' : 's'}`));
});

router.post('/orders', middlewares.validateOrder, (request, response) => {
  const order = request.body;
  repositories.orders
    .createOrder(dbModels)(order)
    .then((order) => void response.status(201).send(order))
    .catch((e) => {
      console.log('craete order: e: ', e);
      response.status(400).send('Unable to create order');
    });
});

router.put('/orders/:id', [middlewares.isReqParamValidID, middlewares.validateOrderUpdate], (request, response) => {
  const orderId = request.params.id;
  const order = request.body;
  delete order._id;

  const updateOrders = repositories.orders.updateOrder(dbModels, { new: true });
  updateOrders(orderId, order)
    .then((order) => void response.status(201).send(order))
    .catch((e) => {
      console.log('craete order: e: ', e);
      response.status(400).send('Unable to create order');
    });
});

module.exports = router;
