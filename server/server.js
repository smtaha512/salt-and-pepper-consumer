const Express = require('express');
require('dotenv').config();
const preInit = require('./src/pre/index');
const registerRoutes = require('./src/routes/index');
const { logger } = require('./src/utils/logger');

const app = Express();
preInit(app);
registerRoutes(app);

const port = global.app.envConfig.port;

app.listen({ port }, () => {
  logger.info(`🚀 - Server Listening at port: ${port}`);
  console.log(`🚀 - Server Listening @Port ${port}`);
});
