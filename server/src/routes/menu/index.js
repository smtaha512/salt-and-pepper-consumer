const router = require('express').Router();

const dbModels = require('../../models/index');
const menuRepository = require('../../repositories/menu/index');

const { validateMenu } = require('../../middlewares/index');
const { logger, formatLog } = require('../../utils/logger');

router.get('/menus', (request, response) => {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'query-string', {}));
  menuRepository
    .getAllMenus(dbModels)()
    .then((menus) => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', menus));
      response.status(200).send(menus);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Unable to fetch menus');
    });
});

router.post('/menus', [validateMenu], (request, response) => {
  // TODO - Transaction
  const addCategory = menuRepository.addCategory(dbModels);
  menuRepository
    .createMenu(dbModels)(request.body)
    .then((menu) => addCategory(menu))
    .then((menu) => {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'body', menu));
      response.status(201).send(menu);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      let message = 'Unable to create menu';
      if (e && e.message.includes('E11000')) message = 'Title already taken';
      response.status(400).send(message);
    });
});

module.exports = router;
