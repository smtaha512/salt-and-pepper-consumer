function stripe() {
  const { lodash: _ } = require('./libs/index');
  const Stripe = require('stripe');

  const stripeSecret = _.get(global, 'app.envConfig.stripeSecret');
  const stripeEndpointSecret = _.get(global, 'app.envConfig.stripeEndpointSecret');

  const stripe = new Stripe.Stripe(stripeSecret, {
    apiVersion: '2020-08-27',
  });

  function createPaymentIntent({ amount, email, stripeCustomerId } = { amount: 0, email: '', stripeCustomerId: '' }) {
    return stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      receipt_email: email,
    });
  }

  function confirmPaymentIntent({ id } = { id: '' }) {
    return stripe.paymentIntents.confirm(id, { payment_method: 'pm_card_visa' });
  }

  function constructEvent(payload = '', signature) {
    return stripe.webhooks.constructEvent(payload, signature, stripeEndpointSecret);
  }

  function createCustomer(email = '', phone = '') {
    return stripe.customers.create({
      email,
      phone,
    });
  }

  function createEphememralKey(customerId = '') {
    return stripe.ephemeralKeys.create({ customer: customerId }, { apiVersion: '2020-08-27' });
  }

  return { confirmPaymentIntent, constructEvent, createCustomer, createEphememralKey, createPaymentIntent };
}
module.exports.stripe = stripe;
