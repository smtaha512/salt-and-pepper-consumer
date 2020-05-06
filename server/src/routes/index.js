const login = require('@src/routes/auth/login');
const signup = require('@src/routes/auth/signup');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
};
