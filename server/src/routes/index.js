const login = require('../routes/auth/login');
const signup = require('../routes/auth/signup');
const menu = require('../routes/menu/index');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
  app.use('/api', [menu]);
};
