const Express = require('express');
require('dotenv').config();
const preInit = require('@src/pre');
const registerRoutes = require('@src/routes');

const app = Express();
preInit(app);
registerRoutes(app);

const port = global.app.envConfig.port;

app.listen({ port }, () => void console.log(`🚀 - Server Listening @Port ${port}`));
