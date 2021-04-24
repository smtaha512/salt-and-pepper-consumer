function stripe() {
  const { lodash: _ } = require('./libs/index');
  const Stripe = require('stripe');

  const stripeSecret = _.get(global, 'app.envConfig.stripeSecret');
  const stripeEndpointSecret = _.get(global, 'app.envConfig.stripeEndpointSecret');

  const stripe = new Stripe.Stripe(stripeSecret, {
    apiVersion: '2020-08-27',
  });

  function createPaymentIntent({ amount, email } = { amount: 0, email: '' }) {
    return stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      receipt_email: email,
    });
  }

  function constructEvent(payload = '', signature) {
    return stripe.webhooks.constructEvent(payload, signature, stripeEndpointSecret);
  }

  return { constructEvent, createPaymentIntent };
}
module.exports.stripe = stripe;
