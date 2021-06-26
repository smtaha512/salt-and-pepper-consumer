const login = require('../routes/auth/login');
const signup = require('../routes/auth/signup');
const menu = require('../routes/menu/index');
const items = require('../routes/items/index');
const orders = require('../routes/orders/index');
const users = require('../routes/users/index');
const middlewares = require('../middlewares/index');
const stripe = require('./webhooks/stripe/index');

const express = require('express');

module.exports = function registerRoutes(app) {
  app.use('/webhooks', [express.raw({
    type: 'application/json'
  })], [stripe]);
  app.use(express.json());
  app.get('/check', (_, r) => r.sendStatus(200));
  app.use('/auth', [login, signup]);
  app.use('/api', [middlewares.secureRoute()], [items, menu, items, orders, users]);
  // app.use('/webhooks', [stripe]);
};
