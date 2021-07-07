const { stripe } = require('../../../utils/stripe');
const repositories = require('../../../repositories/index');
const dbModels = require('../../../models/index');

const express = require('express');
const router = express.Router();

router.post('/stripe', (request, response) => {
  console.log(new Date().toISOString(), request);
  const payload = request.body;
  const stripeSignature = request.headers['stripe-signature'];

  try {
    const event = stripe().constructEvent(payload, stripeSignature);
    console.log(new Date().toISOString(), 16, JSON.stringify(event, null, 2), payload.toString());
    console.log(event);
    switch (event.type) {
      case 'payment_intent.created': {
        const paymentIntentId = event.data.object.id;
        stripe().confirmPaymentIntent({ id: paymentIntentId });
        break;
      }
      case 'payment_intent.succeeded': {
        const paymentIntentId = event.data.object.payment_intent;
        repositories.orders.updateOrderStatusByPaymentIntentId(dbModels)(paymentIntentId);
        break;
      }
      default:
        break;
    }
    response.status(200);
    response.end();
  } catch (error) {
    console.log(new Date().toISOString(), `Webhook Error:`, error);
    response.status(500);
    response.end();
  }
});

module.exports = router;
