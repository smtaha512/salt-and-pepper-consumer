const login = require('../routes/auth/login');
const signup = require('../routes/auth/signup');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
};
