const { stripe } = require('../../../utils/stripe');
const repositories = require('../../../repositories/index');
const dbModels = require('../../../models/index');

const express = require('express');
const router = express.Router();

router.post('/stripe', (request, response) => {
  console.log(new Date().toISOString(), request);
  const payload = request.body;
  const stripeSignature = request.headers['stripe-signature'];

  console.log(new Date().toISOString(), 'Got payload: ', JSON.stringify(payload, null, 2));
  try {
    const event = stripe().constructEvent(payload, stripeSignature);
    console.log(new Date().toISOString(), 16, JSON.stringify(event, null, 2), payload.toString());
    repositories.orders.updateOrderStatusByPaymentIntentId(dbModels)(payload.id);
    response.status(200);
    response.end();
  } catch (error) {
    console.log(new Date().toISOString(), `Webhook Error:`, error);
  }
});

module.exports = router;
