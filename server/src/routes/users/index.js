const router = require('express').Router();

const repositories = require('../../repositories/index');
const middlewares = require('../../middlewares/index');
const dbModels = require('../../models/index');

router.get('/users/:id', middlewares.isReqParamValidID, (request, response) => {
  const { id } = request.params;
  repositories.users
    .getUserById(dbModels)(id)
    .then((user) => response.status(201).send(user));
});

router.put('/users/:id/polled', middlewares.isReqParamValidID, (request, response) => {
  const { id } = request.params;
  repositories.users
    .updateLastPolledAt(dbModels)(id)
    .then(() => response.status(204).send());
});

module.exports = router;
