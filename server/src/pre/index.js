const BodyParser = require('body-parser');
const dbConnections = require('@src/pre/db-connection');
const envConfig = require('@src/utils/configs/env.config');

module.exports = function preInitialization(app) {
  // * Condition for enviroment.
  const env = process.env.ENV;
  global['app'] = {};
  global['app'].envConfig = envConfig[env];

  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());

  if (['staging', 'development'].includes(env)) {
    const cors = require('cors');
    app.use(cors({ exposedHeaders: 'Authorization' }));
  } else if (env === 'production') {
    // * Settings only for production
  }

  dbConnections.estDBConnection();
};
