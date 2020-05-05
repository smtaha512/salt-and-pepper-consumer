const Express = require('express');
require('dotenv').config();
const preInit = require('@src/pre');

const app = Express();
preInit(app);

const port = 4000;

app.listen({ port }, () => void console.log(`🚀 - Server Listening @Port ${port}`));
