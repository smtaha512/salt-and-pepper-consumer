const { lodash: _ } = require('../utils/libs/index');
const { logger } = require('../utils/logger');
const dbConnections = require('../pre/db-connection');
const envConfig = require('../utils/configs/env.config');

const express = require('express');

module.exports = function preInitialization(app) {
  // * Condition for enviroment.
  const env = process.env.ENV;
  global['app'] = {};
  global['app'].envConfig = envConfig[env];

  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    if (req.originalUrl.includes('/webhooks')) {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

  const cors = require('cors');
  if (['staging', 'development'].includes(env)) {
    app.use(cors({ exposedHeaders: 'Authorization' }));
  } else if (env === 'production') {
    // * Settings only for production
    app.use(cors({ exposedHeaders: 'Authorization' }));
  }

  const dbUrl = _.get(global, 'app.envConfig.dbUrl');
  if (!dbUrl) throw new Error('Must specify correct DB_URL');
  dbConnections
    .estDBConnection()
    .then(() => {
      logger.info(`⛓  - Database/MLab connection established: ${dbUrl}`);
      console.log('⛓  - Database/MLab connection established');
    })
    .catch((err) => void console.error(`Error connecting to mLab: `, err));
};
