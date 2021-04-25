const { stripe } = require('@src/utils/stripe');
const repositories = require('../../../repositories/index');
const dbModels = require('../../../models/index');

const router = require('express').Router();

router.post('/stripe', (request, response) => {
  const payload = request.body;
  const stripeSignature = request.headers['stripe-signature'];

  console.log('Got payload: ' + payload);
  try {
    const event = stripe().constructEvent(payload, stripeSignature);
    console.log(event);
    return repositories.orders
      .updateOrderStatusByPaymentIntentId(dbModels)(payload.id)
      .then(() => response.status(200));
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }
});

module.exports = router;
