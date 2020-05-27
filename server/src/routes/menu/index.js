const router = require('express').Router();
const dbModels = require('../../models/index');
const menuRepository = require('../../repositories/menu/index');
const { validateMenu } = require('../../middlewares/index');

router.get('/menu', (request, response) => {
  menuRepository
    .getAllMenus(dbModels)()
    .then((menus = []) => void response.status(200).send(menus))
    .catch(() => void response.send('Unable to fetch menus'));
});

router.post('/menu', validateMenu, (request, response) => {
  // TODO - Transaction
  const addCategory = menuRepository.addCategory(dbModels);
  menuRepository
    .createMenu(dbModels)(request.body)
    .then((menu) => addCategory(menu))
    .then((menu) => void response.status(201).send(menu))
    .catch((e) => {
      let message = 'Unable to create menu';
      if (e && e.message.includes('E11000')) {
        message = 'Title already taken';
      }
      response.status(400).send(message);
    });
});

module.exports = router;
