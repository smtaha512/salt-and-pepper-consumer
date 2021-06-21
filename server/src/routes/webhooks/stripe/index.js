const { stripe } = require('../../../utils/stripe');
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
    repositories.orders.updateOrderStatusByPaymentIntentId(dbModels)(payload.id);
    response.status(200);
  } catch (error) {
    console.log(`Webhook Error:`, error);
  }
});

module.exports = router;
