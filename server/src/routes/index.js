const login = require('@src/routes/auth/login.route');
const signup = require('@src/routes/auth/signup.route');

module.exports = function registerRoutes(app) {
  app.use('/auth', [login, signup]);
};
