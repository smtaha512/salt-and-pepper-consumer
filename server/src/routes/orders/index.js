const router = require('express').Router();

const repositories = require('../../repositories/index');
const middlewares = require('../../middlewares/index');
const { logger, formatLog } = require('../../utils/logger');
const { lodash: _, dateFns } = require('../../utils/libs/index');
const { stripe } = require('../../utils/stripe');
const dbModels = require('../../models/index');

router.get('/orders/:id?', middlewares.isReqParamValidID, (request, response) => {
  console.log('query: ', request.query);
  const orderId = request.params.id;
  const query = _.pick(request.query, ['from', 'to', 'userId', 'date']);
  if (query.from) query.from = dateFns.startOfDay(dateFns.parseISO(query.from));
  if (query.to) query.to = dateFns.endOfDay(dateFns.parseISO(query.to));
  if (query.date) {
    query.from = dateFns.startOfDay(dateFns.parseISO(query.date));
    query.to = dateFns.endOfDay(dateFns.parseISO(query.date));
    delete query.date;
  }

  repositories.orders
    .getOrders(dbModels)(orderId, query)
    .then((orders) => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', orders));
      response.status(200).send(orders);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send(`Unable to load order${orderId ? '' : 's'}`);
    });
});

router.post('/orders', middlewares.validateOrder, (request, response) => {
  const order = request.body;
  repositories.users
    .getUserById(models)(order.userId)
    .then((user) => stripe().createPaymentIntent({ amount: order.total, email: user.email }))
    .then((stripeResponse) => {
      return repositories.orders
        .createOrder(dbModels)(order)
        .then((order) => {
          logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', order));
          response.status(201).send(stripeResponse.client_secret);
        });
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Unable to create order');
    });
});

router.put('/orders/:id', [middlewares.isReqParamValidID, middlewares.validateOrderUpdate], (request, response) => {
  const orderId = request.params.id;
  const order = request.body;
  delete order._id;

  const updateOrders = repositories.orders.updateOrder(dbModels, { new: true });
  updateOrders(orderId, order)
    .then((order) => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', order));
      response.status(201).send(order);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Unable to create order');
    });
});

module.exports = router;
