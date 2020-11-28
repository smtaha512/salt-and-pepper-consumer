const BodyParser = require('body-parser');

const { lodash: _ } = require('../utils/libs/index');
const { logger } = require('../utils/logger');
const dbConnections = require('../pre/db-connection');
const envConfig = require('../utils/configs/env.config');

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

  const dbUrl = _.get(global, 'app.envConfig.dbUrl');
  if (!dbUrl) throw new Error('Must specify correct DB_URL');
  dbConnections.estDBConnection()
    .then((connection) => {
      console.log('connection: ', connection);
      logger.info(`⛓  - Database/MLab connection established: ${dbUrl}`);
      console.log('⛓  - Database/MLab connection established');
    })
    .catch((err) => void console.error(`Error connecting to mLab: `, err));;
};
