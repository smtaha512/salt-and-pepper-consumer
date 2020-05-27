const login = require('../routes/auth/login');
const signup = require('../routes/auth/signup');
const menu = require('../routes/menu/index');
const items = require('../routes/items/index');
const orders = require('../routes/orders/index');
const middlewares = require('../middlewares/index');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
  app.use('/api', [middlewares.secureRoute()], [items, menu, items, orders]);
};
