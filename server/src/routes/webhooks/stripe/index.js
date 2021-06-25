const { stripe } = require('../../../utils/stripe');
const repositories = require('../../../repositories/index');
const dbModels = require('../../../models/index');

const express = require('express');
const router = express.Router();

router.post('/stripe', express.raw({ type: 'application/json' }), (request, response) => {
  const payload = request.body;
  const stripeSignature = request.headers['stripe-signature'];

  console.log('Got payload: ', JSON.stringify(payload, null, 2));
  try {
    const event = stripe().constructEvent(payload, stripeSignature);
    console.log(JSON.stringify(event, null, 2));
    repositories.orders.updateOrderStatusByPaymentIntentId(dbModels)(payload.id);
    response.status(200);
  } catch (error) {
    console.log(`Webhook Error:`, error);
  }
});

module.exports = router;
