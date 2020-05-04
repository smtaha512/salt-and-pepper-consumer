const Express = require('express');
require('dotenv').config();

const app = Express();

const port = 4000;

app.listen({ port }, () => void console.log(`🚀 - Server Listening @Port ${port}`));
